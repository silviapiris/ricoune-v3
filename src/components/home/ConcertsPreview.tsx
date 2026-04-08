"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { concerts } from "@/data/concerts";
import type { Concert } from "@/data/concerts";

function formatMonth(dateStr: string): string {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("fr-FR", { month: "short" })
    .toUpperCase()
    .replace(".", "");
}

function formatDay(dateStr: string): string {
  return new Date(dateStr).getDate().toString().padStart(2, "0");
}

function getUpcomingConcerts(count: number): Concert[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return concerts
    .filter((concert) => new Date(concert.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}

export default function ConcertsPreview(): React.ReactElement {
  const upcoming = getUpcomingConcerts(3);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-10">
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
            Prochains concerts
          </h2>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {upcoming.map((concert, index) => (
            <AnimatedSection key={concert.id} delay={index * 0.1}>
              <div className="rc-card flex items-center gap-4 p-5 md:gap-6 md:p-6">
                {/* Date */}
                <div className="shrink-0 text-center" style={{ minWidth: "60px" }}>
                  <span className="block text-3xl font-bold text-rc-yellow">
                    {formatDay(concert.date)}
                  </span>
                  <span className="text-sm font-semibold uppercase text-rc-yellow">
                    {formatMonth(concert.date)}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-white">{concert.city}</p>
                  <p className="text-sm text-white/70">{concert.venue}</p>
                </div>

                {/* Badge */}
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    concert.type === "solo"
                      ? "bg-rc-yellow/20 text-rc-yellow"
                      : "bg-rc-blue/20 text-rc-blue-mid"
                  }`}
                >
                  {concert.type === "solo" ? "En Solo" : "En Groupe"}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link href="/concerts" className="rc-btn">
            Voir toutes les dates
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
