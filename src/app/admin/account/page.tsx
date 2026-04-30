'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { LogOut, KeyRound, ArrowLeft } from 'lucide-react'
import { updatePassword, type AccountActionState } from './actions'
import { signOut } from '../actions'

const initialState: AccountActionState = {}

export default function AdminAccountPage() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <header className="sticky top-0 z-10 mb-8 bg-[#0a0a0a] pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft size={16} />
              Retour
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
              >
                <LogOut size={16} />
                Se déconnecter
              </button>
            </form>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <KeyRound size={28} className="text-[#f5c518]" />
            <div>
              <h1
                className="text-3xl font-semibold uppercase tracking-wider text-[#f5c518]"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                MON COMPTE
              </h1>
              <p className="mt-0.5 text-sm text-zinc-400">Changer mon mot de passe</p>
            </div>
          </div>
        </header>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <form action={formAction} className="space-y-5">

            <div>
              <label
                htmlFor="currentPassword"
                className="mb-1.5 block text-sm text-zinc-300"
              >
                Mot de passe actuel <span className="text-red-400">*</span>
              </label>
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                required
                autoComplete="current-password"
                disabled={pending}
                className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-[#f5c518] focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-1.5 block text-sm text-zinc-300"
              >
                Nouveau mot de passe <span className="text-red-400">*</span>
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                required
                minLength={8}
                autoComplete="new-password"
                disabled={pending}
                className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-[#f5c518] focus:outline-none disabled:opacity-50"
              />
              <p className="mt-1 text-xs text-zinc-500">Minimum 8 caractères.</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm text-zinc-300"
              >
                Confirmer le nouveau mot de passe <span className="text-red-400">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                autoComplete="new-password"
                disabled={pending}
                className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-[#f5c518] focus:outline-none disabled:opacity-50"
              />
            </div>

            {state?.error && (
              <p
                role="alert"
                className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-sm text-red-400"
              >
                {state.error}
              </p>
            )}

            {state?.success && (
              <p
                role="status"
                className="rounded border border-emerald-900/40 bg-emerald-950/30 px-4 py-2.5 text-sm text-emerald-300"
              >
                {state.success}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={pending}
                className="rounded bg-[#f5c518] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {pending ? 'Enregistrement...' : 'Mettre à jour'}
              </button>
              <Link
                href="/admin"
                className="rounded border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-700"
              >
                Annuler
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}
