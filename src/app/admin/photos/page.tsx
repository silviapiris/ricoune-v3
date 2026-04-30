import Link from 'next/link'
import { ArrowLeft, LogOut, Image as ImageIcon } from 'lucide-react'
import { getPhotos } from './actions'
import { signOut } from '../actions'
import PhotosUploader from './PhotosUploader'
import PhotoCard from './PhotoCard'

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
        </header>

        <PhotosUploader />

        {count === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
            <ImageIcon size={40} className="text-zinc-700" />
            <p className="text-zinc-500">
              Aucune photo pour l&apos;instant. Glisse des photos ci-dessus pour commencer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
