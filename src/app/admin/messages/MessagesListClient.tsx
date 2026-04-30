'use client'

import { useState, useMemo, useEffect, useTransition } from 'react'
import { Search, X, Mail, Trash2, CheckCircle, Circle } from 'lucide-react'
import type { ContactMessage } from './actions'
import { toggleReadStatus, deleteMessage } from './actions'
import MessageRow from './MessageRow'

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

type Props = {
  messages: ContactMessage[]
}

export default function MessagesListClient({ messages }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [togglePending, startToggle] = useTransition()
  const [deletePending, startDelete] = useTransition()

  const filteredMessages = useMemo(() => {
    if (!searchTerm) return messages
    const term = normalize(searchTerm)
    return messages.filter((m) =>
      [m.nom, m.prenom, m.email, m.ville, m.message, m.type_evenement].some(
        (f) => f && normalize(f).includes(term)
      )
    )
  }, [messages, searchTerm])

  const selectedMessage = useMemo(
    () => messages.find((m) => m.id === selectedId) ?? null,
    [messages, selectedId]
  )

  // Si le message sélectionné a été supprimé, vider la sélection
  useEffect(() => {
    if (selectedId && !messages.find((m) => m.id === selectedId)) {
      setSelectedId(null)
    }
  }, [messages, selectedId])

  // Réinitialiser la protection suppression à chaque changement de sélection
  useEffect(() => {
    setConfirmingDelete(false)
  }, [selectedId])

  // Timeout 5s : annuler la confirmation de suppression
  useEffect(() => {
    if (!confirmingDelete) return
    const t = setTimeout(() => setConfirmingDelete(false), 5000)
    return () => clearTimeout(t)
  }, [confirmingDelete])

  function handleSelect(msg: ContactMessage) {
    setSelectedId(msg.id)
    if (!msg.read) {
      startToggle(async () => {
        await toggleReadStatus(msg.id, false)
      })
    }
  }

  function handleToggleRead() {
    if (!selectedMessage) return
    startToggle(async () => {
      await toggleReadStatus(selectedMessage.id, selectedMessage.read)
    })
  }

  function handleDelete() {
    if (!selectedMessage) return
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }
    startDelete(async () => {
      await deleteMessage(selectedMessage.id)
    })
  }

  const sidebarList = (
    <div className="flex flex-col gap-3">
      {/* Barre de recherche */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nom, email, ville..."
          className="w-full rounded border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#f5c518] focus:outline-none"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-100"
            aria-label="Effacer la recherche"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-xs text-zinc-500">
          {filteredMessages.length} / {messages.length} messages
        </p>
      )}
      {/* Liste */}
      <div className="space-y-2">
        {filteredMessages.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-500">Aucun résultat.</p>
        ) : (
          filteredMessages.map((msg) => (
            <MessageRow
              key={msg.id}
              message={msg}
              isSelected={msg.id === selectedId}
              onClick={() => handleSelect(msg)}
            />
          ))
        )}
      </div>
    </div>
  )

  const detailPanel = selectedMessage ? (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      {/* En-tête */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            {selectedMessage.prenom} {selectedMessage.nom}
          </h2>
          <a
            href={`mailto:${selectedMessage.email}`}
            className="text-sm text-zinc-400 transition-colors hover:text-[#f5c518]"
          >
            {selectedMessage.email}
          </a>
        </div>
        <span
          className="shrink-0 rounded px-2 py-0.5 text-xs font-medium"
          style={
            !selectedMessage.read
              ? { background: 'rgba(245,197,24,0.12)', color: '#f5c518' }
              : { background: 'rgba(113,113,122,0.2)', color: '#71717a' }
          }
        >
          {selectedMessage.read ? 'Lu' : 'Non lu'}
        </span>
      </div>

      {/* Champs optionnels */}
      {(selectedMessage.telephone ||
        selectedMessage.type_evenement ||
        selectedMessage.date_souhaitee ||
        selectedMessage.ville) && (
        <dl className="mb-5 space-y-1.5 rounded-lg border border-zinc-800 bg-zinc-800/40 px-4 py-3 text-sm">
          {selectedMessage.telephone && (
            <div className="flex gap-3">
              <dt className="w-32 shrink-0 text-zinc-500">Téléphone</dt>
              <dd className="text-zinc-300">{selectedMessage.telephone}</dd>
            </div>
          )}
          {selectedMessage.type_evenement && (
            <div className="flex gap-3">
              <dt className="w-32 shrink-0 text-zinc-500">Événement</dt>
              <dd className="text-zinc-300">{selectedMessage.type_evenement}</dd>
            </div>
          )}
          {selectedMessage.date_souhaitee && (
            <div className="flex gap-3">
              <dt className="w-32 shrink-0 text-zinc-500">Date souhaitée</dt>
              <dd className="text-zinc-300">{selectedMessage.date_souhaitee}</dd>
            </div>
          )}
          {selectedMessage.ville && (
            <div className="flex gap-3">
              <dt className="w-32 shrink-0 text-zinc-500">Ville</dt>
              <dd className="text-zinc-300">{selectedMessage.ville}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Corps du message */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
          {selectedMessage.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${selectedMessage.email}?subject=Re: votre message`}
          className="inline-flex items-center gap-2 rounded bg-[#f5c518] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <Mail size={14} />
          Répondre par email
        </a>
        <button
          type="button"
          onClick={handleToggleRead}
          disabled={togglePending}
          className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          {selectedMessage.read ? <Circle size={14} /> : <CheckCircle size={14} />}
          {selectedMessage.read ? 'Marquer non lu' : 'Marquer lu'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deletePending}
          className={`inline-flex items-center gap-2 rounded border px-4 py-2 text-sm transition-colors disabled:opacity-50 ${
            confirmingDelete
              ? 'border-red-700 bg-red-950/50 text-red-400 hover:bg-red-900/50'
              : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-red-700/60 hover:text-red-400'
          }`}
        >
          <Trash2 size={14} />
          {confirmingDelete ? 'Confirmer la suppression' : 'Supprimer'}
        </button>
      </div>
    </div>
  ) : (
    <div className="hidden md:flex h-48 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-500">
      Sélectionne un message pour le lire.
    </div>
  )

  return (
    <>
      {/* Mobile : liste puis panneau détail en dessous */}
      <div className="flex flex-col gap-6 md:hidden">
        {sidebarList}
        {selectedMessage && detailPanel}
      </div>

      {/* Desktop : split 40 / 60 */}
      <div className="hidden md:flex gap-6">
        <div className="w-[40%] shrink-0">{sidebarList}</div>
        <div className="flex-1">{detailPanel}</div>
      </div>
    </>
  )
}
