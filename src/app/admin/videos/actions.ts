'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Video = {
  id: string
  title: string
  youtube_id: string
  description: string | null
  category: 'clip' | 'live'
  is_featured: boolean
  event_date: string | null
  sort_order: number
  is_published: boolean
  custom_thumbnail_url: string | null
  created_at: string
}

export type VideoActionState = { error?: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (typeof val !== 'string' || val.trim() === '') return null
  return val.trim()
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (match) return match[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url
  return null
}

// ─── getVideos ────────────────────────────────────────────────────────────────

export async function getVideos(): Promise<{ videos: Video[]; count: number }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getVideos]:', error.message)
    return { videos: [], count: 0 }
  }

  const videos = (data ?? []) as Video[]
  return { videos, count: videos.length }
}

// ─── getVideoById ─────────────────────────────────────────────────────────────

export async function getVideoById(id: string): Promise<Video | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getVideoById]:', error)
    return null
  }

  return data as Video
}

// ─── createVideo ──────────────────────────────────────────────────────────────

export async function createVideo(
  _prevState: VideoActionState | undefined,
  formData: FormData
): Promise<VideoActionState> {
  const youtubeUrl = getString(formData, 'youtube_url')
  const title = getString(formData, 'title')
  const category = getString(formData, 'category')

  if (!youtubeUrl) return { error: "L'URL YouTube est requise." }
  if (!title) return { error: 'Le titre est requis.' }

  const youtubeId = extractYouTubeId(youtubeUrl)
  if (!youtubeId)
    return {
      error:
        'URL YouTube invalide. Exemples : https://youtu.be/xxxxxxxxxxx ou https://www.youtube.com/watch?v=xxxxxxxxxxx',
    }

  if (category !== 'clip' && category !== 'live')
    return { error: "La catégorie doit être 'clip' ou 'live'." }

  const supabase = await createClient()
  const isFeatured = formData.get('is_featured') === 'on'

  const { data: maxRow } = await supabase
    .from('videos')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextOrder = maxRow ? maxRow.sort_order + 1 : 0

  if (isFeatured) {
    await supabase.from('videos').update({ is_featured: false }).eq('is_featured', true)
  }

  const { error } = await supabase.from('videos').insert({
    title,
    youtube_id: youtubeId,
    description: getString(formData, 'description'),
    category,
    is_featured: isFeatured,
    event_date: getString(formData, 'event_date'),
    sort_order: nextOrder,
    is_published: formData.get('is_published') === 'on',
  })

  if (error) {
    console.error('[createVideo]:', error)
    return { error: 'Erreur lors de la création de la vidéo. Réessaye.' }
  }

  revalidatePath('/admin/videos')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

// ─── updateVideo ──────────────────────────────────────────────────────────────

export async function updateVideo(
  id: string,
  _prevState: VideoActionState | undefined,
  formData: FormData
): Promise<VideoActionState> {
  const youtubeUrl = getString(formData, 'youtube_url')
  const title = getString(formData, 'title')
  const category = getString(formData, 'category')

  if (!youtubeUrl) return { error: "L'URL YouTube est requise." }
  if (!title) return { error: 'Le titre est requis.' }

  const youtubeId = extractYouTubeId(youtubeUrl)
  if (!youtubeId) return { error: 'URL YouTube invalide.' }

  if (category !== 'clip' && category !== 'live')
    return { error: "La catégorie doit être 'clip' ou 'live'." }

  const supabase = await createClient()
  const isFeatured = formData.get('is_featured') === 'on'

  if (isFeatured) {
    await supabase
      .from('videos')
      .update({ is_featured: false })
      .eq('is_featured', true)
      .neq('id', id)
  }

  const { error } = await supabase
    .from('videos')
    .update({
      title,
      youtube_id: youtubeId,
      description: getString(formData, 'description'),
      category,
      is_featured: isFeatured,
      event_date: getString(formData, 'event_date'),
      is_published: formData.get('is_published') === 'on',
    })
    .eq('id', id)

  if (error) {
    console.error('[updateVideo]:', error)
    return { error: 'Erreur lors de la mise à jour de la vidéo. Réessaye.' }
  }

  revalidatePath('/admin/videos')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

// ─── deleteVideo ──────────────────────────────────────────────────────────────

export async function deleteVideo(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from('videos').delete().eq('id', id)

  if (error) {
    console.error('[deleteVideo]:', error)
    return { error: 'Erreur lors de la suppression. Réessaye.' }
  }

  revalidatePath('/admin/videos')
  revalidatePath('/videos')
  return {}
}

// ─── moveVideo ────────────────────────────────────────────────────────────────

export async function moveVideo(
  id: string,
  direction: 'up' | 'down'
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('videos')
    .select('id, sort_order')
    .order('sort_order', { ascending: true })

  if (error) return { error: error.message }

  const videos = data ?? []
  const index = videos.findIndex((v) => v.id === id)

  if (index === -1) return { error: 'Vidéo introuvable.' }
  if (direction === 'up' && index === 0) return {}
  if (direction === 'down' && index === videos.length - 1) return {}

  const swapIndex = direction === 'up' ? index - 1 : index + 1
  const current = videos[index]
  const swap = videos[swapIndex]

  const [{ error: err1 }, { error: err2 }] = await Promise.all([
    supabase.from('videos').update({ sort_order: swap.sort_order }).eq('id', current.id),
    supabase.from('videos').update({ sort_order: current.sort_order }).eq('id', swap.id),
  ])

  if (err1 || err2) return { error: 'Erreur lors du réordonnancement. Réessaye.' }

  revalidatePath('/admin/videos')
  return {}
}
