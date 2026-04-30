import Link from 'next/link'
import { Plus, LogOut } from 'lucide-react'
import { getConcerts } from './actions'
import { signOut } from '../actions'
import ConcertsListClient from './ConcertsListClient'

export default async function AdminConcertsPage() {
  const { upcoming, past } = await getConcerts()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-8">

        <header className="sticky top-0 z-10 mb-2 bg-[#0a0a0a] pb-6">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/admin"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ← Retour
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

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="text-4xl font-semibold uppercase tracking-wider text-[#f5c518]"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                CONCERTS
              </h1>
              <p
                className="mt-1 text-sm text-zinc-400"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Gestion des dates
              </p>
            </div>
            <Link
              href="/admin/concerts/new"
              className="inline-flex items-center gap-2 rounded bg-[#f5c518] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90"
            >
              <Plus size={18} />
              Ajouter un concert
            </Link>
          </div>
        </header>

        <ConcertsListClient upcoming={upcoming} past={past} />

      </div>
    </div>
  )
}
