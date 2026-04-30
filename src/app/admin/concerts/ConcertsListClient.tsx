'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import type { Concert } from './actions'
import ConcertsTable from './ConcertsTable'
import PastConcertsSection from './PastConcertsSection'

type Props = {
  upcoming: Concert[]
  past: Concert[]
}

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export default function ConcertsListClient({ upcoming, past }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUpcoming = useMemo(() => {
    if (!searchTerm) return upcoming
    const term = normalize(searchTerm)
    return upcoming.filter((c) =>
      [c.city, c.venue, c.department, c.postal_code, c.infos_speciales].some(
        (field) => field && normalize(field).includes(term)
      )
    )
  }, [upcoming, searchTerm])

  const filteredPast = useMemo(() => {
    if (!searchTerm) return past
    const term = normalize(searchTerm)
    return past.filter((c) =>
      [c.city, c.venue, c.department, c.postal_code, c.infos_speciales].some(
        (field) => field && normalize(field).includes(term)
      )
    )
  }, [past, searchTerm])

  return (
    <>
      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par ville, lieu, département..."
          className="w-full rounded border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-10 text-zinc-100 placeholder:text-zinc-500 focus:border-[#f5c518] focus:outline-none"
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

      <div className="space-y-12">
        {/* Concerts à venir */}
        <section>
          <h2
            className="mb-4 text-xl font-semibold text-zinc-100"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Concerts à venir{' '}
            <span className="text-base font-normal text-zinc-500">
              {searchTerm
                ? `(${filteredUpcoming.length} / ${upcoming.length})`
                : `(${upcoming.length})`}
            </span>
          </h2>
          {filteredUpcoming.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
              {searchTerm
                ? 'Aucun concert à venir ne correspond à votre recherche.'
                : 'Aucun concert prévu pour le moment.'}
            </div>
          ) : (
            <ConcertsTable concerts={filteredUpcoming} variant="upcoming" />
          )}
        </section>

        {/* Concerts passés */}
        <PastConcertsSection count={filteredPast.length}>
          <ConcertsTable concerts={filteredPast} variant="past" />
        </PastConcertsSection>
      </div>
    </>
  )
}
