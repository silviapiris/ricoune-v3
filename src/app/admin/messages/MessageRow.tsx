'use client'

import type { ContactMessage } from './actions'

function formatRelativeDate(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffMins < 1) return "à l'instant"
  if (diffMins < 60) return `il y a ${diffMins} min`
  if (diffHours < 24) return `il y a ${diffHours}h`
  if (diffDays < 7) return `il y a ${diffDays}j`
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

type Props = {
  message: ContactMessage
  isSelected: boolean
  onClick: () => void
}

export default function MessageRow({ message, isSelected, onClick }: Props) {
  const preview =
    message.message.length > 100
      ? message.message.slice(0, 100) + '…'
      : message.message

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-lg border p-4 text-left transition-colors ${
        isSelected
          ? 'border-[#f5c518]/40 bg-zinc-800'
          : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800/60'
      }`}
    >
      {/* Indicateur non-lu : barre jaune à gauche */}
      {!message.read && (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-[#f5c518]" />
      )}

      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-sm ${
            !message.read
              ? 'font-semibold text-zinc-100'
              : 'font-medium text-zinc-400'
          }`}
        >
          {message.prenom} {message.nom}
        </span>
        <span className="shrink-0 text-xs text-zinc-500">
          {formatRelativeDate(message.created_at)}
        </span>
      </div>

      <p className="mt-0.5 text-xs text-zinc-500">{message.email}</p>

      <p
        className={`mt-1.5 truncate text-xs ${
          !message.read ? 'text-zinc-300' : 'text-zinc-600'
        }`}
      >
        {preview}
      </p>
    </button>
  )
}
