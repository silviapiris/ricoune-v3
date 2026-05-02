'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminAlbum = {
  id: string
  slug: string
  title: string
  year: number
  description: string | null
  cover_storage_path: string | null
  spotify_url: string | null
  apple_music_url: string | null
  youtube_url: string | null
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export type AdminAlbumWithTracks = AdminAlbum & {
  tracks: { position: number; title: string }[]
}

export type AlbumActionState = { error?: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (typeof val !== 'string' || val.trim() === '') return null
  return val.trim()
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseTracklistTextarea(raw: string | null): string[] {
  if (!raw) return []
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// ─── getAlbums ────────────────────────────────────────────────────────────────

export async function getAlbums(): Promise<{ albums: AdminAlbum[]; count: number }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getAlbums]:', error.message)
    return { albums: [], count: 0 }
  }

  const albums = (data ?? []) as AdminAlbum[]
  return { albums, count: albums.length }
}

// ─── getAlbumWithTracksById ───────────────────────────────────────────────────

export async function getAlbumWithTracksById(
  id: string
): Promise<AdminAlbumWithTracks | null> {
  const supabase = await createClient()

  const [{ data: albumData, error: albumError }, { data: tracksData, error: tracksError }] =
    await Promise.all([
      supabase.from('albums').select('*').eq('id', id).maybeSingle(),
      supabase
        .from('album_tracks')
        .select('title, position')
        .eq('album_id', id)
        .order('position', { ascending: true }),
    ])

  if (albumError) {
    console.error('[getAlbumWithTracksById]:', albumError.message)
    return null
  }
  if (tracksError) {
    console.error('[getAlbumWithTracksById] tracks:', tracksError.message)
  }

  if (!albumData) return null

  return {
    ...(albumData as AdminAlbum),
    tracks: (tracksData ?? []) as { position: number; title: string }[],
  }
}

// ─── createAlbum ──────────────────────────────────────────────────────────────

export async function createAlbum(
  _prevState: AlbumActionState | undefined,
  formData: FormData
): Promise<AlbumActionState> {
  const title = getString(formData, 'title')
  const yearRaw = getString(formData, 'year')
  const description = getString(formData, 'description')
  const spotify_url = getString(formData, 'spotify_url')
  const apple_music_url = getString(formData, 'apple_music_url')
  const youtube_url = getString(formData, 'youtube_url')
  const is_published = formData.get('is_published') === 'on'
  const tracklistRaw = formData.get('tracklist_raw')
  const tracklist_raw = typeof tracklistRaw === 'string' ? tracklistRaw : null

  if (!title) return { error: 'Le titre est requis.' }

  const year = yearRaw ? parseInt(yearRaw, 10) : NaN
  if (!yearRaw || isNaN(year) || year <= 1900 || year >= 2100)
    return { error: "L'année doit être un entier valide (ex : 2021)." }

  const coverFile = formData.get('cover_file')
  if (!(coverFile instanceof File) || coverFile.size === 0)
    return { error: 'La cover est obligatoire.' }

  if (spotify_url && !spotify_url.startsWith('https://'))
    return { error: 'Le lien Spotify doit commencer par https://.' }
  if (apple_music_url && !apple_music_url.startsWith('https://'))
    return { error: 'Le lien Apple Music doit commencer par https://.' }
  if (youtube_url && !youtube_url.startsWith('https://'))
    return { error: 'Le lien YouTube doit commencer par https://.' }

  const slug = slugifyTitle(title)
  if (!slug)
    return { error: 'Le titre ne peut pas être réduit à un slug valide.' }

  const supabase = await createClient()

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from('albums')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()
  if (existing)
    return { error: 'Un album avec ce slug existe déjà. Modifie le titre.' }

  // Upload cover
  const ext = coverFile.name.slice(coverFile.name.lastIndexOf('.'))
  const storagePath = `${slug}${ext}`
  const buffer = await coverFile.arrayBuffer()

  const { error: storageError } = await supabase.storage
    .from('album-covers')
    .upload(storagePath, buffer, {
      contentType: coverFile.type,
      upsert: false,
      cacheControl: '3600',
    })

  if (storageError) return { error: `Erreur upload cover : ${storageError.message}` }

  // Get next sort_order
  const { data: maxRow } = await supabase
    .from('albums')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextOrder = maxRow ? maxRow.sort_order + 1 : 0

  // Insert album
  const { data: insertData, error: insertError } = await supabase
    .from('albums')
    .insert({
      slug,
      title,
      year,
      description,
      cover_storage_path: storagePath,
      spotify_url,
      apple_music_url,
      youtube_url,
      sort_order: nextOrder,
      is_published,
    })
    .select('id')
    .single()

  if (insertError) {
    await supabase.storage.from('album-covers').remove([storagePath])
    console.error('[createAlbum]:', insertError)
    return { error: "Erreur lors de la création de l'album. Réessaye." }
  }

  // Tracklist via RPC
  const tracks = parseTracklistTextarea(tracklist_raw)
  if (tracks.length > 0) {
    const { error: rpcError } = await supabase.rpc('replace_album_tracks', {
      album_uuid: insertData.id,
      track_titles: tracks,
    })
    if (rpcError) console.error('[createAlbum] replace_album_tracks:', rpcError.message)
  }

  revalidatePath('/admin/albums')
  revalidatePath('/albums')
  revalidatePath(`/albums/${slug}`)
  redirect('/admin/albums')
}

// ─── updateAlbum ──────────────────────────────────────────────────────────────

