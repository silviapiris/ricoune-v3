'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LogOut, Loader2, CheckCircle } from 'lucide-react'
import { signOut } from '../actions'
import { updateBioContent } from './actions'
import type { BioTextState } from './actions'
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

const INPUT =
  'w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-[#f5c518]/40 focus:outline-none disabled:opacity-50'
const TEXTAREA = `${INPUT} resize-none leading-relaxed`
const LABEL = 'block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1'

function SaveRow({
  state,
  pending,
}: {
  state: BioTextState | undefined
  pending: boolean
}) {
  return (
    <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 rounded bg-[#f5c518] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending && <Loader2 size={12} className="animate-spin" />}
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </button>
      {state?.success && (
        <span className="flex items-center gap-1 text-xs text-emerald-400">
          <CheckCircle size={12} />
          Sauvegardé
        </span>
      )}
      {state?.error && (
        <span className="text-xs text-red-400">{state.error}</span>
      )}
    </div>
  )
}

export default function BioAdminClient({ bio, timeline }: Props) {
  const [heroState, heroAction, heroPending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

  const [quoteState, quoteAction, quotePending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

  const [historyState, historyAction, historyPending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

  const [philoState, philoAction, philoPending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

  const [ctaState, ctaAction, ctaPending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

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
            <p className="mt-0.5 text-xs text-zinc-600">
              Frise : {timeline.length} événement{timeline.length !== 1 ? 's' : ''}
            </p>
          </div>
        </header>

        <div className="space-y-4">

          {/* ── Carte 1 : Hero ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Hero
            </h2>
            <form action={heroAction} className="space-y-4">
              <div>
                <label htmlFor="hero_subtitle" className={LABEL}>
                  Sous-titre hero
                </label>
                <textarea
                  id="hero_subtitle"
                  name="hero_subtitle"
                  rows={2}
                  defaultValue={bio?.hero_subtitle ?? ''}
                  disabled={heroPending}
                  className={TEXTAREA}
                />
              </div>
              <SaveRow state={heroState} pending={heroPending} />
            </form>
          </section>

          {/* ── Carte 2 : Citation ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Citation
            </h2>
            <form action={quoteAction} className="space-y-4">
              <div>
                <label htmlFor="quote_text" className={LABEL}>
                  Texte de la citation
                </label>
                <textarea
                  id="quote_text"
                  name="quote_text"
                  rows={3}
                  defaultValue={bio?.quote_text ?? ''}
                  disabled={quotePending}
                  className={TEXTAREA}
                />
              </div>
              <SaveRow state={quoteState} pending={quotePending} />
            </form>
          </section>

          {/* ── Carte 3 : Histoire ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Histoire
            </h2>
            <form action={historyAction} className="space-y-4">
              <div>
                <label htmlFor="history_title" className={LABEL}>
                  Titre
                </label>
                <input
                  id="history_title"
                  type="text"
                  name="history_title"
                  maxLength={100}
                  defaultValue={bio?.history_title ?? ''}
                  disabled={historyPending}
                  className={INPUT}
                />
              </div>
              <div>
                <label htmlFor="portrait_alt" className={LABEL}>
                  Texte alternatif portrait — accessibilité
                </label>
                <input
                  id="portrait_alt"
                  type="text"
                  name="portrait_alt"
                  maxLength={150}
                  defaultValue={bio?.portrait_alt ?? ''}
                  disabled={historyPending}
                  className={INPUT}
                />
              </div>
              <div>
                <label htmlFor="history_paragraph_1" className={LABEL}>
                  Paragraphe 1
                </label>
                <textarea
                  id="history_paragraph_1"
                  name="history_paragraph_1"
                  rows={6}
                  defaultValue={bio?.history_paragraph_1 ?? ''}
                  disabled={historyPending}
                  className={TEXTAREA}
                />
              </div>
              <div>
                <label htmlFor="history_paragraph_2" className={LABEL}>
                  Paragraphe 2
                </label>
                <textarea
                  id="history_paragraph_2"
                  name="history_paragraph_2"
                  rows={4}
                  defaultValue={bio?.history_paragraph_2 ?? ''}
                  disabled={historyPending}
                  className={TEXTAREA}
                />
              </div>
              <SaveRow state={historyState} pending={historyPending} />
            </form>
          </section>

          {/* ── Carte 4 : Philosophie ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Philosophie
            </h2>
            <form action={philoAction} className="space-y-4">
              <div>
                <label htmlFor="philosophy_text" className={LABEL}>
                  Texte
                </label>
                <textarea
                  id="philosophy_text"
                  name="philosophy_text"
                  rows={4}
                  defaultValue={bio?.philosophy_text ?? ''}
                  disabled={philoPending}
                  className={TEXTAREA}
                />
              </div>
              <SaveRow state={philoState} pending={philoPending} />
            </form>
          </section>

          {/* ── Carte 5 : CTA ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              CTA
            </h2>
            <form action={ctaAction} className="space-y-4">
              <div>
                <label htmlFor="cta_text" className={LABEL}>
                  Texte d&apos;intro
                </label>
                <textarea
                  id="cta_text"
                  name="cta_text"
                  rows={3}
                  defaultValue={bio?.cta_text ?? ''}
                  disabled={ctaPending}
                  className={TEXTAREA}
                />
              </div>
              <div>
                <label htmlFor="cta_button_1_label" className={LABEL}>
                  Libellé bouton 1
                </label>
                <input
                  id="cta_button_1_label"
                  type="text"
                  name="cta_button_1_label"
                  maxLength={60}
                  defaultValue={bio?.cta_button_1_label ?? ''}
                  disabled={ctaPending}
                  className={INPUT}
                />
              </div>
              <div>
                <label htmlFor="cta_button_2_label" className={LABEL}>
                  Libellé bouton 2
                </label>
                <input
                  id="cta_button_2_label"
                  type="text"
                  name="cta_button_2_label"
                  maxLength={60}
                  defaultValue={bio?.cta_button_2_label ?? ''}
                  disabled={ctaPending}
                  className={INPUT}
                />
              </div>
              <SaveRow state={ctaState} pending={ctaPending} />
            </form>
          </section>

          {/* ── Section test upload (conservée B3.1) ── */}
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
    </div>
  )
}
