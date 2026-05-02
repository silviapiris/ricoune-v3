import 'server-only'

import { createClient } from "@/lib/supabase/server"

export type Video = {
  id: string
  title: string
  youtube_id: string
  description: string | null
  category: string
  is_featured: boolean
  event_date: string | null
  sort_order: number
  is_published: boolean
  custom_thumbnail_url: string | null
}

export async function getPublicVideos(): Promise<{
  featured: Video | null
  clips: Video[]
  lives: Video[]
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getPublicVideos]:', error.message)
    return { featured: null, clips: [], lives: [] }
  }

  const rows = (data ?? []) as Video[]
  const featured = rows.find(v => v.is_featured) ?? null
  const clips = rows.filter(v => !v.is_featured && v.category === 'clip')
  const lives = rows.filter(v => v.category === 'live')

  return { featured, clips, lives }
}
