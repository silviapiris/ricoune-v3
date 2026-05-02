'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import type { Video, VideoActionState } from './actions'
import { createVideo, updateVideo } from './actions'

type Props = {
  mode: 'create' | 'edit'
  video?: Video
}

const INPUT_CLASS =
  'w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-[#f5c518] focus:outline-none disabled:opacity-50'

const LABEL_CLASS = 'block mb-1.5 text-sm text-zinc-300'

const initialState: VideoActionState = {}

export default function VideoForm({ mode, video }: Props) {
  const action =
    mode === 'edit'
      ? updateVideo.bind(null, video!.id)
      : createVideo

  const [state, formAction, pending] = useActionState(action, initialState)

  const defaultYoutubeUrl = video ? `https://youtu.be/${video.youtube_id}` : ''

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h2
        className="mb-6 text-2xl font-semibold uppercase tracking-wider text-[#f5c518]"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        {mode === 'create' ? 'Nouvelle vidéo' : 'Modifier la vidéo'}
      </h2>

      <form action={formAction} className="space-y-5">

        {/* URL YouTube */}
        <div>
          <label htmlFor="youtube_url" className={LABEL_CLASS}>
            URL YouTube <span className="text-red-400">*</span>
          </label>
          <input
            id="youtube_url"
            type="text"
            name="youtube_url"
            required
            defaultValue={defaultYoutubeUrl}
            placeholder="https://youtu.be/xxxxxxxxxxx"
            disabled={pending}
            className={INPUT_CLASS}
          />
          <p className="mt-1 text-xs text-zinc-500">
            Formats acceptés : youtu.be/ID, youtube.com/watch?v=ID, ou l&apos;ID seul (11 caractères)
          </p>
        </div>

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
            defaultValue={video?.title ?? ''}
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
            defaultValue={video?.description ?? ''}
            disabled={pending}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor="category" className={LABEL_CLASS}>
            Catégorie <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={video?.category ?? 'clip'}
            disabled={pending}
            className={INPUT_CLASS}
          >
            <option value="clip">Clip officiel</option>
            <option value="live">Extrait live</option>
          </select>
        </div>

        {/* Date de l'événement */}
        <div>
          <label htmlFor="event_date" className={LABEL_CLASS}>
            Date de l&apos;événement{' '}
            <span className="text-zinc-500">(pour les lives)</span>
          </label>
          <input
            id="event_date"
            type="date"
            name="event_date"
            defaultValue={video?.event_date ?? ''}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Vedette */}
        <div className="flex items-center gap-2">
          <input
            id="is_featured"
            type="checkbox"
            name="is_featured"
            defaultChecked={video?.is_featured ?? false}
            disabled={pending}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-[#f5c518]"
          />
          <label htmlFor="is_featured" className="text-sm text-zinc-300">
            Vidéo vedette{' '}
            <span className="text-zinc-500">(une seule à la fois — remplace l&apos;actuelle)</span>
          </label>
        </div>

        {/* Publié */}
        <div className="flex items-center gap-2">
          <input
            id="is_published"
            type="checkbox"
            name="is_published"
            defaultChecked={video?.is_published ?? true}
            disabled={pending}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-[#f5c518]"
          />
          <label htmlFor="is_published" className="text-sm text-zinc-300">
            Publié (visible sur le site)
          </label>
        </div>

        {/* Erreur */}
        {state?.error && (
          <p
            role="alert"
            className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-sm text-red-400"
          >
            {state.error}
          </p>
        )}

        {/* Boutons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-[#f5c518] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending
              ? 'Enregistrement...'
              : mode === 'create'
                ? 'Enregistrer'
                : 'Mettre à jour'}
          </button>
          <Link
            href="/admin/videos"
            className="rounded border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-700"
          >
            Annuler
          </Link>
        </div>

      </form>
    </div>
  )
}
