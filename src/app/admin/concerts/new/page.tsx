import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { signOut } from '../../actions'
import { getConcertById } from '../actions'
import ConcertForm from '../ConcertForm'

export default async function NewConcertPage({
  searchParams,
}: {
  searchParams: Promise<{ fromId?: string }>
}) {
  const { fromId } = await searchParams
  const sourceConcert = fromId ? await getConcertById(fromId) : null

  const template = sourceConcert
    ? { ...sourceConcert, date: '', cancelled: false, cancellation_note: null }
    : undefined

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-6 py-8">

        <header className="sticky top-0 z-10 mb-6 bg-[#0a0a0a] pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/concerts"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ← Retour aux concerts
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
          <h1
            className="mt-4 text-3xl font-semibold uppercase tracking-wider text-[#f5c518]"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            NOUVEAU CONCERT
          </h1>
        </header>

        {sourceConcert && (
          <div className="mb-4 rounded border border-[#f5c518]/30 bg-[#f5c518]/10 px-4 py-2.5 text-sm text-zinc-300">
            Pré-remplissage depuis : {sourceConcert.city} — {sourceConcert.venue}. La date est vide à remplir.
          </div>
        )}

        <ConcertForm mode="create" concert={template} />

      </div>
    </div>
  )
}
