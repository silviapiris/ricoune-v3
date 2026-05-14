'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { Oswald, Raleway } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { Suspense, useActionState } from 'react'
import { PasswordInput } from '@/components/admin/PasswordInput'
import { signIn, type SignInState } from './actions'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

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

const errorMessages: Record<string, string> = {
  invalid_link: 'Le lien est invalide. Demandez un nouveau lien de réinitialisation.',
  expired_link: 'Le lien a expiré. Demandez un nouveau lien de réinitialisation.',
}

function UrlMessageBanners() {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')
  const urlSuccess = searchParams.get('password_updated')
  const urlErrorMessage = urlError ? errorMessages[urlError] ?? null : null
  const passwordUpdatedMessage =
    urlSuccess === '1'
      ? 'Mot de passe mis à jour avec succès. Connectez-vous avec votre nouveau mot de passe.'
      : null

  return (
    <>
      {urlErrorMessage && (
        <p
          role="alert"
          className="mb-4 rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-center text-sm text-red-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          {urlErrorMessage}
        </p>
      )}
      {passwordUpdatedMessage && (
        <p
          role="status"
          className="mb-4 rounded border border-green-900/50 bg-green-950/50 px-4 py-2.5 text-center text-sm text-green-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          {passwordUpdatedMessage}
        </p>
      )}
    </>
  )
}

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

        <Suspense fallback={null}>
          <UrlMessageBanners />
        </Suspense>

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
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-200"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Mot de passe
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs text-zinc-400 transition hover:text-rc-yellow hover:underline"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              required
              autoComplete="current-password"
              disabled={pending}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-[#f5c518] focus:outline-none focus:ring-1 focus:ring-[#f5c518] disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          {TURNSTILE_SITE_KEY ? (
            <div className="my-4 flex justify-center">
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                options={{
                  theme: 'dark',
                  language: 'fr',
                }}
              />
            </div>
          ) : (
            <p
              role="alert"
              className="rounded border border-red-900/50 bg-red-950/50 px-4 py-2.5 text-center text-sm text-red-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Erreur de configuration : clé Turnstile manquante.
            </p>
          )}

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
      </div>
    </div>
  )
}
