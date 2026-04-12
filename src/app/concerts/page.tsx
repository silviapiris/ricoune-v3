"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { concerts } from "@/data/concerts";
import ConcertCard from "@/components/concerts/ConcertCard";

type Filter = "tous" | "solo" | "groupe";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "solo", label: "En solo" },
  { key: "groupe", label: "En groupe" },
];

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

export default function ConcertsPage(): React.ReactElement {
  const [filter, setFilter] = useState<Filter>("tous");
  const [showPast, setShowPast] = useState(false);

  const { upcoming, past } = useMemo(() => {
    const filtered =
      filter === "tous"
        ? concerts
        : concerts.filter((c) => c.type === filter);

    const sorted = [...filtered].sort((a, b) => {
      const aTs = new Date(`${a.date}T${a.time}:00`).getTime();
      const bTs = new Date(`${b.date}T${b.time}:00`).getTime();
      return aTs - bTs;
    });

    return {
      upcoming: sorted.filter((c) => !isPast(c.date)),
      past: sorted.filter((c) => isPast(c.date)),
    };
  }, [filter]);

  return (
    <section className="pt-20 pb-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* 1. Titre */}
        <AnimatedSection className="mb-10 text-center">
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-white md:text-5xl">
            Concerts & Dates
          </h1>
        </AnimatedSection>

        {/* 2. Filtres */}
        <AnimatedSection className="mb-10 flex flex-wrap justify-center gap-3 gap-y-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={filter === f.key ? "rc-btn" : "rc-btn-outline"}
            >
              {f.label}
            </button>
          ))}
        </AnimatedSection>

        {/* 3. Liste concerts a venir */}
        {upcoming.length === 0 ? (
          <AnimatedSection>
            <div className="rc-card px-6 py-12 text-center">
              <p className="text-white/70">
                Aucun concert programmé pour le moment
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="flex flex-col gap-4">
            {upcoming.map((concert, index) => (
              <AnimatedSection key={concert.id} delay={index * 0.05}>
                <ConcertCard concert={concert} />
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* 4. Concerts passés (collapsable) */}
        {past.length > 0 && (
          <div className="mt-12">
            <button
              onClick={() => setShowPast((prev) => !prev)}
              className="rc-btn-outline mx-auto mb-6 flex items-center gap-2"
            >
              <span>Concerts passés ({past.length})</span>
              <svg
                className={`h-4 w-4 transition-transform ${showPast ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showPast && (
              <div className="flex flex-col gap-4 opacity-60">
                {past.map((concert, index) => (
                  <AnimatedSection key={concert.id} delay={index * 0.05}>
                    <ConcertCard concert={concert} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. CTA */}
        <AnimatedSection className="mt-16">
          <div className="rc-card px-6 py-12 text-center md:px-12 md:py-16">
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              Vous souhaitez privatiser Ricoune ?
            </p>
            <Link href="/professionnels/demande-de-devis" className="rc-btn">
              Demander un devis
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
