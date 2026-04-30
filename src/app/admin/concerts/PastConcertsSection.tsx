'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  count: number
  children: ReactNode
}

export default function PastConcertsSection({ count, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <section className="mt-8 border-t border-zinc-800 pt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-3 text-left"
      >
        <ChevronDown
          size={20}
          className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
        <h2
          className="text-xl font-semibold text-zinc-300 transition-colors group-hover:text-zinc-100"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Concerts passés
        </h2>
        <span className="text-base font-normal text-zinc-500">
          ({count})
        </span>
      </button>
      <p className="ml-8 mt-1 text-xs text-zinc-600">
        Mémos pour faciliter la reprogrammation. Non visibles sur le site public.
      </p>
      {open && (
        <div className="mt-6">
          {count === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
              Aucun concert passé enregistré.
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </section>
  )
}
