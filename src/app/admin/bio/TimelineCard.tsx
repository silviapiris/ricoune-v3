'use client'

import { useState, useTransition } from 'react'
import { ChevronUp, ChevronDown, Trash2, Loader2, CheckCircle } from 'lucide-react'
import { updateTimelineEvent, deleteTimelineEvent } from './timelineActions'
import type { BioTimelineEvent } from '@/lib/bio'

interface TimelineCardProps {
  event: BioTimelineEvent
  onMoveUp: () => void | Promise<void>
  onMoveDown: () => void | Promise<void>
  isFirst: boolean
  isLast: boolean
}

const INPUT =
  'w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-[#f5c518]/40 focus:outline-none disabled:opacity-50'
const TEXTAREA = `${INPUT} resize-none leading-relaxed`

export default function TimelineCard({
  event,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: TimelineCardProps) {
  const [year, setYear] = useState(event.year)
  const [description, setDescription] = useState(event.description)
  const [isDirty, setIsDirty] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [isSaving, startSaveTransition] = useTransition()
  const [isDeleting, startDeleteTransition] = useTransition()
  const [isMovePending, startMoveTransition] = useTransition()

  function markDirty() {
    setIsDirty(true)
    setJustSaved(false)
    setSaveError(null)
  }

  function handleSave() {
    const fd = new FormData()
    fd.append('id', event.id)
    fd.append('year', year)
    fd.append('description', description)
    startSaveTransition(async () => {
      const result = await updateTimelineEvent(undefined, fd)
      if (result?.error) {
        setSaveError(result.error)
      } else {
        setIsDirty(false)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 3000)
      }
    })
  }

  function handleDelete() {
    if (
      !window.confirm(
        `Supprimer l'événement « ${event.year} » ? Cette action est irréversible.`
      )
    )
      return
    startDeleteTransition(async () => {
      const fd = new FormData()
      fd.append('id', event.id)
      const result = await deleteTimelineEvent(fd)
      if (result?.error) setDeleteError(result.error)
    })
  }

  function handleMoveUp() {
    startMoveTransition(async () => {
      await onMoveUp()
    })
  }

  function handleMoveDown() {
    startMoveTransition(async () => {
      await onMoveDown()
    })
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex gap-3">

        {/* Flèches ↑↓ */}
        <div className="flex shrink-0 flex-col gap-0.5 pt-1">
          <button
            type="button"
            onClick={handleMoveUp}
            disabled={isFirst || isMovePending}
            aria-label="Monter"
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={handleMoveDown}
            disabled={isLast || isMovePending}
            aria-label="Descendre"
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isMovePending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>

        {/* Champs d'édition */}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
              markDirty()
            }}
            maxLength={20}
            placeholder="Année"
            disabled={isSaving}
            className={INPUT}
          />
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              markDirty()
            }}
            rows={3}
            maxLength={500}
            placeholder="Description de l'événement…"
            disabled={isSaving}
            className={TEXTAREA}
          />
          <p
            className={`text-right text-xs ${
              description.length > 300 ? 'text-amber-400' : 'text-zinc-600'
            }`}
          >
            {description.length} / 300
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col items-center gap-2 pt-1">

          {/* Indicateur d'état */}
          <div className="flex h-4 items-center justify-center">
            {isSaving ? (
              <Loader2 size={12} className="animate-spin text-zinc-400" />
            ) : justSaved ? (
              <CheckCircle size={12} className="text-emerald-400" />
            ) : isDirty ? (
              <span
                className="h-2 w-2 rounded-full bg-amber-400"
                title="Modifications non sauvegardées"
              />
            ) : null}
          </div>

          {/* Bouton Enregistrer */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-opacity disabled:opacity-50 ${
              isDirty
                ? 'bg-[#f5c518] text-[#0a0a0a] hover:opacity-90'
                : 'border border-zinc-700 text-zinc-500'
            }`}
          >
            {isSaving ? '…' : 'Sauver'}
          </button>

          {/* Bouton Supprimer */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Supprimer l'événement ${event.year}`}
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-red-400 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>

        </div>
      </div>

      {saveError && (
        <p className="mt-2 text-xs text-red-400">{saveError}</p>
      )}
      {deleteError && (
        <p className="mt-2 text-xs text-red-400">{deleteError}</p>
      )}
    </div>
  )
}
