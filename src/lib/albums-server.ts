import 'server-only'

import { createClient } from '@/lib/supabase/server'

export interface Album {
  slug: string
  title: string
  year: number
  description?: string
  coverUrl: string
  tracklist: string[]
  streaming: {
    spotify?: string
    apple?: string
    amazon?: string
    youtube?: string
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

function buildCoverUrl(storagePath: string | null): string {
  if (!storagePath) return ''
  return `${SUPABASE_URL}/storage/v1/object/public/album-covers/${storagePath}`
}

type AlbumRow = {
  id: string
  slug: string
  title: string
  year: number
  description: string | null
  cover_storage_path: string | null
  sort_order: number
  spotify_url: string | null
  apple_music_url: string | null
  amazon_url: string | null
  youtube_url: string | null
  is_published: boolean
  album_tracks: Array<{ title: string; position: number }>
}

function mapRow(row: AlbumRow): Album {
  const tracklist = (row.album_tracks ?? [])
    .sort((a, b) => a.position - b.position)
    .map((t) => t.title)

  return {
    slug: row.slug,
    title: row.title,
    year: row.year,
    description: row.description ?? undefined,
    coverUrl: buildCoverUrl(row.cover_storage_path),
    tracklist,
    streaming: {
      spotify: row.spotify_url ?? undefined,
      apple: row.apple_music_url ?? undefined,
      amazon: row.amazon_url ?? undefined,
      youtube: row.youtube_url ?? undefined,
    },
  }
}

export async function getAlbums(): Promise<Album[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select('*, album_tracks(title, position)')
    .eq('is_published', true)
    .not('cover_storage_path', 'is', null)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getAlbums]:', error.message)
    return []
  }

  return ((data ?? []) as AlbumRow[]).map(mapRow)
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select('*, album_tracks(title, position)')
    .eq('slug', slug)
    .eq('is_published', true)
    .not('cover_storage_path', 'is', null)
    .maybeSingle()

  if (error) {
    console.error('[getAlbumBySlug]:', error.message)
    return null
  }

  if (!data) return null

  return mapRow(data as AlbumRow)
}
