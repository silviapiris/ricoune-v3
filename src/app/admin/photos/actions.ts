'use server'

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