export async function updateAlbum(
  id: string,
  _prevState: AlbumActionState | undefined,
  formData: FormData
): Promise<AlbumActionState> {
  const title = getString(formData, 'title')
  const yearRaw = getString(formData, 'year')
  const description = getString(formData, 'description')
  const spotify_url = getString(formData, 'spotify_url')
  const apple_music_url = getString(formData, 'apple_music_url')
  const youtube_url = getString(formData, 'youtube_url')
  const is_published = formData.get('is_published') === 'on'
  const tracklistRaw = formData.get('tracklist_raw')
  const tracklist_raw = typeof tracklistRaw === 'string' ? tracklistRaw : null

  if (!title) return { error: 'Le titre est requis.' }

  const year = yearRaw ? parseInt(yearRaw, 10) : NaN
  if (!yearRaw || isNaN(year) || year <= 1900 || year >= 2100)
    return { error: "L'année doit être un entier valide (ex : 2021)." }

  if (spotify_url && !spotify_url.startsWith('https://'))
    return { error: 'Le lien Spotify doit commencer par https://.' }
  if (apple_music_url && !apple_music_url.startsWith('https://'))
    return { error: 'Le lien Apple Music doit commencer par https://.' }
  if (youtube_url && !youtube_url.startsWith('https://'))
    return { error: 'Le lien YouTube doit commencer par https://.' }

  const supabase = await createClient()

  // Fetch current album
  const { data: current, error: fetchError } = await supabase
    .from('albums')
    .select('slug, cover_storage_path')
    .eq('id', id)
    .maybeSingle()

  if (fetchError || !current) return { error: 'Album introuvable.' }

  // Handle optional cover replacement
  let newCoverStoragePath: string | undefined
  const coverFile = formData.get('cover_file')

  if (coverFile instanceof File && coverFile.size > 0) {
    const newExt = coverFile.name.slice(coverFile.name.lastIndexOf('.'))
    const newStoragePath = `${current.slug}${newExt}`
    const buffer = await coverFile.arrayBuffer()

    const { error: storageError } = await supabase.storage
      .from('album-covers')
      .upload(newStoragePath, buffer, {
        contentType: coverFile.type,
        upsert: true,
        cacheControl: '3600',
      })

    if (storageError) return { error: `Erreur upload cover : ${storageError.message}` }

    // Remove old file if extension changed
    if (current.cover_storage_path && newStoragePath !== current.cover_storage_path) {
      await supabase.storage.from('album-covers').remove([current.cover_storage_path])
    }

    newCoverStoragePath = newStoragePath
  }

  // Update album
  const { error: updateError } = await supabase
    .from('albums')
    .update({
      title,
      year,
      description,
      spotify_url,
      apple_music_url,
      youtube_url,
      is_published,
      ...(newCoverStoragePath !== undefined && { cover_storage_path: newCoverStoragePath }),
    })
    .eq('id', id)

  if (updateError) {
    console.error('[updateAlbum]:', updateError)
    return { error: "Erreur lors de la mise à jour de l'album. Réessaye." }
  }

  // Tracklist via RPC
  const tracks = parseTracklistTextarea(tracklist_raw)
  if (tracks.length > 0) {
    const { error: rpcError } = await supabase.rpc('replace_album_tracks', {
      album_uuid: id,
      track_titles: tracks,
    })
    if (rpcError) console.error('[updateAlbum] replace_album_tracks:', rpcError.message)
  }

  revalidatePath('/admin/albums')
  revalidatePath('/albums')
  revalidatePath(`/albums/${current.slug}`)
  redirect('/admin/albums')
}

// ─── deleteAlbum ──────────────────────────────────────────────────────────────

export async function deleteAlbum(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()

  // Fetch before delete (need path for Storage cleanup)
  const { data: album } = await supabase
    .from('albums')
    .select('cover_storage_path, slug')
    .eq('id', id)
    .maybeSingle()

  // Delete album (album_tracks cascade via ON DELETE CASCADE)
  const { error } = await supabase.from('albums').delete().eq('id', id)

  if (error) {
    console.error('[deleteAlbum]:', error)
    return { error: "Erreur lors de la suppression de l'album. Réessaye." }
  }

  // Storage cleanup — non-blocking (album already deleted)
  if (album?.cover_storage_path) {
    const { error: storageError } = await supabase.storage
      .from('album-covers')
      .remove([album.cover_storage_path])
    if (storageError)
      console.warn('[deleteAlbum] Storage cleanup:', storageError.message)
  }

  revalidatePath('/admin/albums')
  revalidatePath('/albums')
  return {}
}

// ─── moveAlbum ────────────────────────────────────────────────────────────────

export async function moveAlbum(
  id: string,
  direction: 'up' | 'down'
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('albums')
    .select('id, sort_order')
    .order('sort_order', { ascending: true })

  if (error) return { error: error.message }

  const albums = data ?? []
  const index = albums.findIndex((a) => a.id === id)

  if (index === -1) return { error: 'Album introuvable.' }
  if (direction === 'up' && index === 0) return {}
  if (direction === 'down' && index === albums.length - 1) return {}

  const swapIndex = direction === 'up' ? index - 1 : index + 1
  const current = albums[index]
  const swap = albums[swapIndex]

  const [{ error: err1 }, { error: err2 }] = await Promise.all([
    supabase.from('albums').update({ sort_order: swap.sort_order }).eq('id', current.id),
    supabase.from('albums').update({ sort_order: current.sort_order }).eq('id', swap.id),
  ])

  if (err1 || err2) return { error: 'Erreur lors du réordonnancement. Réessaye.' }

  revalidatePath('/admin/albums')
  revalidatePath('/albums')
  return {}
}
