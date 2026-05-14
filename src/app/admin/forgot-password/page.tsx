'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import TurnstileWidget from '@/components/forms/TurnstileWidget'
import { sendPasswordResetAction } from '../login/actions'

export default function AdminForgotPasswordPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(
    sendPasswordResetAction,
    undefined,
  )

  useEffect(() => {
    if (state?.email) {
      router.push(
        `/admin/reset-password?email=${encodeURIComponent(state.email)}`,
      )
    }
  }, [state?.email, router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rc-dark p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1
          className="mb-2 text-center text-3xl font-semibold uppercase tracking-wider text-rc-yellow"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          MOT DE PASSE OUBLIÉ
        </h1>
        <p
          className="mb-8 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Saisissez votre email pour recevoir un code de vérification.
        </p>

        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={isPending}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-rc-yellow focus:outline-none focus:ring-1 focus:ring-rc-yellow disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="vous@exemple.com"
            />
          </div>

          <TurnstileWidget />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-rc-yellow px-4 py-3 font-semibold uppercase tracking-wider text-rc-dark transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {isPending ? 'Envoi en cours...' : 'Envoyer le code'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-xs text-zinc-400 transition hover:text-rc-yellow"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  )
}
