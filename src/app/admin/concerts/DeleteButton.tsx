'use client'

import { useState, useEffect, useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteConcert } from './actions'

type Props = {
  concertId: string
  concertLabel: string
}

export default function DeleteButton({ concertId, concertLabel }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 5000)
    return () => clearTimeout(timer)
  }, [confirming])

  function handleClick() {
    if (error) {
      setError(null)
      return
    }
    if (!confirming) {
      setConfirming(true)
      return
    }
    setConfirming(false)
    startTransition(async () => {
      const result = await deleteConcert(concertId)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={
          confirming
            ? `Confirmer la suppression de ${concertLabel}`
            : `Supprimer le concert ${concertLabel}`
        }
        className={`inline-flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50 ${
          confirming
            ? 'rounded border border-red-900 bg-red-950/50 px-2 py-1 text-red-400'
            : 'text-zinc-400 hover:text-red-400'
        }`}
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={14} />
        )}
        {confirming ? 'Confirmer ?' : 'Supprimer'}
      </button>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
