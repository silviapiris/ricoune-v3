import Link from 'next/link'
import { Pencil, MapPin, Clock, AlertTriangle } from 'lucide-react'
import type { Concert } from './actions'
import DeleteButton from './DeleteButton'

type Props = {
  concerts: Concert[]
  variant: 'upcoming' | 'past'
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(timeStr: string): string {
  if (/^\d{2}:\d{2}:\d{2}$/.test(timeStr)) return timeStr.slice(0, 5)
  return timeStr
}

export default function ConcertsTable({ concerts, variant }: Props) {
  return (
    <div className={variant === 'past' ? 'opacity-90' : undefined}>

      {/* Desktop table (sm+) */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border border-zinc-800 bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Ville</th>
              <th className="px-4 py-3 text-left font-medium">Lieu</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Statut</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert) => (
              <tr
                key={concert.id}
                className={`border-b border-zinc-800 transition-colors hover:bg-zinc-800/30 ${concert.cancelled ? 'opacity-60' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="text-sm text-zinc-100">{formatDate(concert.date)}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                    <Clock size={12} />
                    {formatTime(concert.time)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-zinc-100">{concert.city}</div>
                  {concert.postal_code && (
                    <div className="text-xs text-zinc-500">{concert.postal_code}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-100">
                    <span>{concert.venue}</span>
                    {concert.maps_url && (
                      <a
                        href={concert.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 transition-colors hover:text-[#f5c518]"
                        aria-label="Voir sur Maps"
                      >
                        <MapPin size={14} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {concert.type === 'solo' ? (
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[#f5c518]" style={{ background: 'rgba(245,197,24,0.12)' }}>
                      Solo
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-300">
                      Groupe
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {concert.cancelled && (
                    <div>
                      <span className="inline-flex items-center gap-1 rounded border border-red-900/50 bg-red-950/50 px-2 py-0.5 text-xs font-medium text-red-400">
                        <AlertTriangle size={12} />
                        ANNULÉ
                      </span>
                      {concert.cancellation_note && (
                        <div className="mt-1 max-w-[180px] text-xs text-zinc-500">
                          {concert.cancellation_note}
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* TODO C4.5 : ajouter un bouton "Reprogrammer" pour variant === 'past' qui pre-remplira le form de creation */}
                    <Link
                      href={`/admin/concerts/${concert.id}`}
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                      aria-label={`Modifier ${concert.city} — ${concert.date}`}
                    >
                      <Pencil size={14} />
                      Modifier
                    </Link>
                    <DeleteButton
                      concertId={concert.id}
                      concertLabel={`${concert.city} - ${concert.date}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards (< sm) */}
      <div className="space-y-3 sm:hidden">
        {concerts.map((concert) => (
          <div
            key={concert.id}
            className={`rounded-lg border border-zinc-800 bg-zinc-900 p-4 ${concert.cancelled ? 'opacity-60' : ''}`}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-zinc-100">{formatDate(concert.date)}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                  <Clock size={12} />
                  {formatTime(concert.time)}
                </div>
              </div>
              {concert.type === 'solo' ? (
                <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[#f5c518]" style={{ background: 'rgba(245,197,24,0.12)' }}>
                  Solo
                </span>
              ) : (
                <span className="inline-flex items-center rounded bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-300">
                  Groupe
                </span>
              )}
            </div>
            <div className="text-sm text-zinc-300">
              {concert.city}
              {concert.postal_code ? ` (${concert.postal_code})` : ''}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
              <span>{concert.venue}</span>
              {concert.maps_url && (
                <a
                  href={concert.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-[#f5c518]"
                  aria-label="Voir sur Maps"
                >
                  <MapPin size={14} />
                </a>
              )}
            </div>
            {concert.cancelled && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 rounded border border-red-900/50 bg-red-950/50 px-2 py-0.5 text-xs font-medium text-red-400">
                  <AlertTriangle size={12} />
                  ANNULÉ
                </span>
                {concert.cancellation_note && (
                  <div className="mt-1 text-xs text-zinc-500">{concert.cancellation_note}</div>
                )}
              </div>
            )}
            <div className="mt-3 flex items-center gap-4 border-t border-zinc-800 pt-3">
              {/* TODO C4.5 : ajouter un bouton "Reprogrammer" pour variant === 'past' qui pre-remplira le form de creation */}
              <Link
                href={`/admin/concerts/${concert.id}`}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <Pencil size={14} />
                Modifier
              </Link>
              <DeleteButton
                concertId={concert.id}
                concertLabel={`${concert.city} - ${concert.date}`}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
