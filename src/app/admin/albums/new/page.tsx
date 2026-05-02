import Link from 'next/link'
import { ArrowLeft, LogOut } from 'lucide-react'
import { signOut } from '../../actions'
import AlbumForm from '../AlbumForm'

export default async function NewAlbumPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-6 py-8">

        <header className="sticky top-0 z-10 mb-6 bg-[#0a0a0a] pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/albums"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ← Retour aux albums
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
            NOUVEL ALBUM
          </h1>
        </header>

        <AlbumForm mode="create" />

      </div>
    </div>
  )
}
