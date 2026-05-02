import Link from 'next/link'
import { ArrowLeft, LogOut, Disc3, Plus } from 'lucide-react'
import { getAlbums } from './actions'
import { signOut } from '../actions'
import AlbumCard from './AlbumCard'

export default async function AdminAlbumsPage() {
  const { albums, count } = await getAlbums()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-6 py-8">

        <header className="sticky top-0 z-10 mb-6 bg-[#0a0a0a] pb-4">
          <div className="mb-4 flex items-center justify-between">
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

          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Disc3 size={32} className="text-[#f5c518]" />
                <h1
                  className="text-4xl font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  ALBUMS
                </h1>
              </div>
              <p
                className="mt-1 text-sm text-zinc-400"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Gérer la discographie ({count} album{count > 1 ? 's' : ''})
              </p>
            </div>
            <Link
              href="/admin/albums/new"
              className="flex items-center gap-2 rounded bg-[#f5c518] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90"
            >
              <Plus size={16} />
              Nouvel album
            </Link>
          </div>
        </header>

        {count === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
            <Disc3 size={40} className="text-zinc-700" />
            <p className="text-zinc-500">
              Aucun album pour l&apos;instant.{' '}
              <Link href="/admin/albums/new" className="text-[#f5c518] hover:underline">
                Créer le premier
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {albums.map((album, index) => (
              <AlbumCard
                key={album.id}
                album={album}
                isFirst={index === 0}
                isLast={index === albums.length - 1}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
