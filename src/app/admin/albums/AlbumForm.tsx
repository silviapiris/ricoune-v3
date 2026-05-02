'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createAlbum, updateAlbum } from './actions'
import type { AlbumActionState, AdminAlbumWithTracks } from './actions'
import { getAlbumCoverUrl } from '@/lib/albums'

type Props = {
  mode: 'create' | 'edit'
  album?: AdminAlbumWithTracks
}

const INPUT_CLASS =
  'w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-yellow-400/40 focus:outline-none disabled:opacity-50'

const LABEL_CLASS = 'block text-sm font-medium text-white/80 mb-1'

export default function AlbumForm({ mode, album }: Props) {
  const action =
    mode === 'create' ? createAlbum : updateAlbum.bind(null, album!.id)

  const [state, formAction, pending] = useActionState<
    AlbumActionState | undefined,
    FormData
  >(action, undefined)

  const tracklistDefault =
    mode === 'edit' && album
      ? album.tracks
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((t) => t.title)
          .join('\n')
      : ''

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8">
      <h2
        className="mb-6 text-2xl font-semibold uppercase tracking-wider text-[#f5c518]"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        {mode === 'create' ? 'Nouvel album' : "Modifier l'album"}
      </h2>

      <form action={formAction} className="space-y-5">

        {/* Titre */}
        <div>
          <label htmlFor="title" className={LABEL_CLASS}>
            Titre <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            maxLength={200}
            defaultValue={album?.title ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Année */}
        <div>
          <label htmlFor="year" className={LABEL_CLASS}>
            Année <span className="text-red-400">*</span>
          </label>
          <input
            id="year"
            type="number"
            name="year"
            required
            min={1900}
            max={2099}
            defaultValue={album?.year ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={LABEL_CLASS}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={album?.description ?? ''}
            disabled={pending}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        {/* Cover */}
        <div>
          <label htmlFor="cover_file" className={LABEL_CLASS}>
            {mode === 'create'
              ? 'Cover (obligatoire)'
              : 'Cover (laisser vide pour conserver l’actuelle)'}
            {mode === 'create' && <span className="text-red-400"> *</span>}
          </label>
          {mode === 'edit' && album?.cover_storage_path && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getAlbumCoverUrl(album.cover_storage_path)}
              alt="Cover actuelle"
              className="mb-2 h-32 w-32 rounded object-cover"
            />
          )}
          <input
            id="cover_file"
            type="file"
            name="cover_file"
            accept="image/*"
            required={mode === 'create'}
            disabled={pending}
            className="w-full text-sm text-white/70 file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:text-white file:transition-colors file:hover:bg-white/20 disabled:opacity-50"
          />
        </div>

        {/* Spotify */}
        <div>
          <label htmlFor="spotify_url" className={LABEL_CLASS}>
            Lien Spotify
          </label>
          <input
            id="spotify_url"
            type="url"
            name="spotify_url"
            placeholder="https://open.spotify.com/..."
            defaultValue={album?.spotify_url ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Apple Music */}
        <div>
          <label htmlFor="apple_music_url" className={LABEL_CLASS}>
            Lien Apple Music
          </label>
          <input
            id="apple_music_url"
            type="url"
            name="apple_music_url"
            placeholder="https://music.apple.com/..."
            defaultValue={album?.apple_music_url ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* YouTube */}
        <div>
          <label htmlFor="youtube_url" className={LABEL_CLASS}>
            Lien YouTube
          </label>
          <input
            id="youtube_url"
            type="url"
            name="youtube_url"
            placeholder="https://www.youtube.com/..."
            defaultValue={album?.youtube_url ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Tracklist */}
        <div>
          <label htmlFor="tracklist_raw" className={LABEL_CLASS}>
            Tracklist (1 piste par ligne)
          </label>
          <textarea
            id="tracklist_raw"
            name="tracklist_raw"
            rows={12}
            defaultValue={tracklistDefault}
            disabled={pending}
            placeholder={'Piste 1\nPiste 2\nPiste 3'}
            className={`${INPUT_CLASS} resize-y`}
          />
          <p className="mt-1 text-xs text-white/40">
            Une piste par ligne. L&apos;ordre sera celui des lignes (1, 2, 3...). Laisser vide si pas de tracklist.
          </p>
        </div>

        {/* Publié */}
        <div className="flex items-center gap-2">
          <input
            id="is_published"
            type="checkbox"
            name="is_published"
            defaultChecked={album?.is_published ?? true}
            disabled={pending}
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-yellow-400"
          />
          <label htmlFor="is_published" className="text-sm text-white/80">
            Publié (visible sur le site)
          </label>
        </div>

        {/* Erreur */}
        {state?.error && (
          <div
            role="alert"
            className="rounded-md border border-red-500/40 bg-red-500/10 p-3"
          >
            <p className="text-sm text-red-300">{state.error}</p>
          </div>
        )}

        {/* Boutons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-yellow-400 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#1a3a68] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending
              ? 'Enregistrement...'
              : mode === 'create'
                ? "Créer l'album"
                : 'Enregistrer'}
          </button>
          <Link
            href="/admin/albums"
            className="rounded border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
          >
            Annuler
          </Link>
        </div>

      </form>
    </div>
  )
}
