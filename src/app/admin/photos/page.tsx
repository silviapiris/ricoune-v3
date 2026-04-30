import Link from 'next/link'
import { ArrowLeft, LogOut, Upload, Image as ImageIcon } from 'lucide-react'
import { getPhotos, getPublicUrl } from './actions'
import { signOut } from '../actions'

export default async function AdminPhotosPage() {
  const { photos, count } = await getPhotos()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-8">

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

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="text-4xl font-semibold uppercase tracking-wider text-[#f5c518]"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                PHOTOS
              </h1>
              <p
                className="mt-1 text-sm text-zinc-400"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Gérer la galerie ({count} photo{count > 1 ? 's' : ''})
              </p>
            </div>
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded bg-[#f5c518]/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a]/60"
              title="Disponible prochainement"
            >
              <Upload size={18} />
              Ajouter des photos
            </button>
          </div>
        </header>

        {count === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
            <ImageIcon size={40} className="text-zinc-700" />
            <p className="text-zinc-500">
              Aucune photo pour l&apos;instant. Clique sur Ajouter pour commencer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getPublicUrl(photo.storage_path)}
                  alt={photo.alt_text ?? ''}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
