'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { Trash2, Loader2, Pencil, ChevronUp, ChevronDown } from 'lucide-react'
import { deleteAlbum, moveAlbum } from './actions'
import type { AdminAlbum } from './actions'
import { getAlbumCoverUrl } from '@/lib/albums'

type Props = {
  album: AdminAlbum
  isFirst: boolean
  isLast: boolean
}

export default function AlbumCard({ album, isFirst, isLast }: Props) {
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
      const result = await deleteAlbum(album.id)
      if (result?.error) setDeleteError(result.error)
    })
  }

  function handleMove(direction: 'up' | 'down') {
    setMoveError(null)
    startMoveTransition(async () => {
      const result = await moveAlbum(album.id, direction)
      if (result?.error) setMoveError(result.error)
    })
  }

  return (
    <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      {/* Cover */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-black/20">
        {album.cover_storage_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getAlbumCoverUrl(album.cover_storage_path)}
            alt={album.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
            Pas de cover
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{album.title}</p>
        <p className="text-xs text-white/60">{album.year}</p>
        <div className="mt-1 flex gap-2">
          {album.is_published ? (
            <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
              Publié
            </span>
          ) : (
            <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-300">
              Brouillon
            </span>
          )}
        </div>
        {moveError && (
          <p role="alert" className="mt-1 text-xs text-red-400">
            {moveError}
          </p>
        )}
        {deleteError && (
          <p role="alert" className="mt-1 text-xs text-red-400">
            {deleteError}
          </p>
        )}
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
            className="rounded p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleMove('down')}
            disabled={isLast || isMovePending}
            aria-label="Descendre"
            className="rounded p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isMovePending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>

        {/* Edit */}
        <Link
          href={`/admin/albums/${album.id}`}
          className="rounded p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
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
                ? `Confirmer la suppression de ${album.title}`
                : `Supprimer ${album.title}`
            }
            className={`inline-flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50 ${
              confirming
                ? 'rounded border border-red-900 bg-red-950/50 px-2 py-1 text-red-400'
                : 'rounded p-1.5 text-white/40 hover:bg-white/10 hover:text-red-400'
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
