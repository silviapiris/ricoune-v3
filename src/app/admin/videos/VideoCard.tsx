'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { Trash2, Loader2, Pencil, ChevronUp, ChevronDown } from 'lucide-react'
import { deleteVideo, moveVideo } from './actions'
import type { Video } from './actions'

type Props = {
  video: Video
  isFirst: boolean
  isLast: boolean
}

export default function VideoCard({ video, isFirst, isLast }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [moveError, setMoveError] = useState<string | null>(null)
  const [isDeletePending, startDeleteTransition] = useTransition()
  const [isMovePending, startMoveTransition] = useTransition()

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 5000)
    return () => clearTimeout(timer)
  }, [confirming])

  function handleDeleteClick() {
    if (deleteError) {
      setDeleteError(null)
      return
    }
    if (!confirming) {
      setConfirming(true)
      return
    }
    setConfirming(false)
    startDeleteTransition(async () => {
      const result = await deleteVideo(video.id)
      if (result?.error) setDeleteError(result.error)
    })
  }

  function handleMove(direction: 'up' | 'down') {
    setMoveError(null)
    startMoveTransition(async () => {
      const result = await moveVideo(video.id, direction)
      if (result?.error) setMoveError(result.error)
    })
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`

  return (
    <div className="flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={video.title}
        className="h-16 w-28 shrink-0 rounded object-cover"
      />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-100">{video.title}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
            {video.category}
          </span>
          {video.is_featured && (
            <span className="rounded bg-[#f5c518]/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#f5c518]">
              Vedette
            </span>
          )}
          {video.is_published ? (
            <span className="rounded bg-emerald-900/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
              Publié
            </span>
          ) : (
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
              Brouillon
            </span>
          )}
        </div>
        {moveError && <p className="mt-1 text-xs text-red-400">{moveError}</p>}
        {deleteError && <p className="mt-1 text-xs text-red-400">{deleteError}</p>}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">

        {/* Move buttons */}
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => handleMove('up')}
            disabled={isFirst || isMovePending}
            aria-label="Monter"
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleMove('down')}
            disabled={isLast || isMovePending}
            aria-label="Descendre"
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isMovePending ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Edit */}
        <Link
          href={`/admin/videos/${video.id}`}
          className="rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Modifier"
        >
          <Pencil size={14} />
        </Link>

        {/* Delete */}
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={isDeletePending}
            aria-label={
              confirming
                ? `Confirmer la suppression de ${video.title}`
                : `Supprimer ${video.title}`
            }
            className={`inline-flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50 ${
              confirming
                ? 'rounded border border-red-900 bg-red-950/50 px-2 py-1 text-red-400'
                : 'rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-red-400'
            }`}
          >
            {isDeletePending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            {confirming && 'Confirmer ?'}
          </button>
        </div>

      </div>
    </div>
  )
}
