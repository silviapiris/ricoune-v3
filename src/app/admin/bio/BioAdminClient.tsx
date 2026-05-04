'use client'

import Link from 'next/link'
import { ArrowLeft, LogOut } from 'lucide-react'
import { signOut } from '../actions'
import type { BioContent, BioTimelineEvent } from '@/lib/bio'
import BioImageUpload from './BioImageUpload'

interface Props {
  bio: BioContent | null
  timeline: BioTimelineEvent[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function BioAdminClient({ bio, timeline }: Props) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-3xl px-6 py-8">

        <header className="sticky top-0 z-10 mb-8 bg-[#0a0a0a] pb-4">
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
              BIOGRAPHIE
            </h1>
            <p
              className="mt-1 text-sm text-zinc-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Modifier le contenu de la page biographie
            </p>
            {bio?.updated_at && (
              <p className="mt-1 text-xs text-zinc-600">
                Dernière modif : {formatDate(bio.updated_at)}
              </p>
            )}
          </div>
        </header>

        {/* ── Aperçu lecture seule ── */}
        <section className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Aperçu des données (lecture seule — B3.1)
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Sous-titre hero
              </p>
              <p className="mt-1 text-sm text-white/80">
                {bio?.hero_subtitle ?? <span className="text-zinc-600 italic">non défini</span>}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Titre section Histoire
              </p>
              <p className="mt-1 text-sm text-white/80">
                {bio?.history_title ?? <span className="text-zinc-600 italic">non défini</span>}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Événements dans la frise
              </p>
              <p className="mt-1 text-sm text-white/80">
                {timeline.length} événement{timeline.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </section>

        {/* ── Section test upload ── */}
        <section className="rounded-lg border border-amber-900/40 bg-zinc-900 p-6">
          <h2
            className="mb-1 text-sm font-semibold uppercase tracking-wider text-amber-400"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Test Upload — B3.1
          </h2>
          <p
            className="mb-5 text-xs text-zinc-500"
            style={{ fontFamily: 'var(--font-raleway)' }}
          >
            Vérifie que l&apos;upload vers le bucket{' '}
            <code className="rounded bg-zinc-800 px-1 text-zinc-400">bio</code> fonctionne.
            Cette section sera remplacée par les cartes éditables en B3.2 / B3.3.
            L&apos;URL retournée est loguée dans la console (F12).
          </p>

          <BioImageUpload
            label="Image de test"
            currentUrl={null}
            storagePrefix="test"
            recommendedSize="Tout format — test uniquement"
            onUploadComplete={(url) => {
              console.log('[BioImageUpload test] URL reçue :', url)
            }}
          />
        </section>

      </div>
    </div>
  )
}
