'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type Photo = {
  id: string
  storage_path: string
  alt_text: string | null
  caption: string | null
  sort_order: number
  width: number | null
  height: number | null
  size_bytes: number | null
  created_at: string
  updated_at: string
}

export type UploadResult = {
  filename: string
  ok: boolean
  error?: string
}

export async function getPhotos(): Promise<{ photos: Photo[]; count: number }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getPhotos]:', error.message)
    return { photos: [], count: 0 }
  }

  const photos = (data ?? []) as Photo[]
  return { photos, count: photos.length }
}

function slugifyFilename(filename: string): string {
  const ext = filename.slice(filename.lastIndexOf('.'))
  const base = filename.slice(0, filename.lastIndexOf('.'))
  const slug = base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const timestamp = Date.now()
  return `${timestamp}-${slug}${ext}`
}

export async function uploadPhotos(formData: FormData): Promise<UploadResult[]> {
  const supabase = await createClient()
  const files = formData.getAll('photos') as File[]
  const results: UploadResult[] = []

  for (const file of files) {
    const storagePath = slugifyFilename(file.name)
    const buffer = await file.arrayBuffer()

    const { error: storageError } = await supabase.storage
      .from('photos')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (storageError) {
      results.push({ filename: file.name, ok: false, error: storageError.message })
      continue
    }

    const { error: dbError } = await supabase.from('photos').insert({
      storage_path: storagePath,
      size_bytes: file.size,
    })

    if (dbError) {
      await supabase.storage.from('photos').remove([storagePath])
      results.push({ filename: file.name, ok: false, error: dbError.message })
      continue
    }

    results.push({ filename: file.name, ok: true })
  }

  revalidatePath('/admin/photos')
  return results
}

export async function deletePhoto(
  id: string,
  storagePath: string,
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error: storageError } = await supabase.storage
    .from('photos')
    .remove([storagePath])

  if (storageError) {
    return { error: storageError.message }
  }

  const { error: dbError } = await supabase.from('photos').delete().eq('id', id)

  if (dbError) {
    return { error: dbError.message }
  }

  revalidatePath('/admin/photos')
  return {}
}
