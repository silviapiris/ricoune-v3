import { Oswald, Raleway } from 'next/font/google'
import { createClient } from '@/lib/supabase/server'

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

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div
      className={`${oswald.variable} ${raleway.variable} fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] p-4`}
    >
      <div className="w-full max-w-2xl rounded-lg border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
        <h1
          className="mb-3 text-center text-4xl font-semibold tracking-wider text-[#f5c518]"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          RICOUNE ADMIN
        </h1>
        <p
          className="mb-10 text-center text-sm uppercase tracking-widest text-zinc-500"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Espace de gestion
        </p>

        <div
          className="mb-8 rounded-lg border border-emerald-900/40 bg-emerald-950/30 p-6 text-center"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          <p className="mb-2 text-2xl">✅</p>
          <p className="text-lg font-medium text-emerald-300">
            Connexion réussie
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Bienvenue,{' '}
            <span className="font-semibold text-zinc-100">
              {user?.email ?? 'utilisateur inconnu'}
            </span>
          </p>
        </div>

        <p
          className="text-center text-xs text-zinc-500"
          style={{ fontFamily: 'var(--font-raleway)' }}
        >
          Le tableau de bord complet (gestion des concerts, photos, albums…)
          arrive prochainement.
        </p>
      </div>
    </div>
  )
}
