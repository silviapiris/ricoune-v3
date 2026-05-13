'use client'

import { useState, useTransition } from 'react'
import { updatePasswordAction } from './actions'

export default function AdminResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const result = await updatePasswordAction(formData)
      if (result?.error) {
        setError(result.error)
      }
      // En cas de succes : redirect cote serveur vers /admin?password_updated=1
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rc-dark p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1
          className="mb-2 text-center text-3xl font-semibold tracking-wider text-rc-yellow"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          DÉFINIR UN NOUVEAU MOT DE PASSE
        </h1>
        <p
          className="mb-8 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Choisissez un mot de passe sécurisé pour votre compte administrateur.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-200"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={12}
              autoComplete="new-password"
              disabled={isPending}
              aria-describedby="password-help"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-rc-yellow focus:outline-none focus:ring-1 focus:ring-rc-yellow disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-zinc-200"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={12}
              autoComplete="new-password"
              disabled={isPending}
              aria-describedby="password-help"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-rc-yellow focus:outline-none focus:ring-1 focus:ring-rc-yellow disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="••••••••••••"
            />
          </div>

          <p
            id="password-help"
            className="text-xs text-zinc-500"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Minimum 12 caractères, avec majuscule, minuscule, chiffre et caractère spécial.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-rc-yellow px-4 py-3 font-semibold uppercase tracking-wider text-rc-dark transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {isPending ? 'Mise à jour en cours...' : 'Mettre à jour le mot de passe'}
          </button>

          {error && (
            <p
              role="alert"
              className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-center text-sm text-red-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
