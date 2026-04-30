import Link from 'next/link'
import { ArrowLeft, LogOut } from 'lucide-react'
import { getMessages } from './actions'
import { signOut } from '../actions'
import MessagesListClient from './MessagesListClient'

export default async function AdminMessagesPage() {
  const { messages, unreadCount } = await getMessages()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-8">

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
              MESSAGES
            </h1>
            <p
              className="mt-1 text-sm text-zinc-400"
              style={{ fontFamily: 'var(--font-raleway)' }}
            >
              {messages.length} message{messages.length > 1 ? 's' : ''} —{' '}
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </p>
          </div>
        </header>

        {messages.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center text-zinc-500">
            Aucun message reçu pour l&apos;instant.
          </div>
        ) : (
          <MessagesListClient messages={messages} />
        )}

      </div>
    </div>
  )
}
