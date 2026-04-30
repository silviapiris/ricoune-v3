'use client'

import { useRef, useState, useCallback, useTransition } from 'react'
import { Upload, CheckCircle, AlertCircle, Loader2, XCircle } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { uploadPhotos, type UploadResult } from './actions'

type FileStatus = {
  file: File
  phase: 'compressing' | 'uploading' | 'done' | 'error'
  error?: string
}

export default function PhotosUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([])
  const [isPending, startTransition] = useTransition()

  const updateStatus = useCallback(
    (filename: string, update: Partial<Omit<FileStatus, 'file'>>) => {
      setFileStatuses((prev) =>
        prev.map((s) => (s.file.name === filename ? { ...s, ...update } : s)),
      )
    },
    [],
  )

  const processFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((f) => f.type.startsWith('image/'))
      if (imageFiles.length === 0) return

      const statuses: FileStatus[] = imageFiles.map((file) => ({
        file,
        phase: 'compressing',
      }))
      setFileStatuses(statuses)

      const compressed: File[] = []

      for (const file of imageFiles) {
        try {
          const result = await imageCompression(file, {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          })
          compressed.push(new File([result], file.name, { type: result.type }))
          updateStatus(file.name, { phase: 'uploading' })
        } catch {
          updateStatus(file.name, { phase: 'error', error: 'Compression échouée' })
        }
      }

      const successfullyCompressed = compressed.filter((f) => {
        const status = statuses.find((s) => s.file.name === f.name)
        return status?.phase !== 'error'
      })

      if (successfullyCompressed.length === 0) return

      const formData = new FormData()
      for (const f of successfullyCompressed) {
        formData.append('photos', f)
      }

      startTransition(async () => {
        let results: UploadResult[] = []
        try {
          results = await uploadPhotos(formData)
        } catch {
          for (const f of successfullyCompressed) {
            updateStatus(f.name, { phase: 'error', error: 'Erreur réseau' })
          }
          return
        }

        for (const result of results) {
          if (result.ok) {
            updateStatus(result.filename, { phase: 'done' })
          } else {
            updateStatus(result.filename, {
              phase: 'error',
              error: result.error ?? 'Erreur inconnue',
            })
          }
        }
      })
    },
    [updateStatus],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      processFiles(files)
    },
    [processFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setIsDragging(false), [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? [])
      processFiles(files)
      if (inputRef.current) inputRef.current.value = ''
    },
    [processFiles],
  )

  const isProcessing =
    fileStatuses.some((s) => s.phase === 'compressing' || s.phase === 'uploading') ||
    isPending

  return (
    <div className="mb-8">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className={[
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-colors',
          isDragging
            ? 'border-[#f5c518] bg-[#f5c518]/5'
            : 'border-zinc-700 hover:border-zinc-500',
          isProcessing ? 'cursor-not-allowed opacity-60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Upload size={28} className="text-zinc-500" />
        <p className="text-sm text-zinc-400">
          Glisse des photos ici ou{' '}
          <span className="text-[#f5c518] underline underline-offset-2">
            clique pour choisir
          </span>
        </p>
        <p className="text-xs text-zinc-600">JPG, PNG, WebP — compressées automatiquement</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      {fileStatuses.length > 0 && (
        <ul className="mt-4 space-y-2">
          {fileStatuses.map((s) => (
            <li
              key={s.file.name}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm"
            >
              {s.phase === 'compressing' && (
                <Loader2 size={16} className="animate-spin text-zinc-400" />
              )}
              {s.phase === 'uploading' && (
                <Loader2 size={16} className="animate-spin text-[#f5c518]" />
              )}
              {s.phase === 'done' && (
                <CheckCircle size={16} className="text-emerald-400" />
              )}
              {s.phase === 'error' && (
                <XCircle size={16} className="text-red-400" />
              )}

              <span className="flex-1 truncate text-zinc-300">{s.file.name}</span>

              {s.phase === 'compressing' && (
                <span className="text-xs text-zinc-500">Compression…</span>
              )}
              {s.phase === 'uploading' && (
                <span className="text-xs text-[#f5c518]">Envoi…</span>
              )}
              {s.phase === 'done' && (
                <span className="text-xs text-emerald-400">Ajoutée</span>
              )}
              {s.phase === 'error' && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle size={12} />
                  {s.error}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
