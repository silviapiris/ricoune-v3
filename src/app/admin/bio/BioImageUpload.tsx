'use client'

import { useRef, useState } from 'react'
import { ImageUp, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/lib/supabase/client'

type Phase = 'idle' | 'compressing' | 'uploading' | 'done' | 'error'

interface Props {
  label: string
  currentUrl: string | null
  storagePrefix: string
  recommendedSize?: string
  onUploadComplete: (url: string) => void
}

const MAX_FILE_SIZE_MB = 5

export default function BioImageUpload({
  label,
  currentUrl,
  storagePrefix,
  recommendedSize,
  onUploadComplete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset
    setError(null)
    setPhase('idle')

    // Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Fichier trop volumineux (max ${MAX_FILE_SIZE_MB} MB avant compression).`)
      setPhase('error')
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    try {
      // ── Étape 1 : Compression ──────────────────────────────────────────
      setPhase('compressing')
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })

      // ── Étape 2 : Upload Supabase Storage ─────────────────────────────
      setPhase('uploading')
      const fileName = `${storagePrefix}-${Date.now()}.webp`
      const supabase = createClient()

      const { error: uploadError } = await supabase.storage
        .from('bio')
        .upload(fileName, compressed, {
          cacheControl: '3600',
          upsert: false,
          contentType: compressed.type || 'image/webp',
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      // ── Étape 3 : URL publique ─────────────────────────────────────────
      const { data: urlData } = supabase.storage.from('bio').getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl

      // ── Étape 4 : Callback + mise à jour de l'aperçu ──────────────────
      setPreviewUrl(publicUrl)
      setPhase('done')
      onUploadComplete(publicUrl)

    } catch (err) {
      console.error('[BioImageUpload]:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Erreur inattendue lors de l\'upload.'
      )
      setPhase('error')
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const isProcessing = phase === 'compressing' || phase === 'uploading'

  return (
    <div className="space-y-3">
      {/* Label */}
      <p className="text-sm font-medium text-white/80">{label}</p>

      {/* Aperçu */}
      {previewUrl ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Aperçu"
            className="h-32 w-auto rounded object-cover"
          />
          {phase === 'done' && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow">
              <CheckCircle size={11} className="text-white" />
            </span>
          )}
        </div>
      ) : (
        <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-800/50">
          <ImageUp size={22} className="text-zinc-600" />
        </div>
      )}

      {/* Taille recommandée */}
      {recommendedSize && (
        <p className="text-xs text-zinc-500">Format recommandé : {recommendedSize}</p>
      )}

      {/* Bouton + statut */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ImageUp size={14} />
          )}
          {previewUrl ? 'Remplacer' : 'Choisir une image'}
        </button>

        {phase === 'compressing' && (
          <span className="text-xs text-zinc-400">Compression…</span>
        )}
        {phase === 'uploading' && (
          <span className="text-xs text-[#f5c518]">Envoi…</span>
        )}
        {phase === 'done' && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle size={12} />
            Image uploadée
          </span>
        )}
      </div>

      {/* Erreur */}
      {phase === 'error' && error && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
          <p className="flex-1 text-xs text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => { setPhase('idle'); setError(null) }}
            className="shrink-0 text-red-400 hover:text-red-200"
            aria-label="Fermer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/webp,image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
