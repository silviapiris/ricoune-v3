'use client'

import { useState, useActionState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowLeft, LogOut, Loader2, CheckCircle } from 'lucide-react'
import { signOut } from '../actions'
import { updateBioContent } from './actions'
import type { BioTextState } from './actions'
import { createTimelineEvent, reorderTimelineEvents } from './timelineActions'
import type { BioContent, BioTimelineEvent } from '@/lib/bio'
import BioImageUpload from './BioImageUpload'
import TimelineCard from './TimelineCard'

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
  // ── Text card states (B3.2) ───────────────────────────────────────────────
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

  const [stripState, stripAction, stripPending] = useActionState<
    BioTextState | undefined,
    FormData
  >(updateBioContent, undefined)

  // ── Image DB status (B3.3) ────────────────────────────────────────────────
  const [imgDbStatus, setImgDbStatus] = useState<
    Record<string, 'saved' | 'error' | null>
  >({})

  async function saveImageUrl(field: string, url: string) {
    const fd = new FormData()
    fd.append(field, url)
    const result = await updateBioContent(undefined, fd)
    const status = result?.error ? 'error' : 'saved'
    setImgDbStatus((prev) => ({ ...prev, [field]: status }))
    if (status === 'saved') {
      setTimeout(() => {
        setImgDbStatus((prev) => ({ ...prev, [field]: null }))
      }, 3000)
    }
  }

  const stripPhotos: {
    field: string
    currentUrl: string | null
    storagePrefix: string
    label: string
  }[] = [
    {
      field: 'strip_photo_1_url',
      currentUrl: bio?.strip_photo_1_url ?? null,
      storagePrefix: 'strip-1',
      label: 'Photo 1',
    },
    {
      field: 'strip_photo_2_url',
      currentUrl: bio?.strip_photo_2_url ?? null,
      storagePrefix: 'strip-2',
      label: 'Photo 2',
    },
    {
      field: 'strip_photo_3_url',
      currentUrl: bio?.strip_photo_3_url ?? null,
      storagePrefix: 'strip-3',
      label: 'Photo 3',
    },
  ]

  // ── Timeline CRUD (B4) ────────────────────────────────────────────────────
  const [newYear, setNewYear] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [createError, setCreateError] = useState<string | null>(null)
  const [isCreating, startCreateTransition] = useTransition()

  function handleAddSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setCreateError(null)
    const fd = new FormData()
    fd.append('year', newYear.trim())
    fd.append('description', newDesc.trim())
    startCreateTransition(async () => {
      const result = await createTimelineEvent(undefined, fd)
      if (result?.error) {
        setCreateError(result.error)
      } else {
        setNewYear('')
        setNewDesc('')
      }
    })
  }

  async function handleMoveUp(idx: number) {
    if (idx === 0) return
    const newOrder = [...timeline]
    ;[newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]]
    await reorderTimelineEvents(newOrder.map((e) => e.id))
  }

  async function handleMoveDown(idx: number) {
    if (idx === timeline.length - 1) return
    const newOrder = [...timeline]
    ;[newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]]
    await reorderTimelineEvents(newOrder.map((e) => e.id))
  }

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
                <p className={LABEL}>Image de fond hero</p>
                <BioImageUpload
                  label=""
                  currentUrl={bio?.hero_image_url ?? null}
                  storagePrefix="hero"
                  recommendedSize="1920×1080px WebP"
                  onUploadComplete={async (url) => {
                    await saveImageUrl('hero_image_url', url)
                  }}
                />
                {imgDbStatus['hero_image_url'] === 'saved' && (
                  <span className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle size={11} />
                    URL enregistrée
                  </span>
                )}
                {imgDbStatus['hero_image_url'] === 'error' && (
                  <p className="mt-1.5 text-xs text-red-400">
                    Erreur d&apos;enregistrement — réessaie
                  </p>
                )}
              </div>
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
                <p className={LABEL}>Portrait</p>
                <BioImageUpload
                  label=""
                  currentUrl={bio?.portrait_image_url ?? null}
                  storagePrefix="portrait"
                  recommendedSize="600×800px WebP (format portrait)"
                  onUploadComplete={async (url) => {
                    await saveImageUrl('portrait_image_url', url)
                  }}
                />
                {imgDbStatus['portrait_image_url'] === 'saved' && (
                  <span className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle size={11} />
                    URL enregistrée
                  </span>
                )}
                {imgDbStatus['portrait_image_url'] === 'error' && (
                  <p className="mt-1.5 text-xs text-red-400">
                    Erreur d&apos;enregistrement — réessaie
                  </p>
                )}
              </div>
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

          {/* ── Carte 4 : Frise chronologique ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Frise chronologique
            </h2>
            <p
              className="mb-6 text-sm text-zinc-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              Les événements clés de la carrière de Ricoune. Utilise les flèches pour
              réordonner. Le premier événement apparaît en haut de la frise sur la page
              publique.
            </p>

            {/* Liste des événements existants */}
            <div className="space-y-3">
              {timeline.map((event, idx) => (
                <TimelineCard
                  key={event.id}
                  event={event}
                  onMoveUp={() => handleMoveUp(idx)}
                  onMoveDown={() => handleMoveDown(idx)}
                  isFirst={idx === 0}
                  isLast={idx === timeline.length - 1}
                />
              ))}
              {timeline.length === 0 && (
                <p className="text-sm italic text-zinc-600">
                  Aucun événement pour l&apos;instant.
                </p>
              )}
            </div>

            {/* Formulaire d'ajout */}
            <div className="mt-6 border-t border-zinc-800 pt-6">
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Ajouter un événement
              </h3>
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label htmlFor="new_year" className={LABEL}>
                    Année <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="new_year"
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    maxLength={20}
                    placeholder="Ex : 2026"
                    disabled={isCreating}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label htmlFor="new_description" className={LABEL}>
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="new_description"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Décris l'événement…"
                    disabled={isCreating}
                    className={TEXTAREA}
                  />
                  <p
                    className={`mt-1 text-right text-xs ${
                      newDesc.length > 300 ? 'text-amber-400' : 'text-zinc-600'
                    }`}
                  >
                    {newDesc.length} / 300
                  </p>
                </div>
                {createError && (
                  <p className="text-xs text-red-400">{createError}</p>
                )}
                <button
                  type="submit"
                  disabled={isCreating || !newYear.trim() || !newDesc.trim()}
                  className="flex items-center gap-2 rounded bg-[#f5c518] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isCreating && <Loader2 size={12} className="animate-spin" />}
                  {isCreating ? 'Ajout…' : 'Ajouter'}
                </button>
              </form>
            </div>
          </section>

          {/* ── Carte 5 : Photo Strip ── */}
          <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Photo Strip — En scène
            </h2>
            <form action={stripAction} className="space-y-4">
              <div>
                <label htmlFor="strip_label" className={LABEL}>
                  Sur-titre du strip
                </label>
                <input
                  id="strip_label"
                  type="text"
                  name="strip_label"
                  maxLength={60}
                  defaultValue={bio?.strip_label ?? ''}
                  disabled={stripPending}
                  className={INPUT}
                />
              </div>
              <div>
                <label htmlFor="strip_title" className={LABEL}>
                  Titre du strip
                </label>
                <input
                  id="strip_title"
                  type="text"
                  name="strip_title"
                  maxLength={100}
                  defaultValue={bio?.strip_title ?? ''}
                  disabled={stripPending}
                  className={INPUT}
                />
              </div>
              <div>
                <label htmlFor="strip_cta_label" className={LABEL}>
                  Libellé du bouton (CTA)
                </label>
                <input
                  id="strip_cta_label"
                  type="text"
                  name="strip_cta_label"
                  maxLength={60}
                  defaultValue={bio?.strip_cta_label ?? ''}
                  disabled={stripPending}
                  className={INPUT}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {stripPhotos.map(({ field, currentUrl, storagePrefix, label }) => (
                  <div key={field}>
                    <p className={LABEL}>{label}</p>
                    <BioImageUpload
                      label=""
                      currentUrl={currentUrl}
                      storagePrefix={storagePrefix}
                      recommendedSize="800×600px WebP"
                      onUploadComplete={async (url) => {
                        await saveImageUrl(field, url)
                      }}
                    />
                    {imgDbStatus[field] === 'saved' && (
                      <span className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle size={11} />
                        URL enregistrée
                      </span>
                    )}
                    {imgDbStatus[field] === 'error' && (
                      <p className="mt-1.5 text-xs text-red-400">
                        Erreur d&apos;enregistrement — réessaie
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p
                className="text-xs text-zinc-500"
                style={{ fontFamily: 'var(--font-raleway)' }}
              >
                Les photos paysage (ratio 4/3 ou plus large) donnent un meilleur rendu.
                Évite les portraits qui risquent d&apos;avoir la tête coupée par le cadrage automatique.
              </p>
              <SaveRow state={stripState} pending={stripPending} />
            </form>
          </section>

          {/* ── Carte 6 : Philosophie ── */}
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

          {/* ── Carte 7 : CTA ── */}
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

        </div>
      </div>
    </div>
  )
}
