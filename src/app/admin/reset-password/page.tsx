'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useTransition } from 'react'
import { updatePasswordAction } from './actions'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
      // En cas de succes : redirect cote serveur vers /admin/login?password_updated=1
    })
  }

  if (!email) {
    return (
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1
          className="mb-2 text-center text-3xl font-semibold tracking-wider text-rc-yellow"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          DÉFINIR UN NOUVEAU MOT DE PASSE
        </h1>
        <p
          className="mb-6 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Pour réinitialiser votre mot de passe, commencez par demander un code via la page « Mot de passe oublié ».
        </p>
        <p className="text-center">
          <Link
            href="/admin/forgot-password"
            className="text-sm text-rc-yellow transition hover:underline"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            ← Demander un code
          </Link>
        </p>
      </div>
    )
  }

  return (
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
        Saisissez le code de vérification reçu par email et choisissez votre nouveau mot de passe.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="email" value={email} />

        <div>
          <label
            htmlFor="otpCode"
            className="mb-2 block text-sm font-medium text-zinc-200"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Code de vérification
          </label>
          <input
            id="otpCode"
            name="otpCode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoComplete="one-time-code"
            disabled={isPending}
            aria-describedby="otp-help"
            className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-center text-lg tracking-[0.5em] text-zinc-100 placeholder-zinc-500 focus:border-rc-yellow focus:outline-none focus:ring-1 focus:ring-rc-yellow disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="000000"
          />
          <p
            id="otp-help"
            className="mt-1 text-xs text-zinc-500"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Code à 6 chiffres reçu par email
          </p>
        </div>

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
  )
}

export default function AdminResetPasswordPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rc-dark p-4">
      <Suspense fallback={null}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}
