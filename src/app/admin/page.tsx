import { Oswald, Raleway } from 'next/font/google'
import Link from 'next/link'
import { Calendar, Image, Disc3, Video, Mail, FileText, KeyRound, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from './actions'
import { getConcerts } from './concerts/actions'
import { getMessages } from './messages/actions'
import { getPhotos } from './photos/actions'
import { getVideos } from './videos/actions'
import { getAlbums } from './albums/actions'

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
  const { upcoming } = await getConcerts()
  const { unreadCount } = await getMessages()
  const { count: photoCount } = await getPhotos()
  const { count: videoCount } = await getVideos()
  const { count: albumCount } = await getAlbums()

  return (
    <div
      className={`${oswald.variable} ${raleway.variable} fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]`}
    >
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 shadow-2xl sm:p-10">
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

          <div className="mb-8">
            <h2
              className="mb-4 text-center text-xs uppercase tracking-widest text-zinc-500"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Modules de gestion
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Carte ACTIVE Concerts */}
              <Link
                href="/admin/concerts"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <Calendar size={22} className="text-[#f5c518]" />
                  <span className="text-xs text-zinc-500">{upcoming.length} à venir</span>
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Concerts
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Gérer les dates de concerts
                </p>
              </Link>

              {/* Carte ACTIVE Mon compte */}
              <Link
                href="/admin/account"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <KeyRound size={22} className="text-[#f5c518]" />
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Mon compte
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Changer mon mot de passe
                </p>
              </Link>

              {/* Carte ACTIVE Messages */}
              <Link
                href="/admin/messages"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <Mail size={22} className="text-[#f5c518]" />
                  {unreadCount > 0 ? (
                    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  ) : (
                    <span className="rounded bg-emerald-900/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
                      Tout lu
                    </span>
                  )}
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Messages
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Lire les messages reçus
                </p>
              </Link>

              {/* Carte ACTIVE Photos */}
              <Link
                href="/admin/photos"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <Image size={22} className="text-[#f5c518]" />
                  <span className="text-xs text-zinc-500">{photoCount} photo{photoCount > 1 ? 's' : ''}</span>
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Photos
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Gérer la galerie
                </p>
              </Link>

              {/* Carte ACTIVE Vidéos */}
              <Link
                href="/admin/videos"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <Video size={22} className="text-[#f5c518]" />
                  <span className="text-xs text-zinc-500">{videoCount} vidéo{videoCount > 1 ? 's' : ''}</span>
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Vidéos
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Gérer les clips et lives
                </p>
              </Link>

              {/* Carte ACTIVE Albums */}
              <Link
                href="/admin/albums"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <Disc3 size={22} className="text-[#f5c518]" />
                  <span className="text-xs text-zinc-500">{albumCount} album{albumCount > 1 ? 's' : ''}</span>
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Albums
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Gérer les albums et tracklist
                </p>
              </Link>

              {/* Carte ACTIVE Biographie */}
              <Link
                href="/admin/bio"
                className="group flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 transition-all hover:border-[#f5c518]/50 hover:bg-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <BookOpen size={22} className="text-[#f5c518]" />
                </div>
                <div
                  className="text-base font-semibold uppercase tracking-wider text-[#f5c518]"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Biographie
                </div>
                <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-raleway)' }}>
                  Modifier les textes et photos de la page bio
                </p>
              </Link>

              {/* Cartes GRISÉES (placeholder) */}
              {[
                { Icon: FileText, label: 'Devis' },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-zinc-600" />
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
                      Bientôt
                    </span>
                  </div>
                  <div
                    className="text-base font-semibold uppercase tracking-wider text-zinc-500"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    {label}
                  </div>
                  <p className="text-xs text-zinc-600" style={{ fontFamily: 'var(--font-raleway)' }}>
                    Module à venir
                  </p>
                </div>
              ))}

            </div>
          </div>

          <form action={signOut} className="flex justify-center">
            <button
              type="submit"
              className="rounded border border-zinc-700 bg-zinc-800 px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-zinc-300 transition hover:bg-zinc-700 hover:text-zinc-100"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
