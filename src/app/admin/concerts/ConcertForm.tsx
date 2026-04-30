'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import type { Concert, ConcertActionState } from './actions'
import { createConcert, updateConcert } from './actions'

type Props = {
  mode: 'create' | 'edit'
  concert?: Concert
}

const INPUT_CLASS =
  'w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-[#f5c518] focus:outline-none disabled:opacity-50'

const LABEL_CLASS = 'block mb-1.5 text-sm text-zinc-300'

const initialState: ConcertActionState = {}

export default function ConcertForm({ mode, concert }: Props) {
  const action =
    mode === 'edit'
      ? updateConcert.bind(null, concert!.id)
      : createConcert

  const [state, formAction, pending] = useActionState(action, initialState)
  const [cancelled, setCancelled] = useState(concert?.cancelled ?? false)

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h2
        className="mb-6 text-2xl font-semibold uppercase tracking-wider text-[#f5c518]"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        {mode === 'create' && concert
          ? 'Reprogrammer un concert'
          : mode === 'create'
            ? 'Nouveau concert'
            : 'Modifier le concert'}
      </h2>

      <form action={formAction} className="space-y-5">

        {/* Date + Heure */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className={LABEL_CLASS}>
              Date <span className="text-red-400">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              required
              defaultValue={concert?.date}
              disabled={pending}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="time" className={LABEL_CLASS}>
              Heure <span className="text-red-400">*</span>
            </label>
            <input
              id="time"
              type="time"
              name="time"
              required
              defaultValue={concert?.time?.slice(0, 5)}
              disabled={pending}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Ville */}
        <div>
          <label htmlFor="city" className={LABEL_CLASS}>
            Ville <span className="text-red-400">*</span>
          </label>
          <input
            id="city"
            type="text"
            name="city"
            required
            maxLength={100}
            defaultValue={concert?.city}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Lieu */}
        <div>
          <label htmlFor="venue" className={LABEL_CLASS}>
            Lieu <span className="text-red-400">*</span>
          </label>
          <input
            id="venue"
            type="text"
            name="venue"
            required
            maxLength={200}
            defaultValue={concert?.venue}
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className={LABEL_CLASS}>
            Type <span className="text-red-400">*</span>
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={concert?.type ?? 'solo'}
            disabled={pending}
            className={INPUT_CLASS}
          >
            <option value="solo">Solo</option>
            <option value="groupe">Groupe</option>
          </select>
        </div>

        {/* Département + Code postal */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="department" className={LABEL_CLASS}>
              Département
            </label>
            <input
              id="department"
              type="text"
              name="department"
              maxLength={100}
              defaultValue={concert?.department ?? ''}
              disabled={pending}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="postal_code" className={LABEL_CLASS}>
              Code postal
            </label>
            <input
              id="postal_code"
              type="text"
              name="postal_code"
              maxLength={10}
              defaultValue={concert?.postal_code ?? ''}
              disabled={pending}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Lien Maps */}
        <div>
          <label htmlFor="maps_url" className={LABEL_CLASS}>
            Lien Google Maps
          </label>
          <input
            id="maps_url"
            type="url"
            name="maps_url"
            defaultValue={concert?.maps_url ?? ''}
            placeholder="https://maps.google.com/..."
            disabled={pending}
            className={INPUT_CLASS}
          />
        </div>

        {/* Infos spéciales */}
        <div>
          <label htmlFor="infos_speciales" className={LABEL_CLASS}>
            Infos spéciales
          </label>
          <textarea
            id="infos_speciales"
            name="infos_speciales"
            rows={2}
            defaultValue={concert?.infos_speciales ?? ''}
            disabled={pending}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        {/* Tout public */}
        <div className="flex items-center gap-2">
          <input
            id="all_ages"
            type="checkbox"
            name="all_ages"
            defaultChecked={concert?.all_ages ?? true}
            disabled={pending}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-[#f5c518]"
          />
          <label htmlFor="all_ages" className="text-sm text-zinc-300">
            Tout public
          </label>
        </div>

        {/* Annulé */}
        <div className="flex items-center gap-2">
          <input
            id="cancelled"
            type="checkbox"
            name="cancelled"
            checked={cancelled}
            onChange={(e) => setCancelled(e.target.checked)}
            disabled={pending}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-red-500"
          />
          <label htmlFor="cancelled" className="text-sm text-zinc-300">
            Concert annulé
          </label>
        </div>

        {/* Note d'annulation — visible uniquement si annulé */}
        {cancelled && (
          <div>
            <label htmlFor="cancellation_note" className={LABEL_CLASS}>
              Note d'annulation
            </label>
            <textarea
              id="cancellation_note"
              name="cancellation_note"
              rows={2}
              defaultValue={concert?.cancellation_note ?? ''}
              disabled={pending}
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>
        )}

        {/* Erreur Server Action */}
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
            href="/admin/concerts"
            className="rounded border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-700"
          >
            Annuler
          </Link>
        </div>

      </form>
    </div>
  )
}
