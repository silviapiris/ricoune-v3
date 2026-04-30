'use client'

import { useState, useEffect, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { getPublicUrl } from '@/lib/photos'
import { deletePhoto } from './actions'
import type { Photo } from './actions'

type Props = {
  photo: Photo
}

export default function PhotoCard({ photo }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 5000)
    return () => clearTimeout(timer)
  }, [confirming])

  function handleDeleteClick() {
    if (!confirming) {
      setConfirming(true)
      return
    }

    startTransition(async () => {
      await deletePhoto(photo.id, photo.storage_path)
    })
  }

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getPublicUrl(photo.storage_path)}
        alt={photo.alt_text ?? ''}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 transition-opacity group-hover:opacity-100 md:opacity-0 max-md:opacity-100">
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={isPending}
          className={[
            'flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold transition-colors',
            confirming
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-white',
            isPending ? 'cursor-not-allowed opacity-60' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Trash2 size={13} />
          {confirming ? 'Confirmer ?' : 'Supprimer'}
        </button>
      </div>
    </div>
  )
}
