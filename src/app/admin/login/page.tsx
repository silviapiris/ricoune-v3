'use client'

import { Oswald, Raleway } from 'next/font/google'
import { useActionState } from 'react'
import { signIn, type SignInState } from './actions'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-oswald',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-raleway',
})

const initialState: SignInState = {}

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState)

  return (
    <div
      className={`${oswald.variable} ${raleway.variable} fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] p-4`}
    >
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1
          className="mb-2 text-center text-3xl font-semibold tracking-wider text-[#f5c518]"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          RICOUNE ADMIN
        </h1>
        <p
          className="mb-8 text-center text-sm text-zinc-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Espace de gestion réservé
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
              disabled={pending}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518] disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-200"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={pending}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518] disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded bg-[#f5c518] px-4 py-3 font-semibold uppercase tracking-wider text-[#0a0a0a] transition hover:bg-[#e5b610] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {pending ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          {state?.error && (
            <p
              role="alert"
              className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-center text-sm text-red-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              {state.error}
            </p>
          )}
        </form>

        <p
          className="mt-6 text-center text-xs text-zinc-500"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Si vous avez perdu votre accès, contactez Silvia.
        </p>
      </div>
    </div>
  )
}
