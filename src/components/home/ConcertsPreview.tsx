"use client";

import Link from "next/link";
import { MapPin, CalendarPlus } from "lucide-react";
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

function buildGoogleCalendarUrl(concert: Concert): string {
  const [y, mo, day] = concert.date.split("-").map(Number);
  const [h, m] = concert.time.split(":").map(Number);
  const hh = h.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");
  const endTotalH = h + 2;
  const endHH = (endTotalH % 24).toString().padStart(2, "0");

  const startD = concert.date.replace(/-/g, "");
  let endD = startD;
  if (endTotalH >= 24) {
    const next = new Date(y, mo - 1, day + 1);
    endD = [
      next.getFullYear(),
      (next.getMonth() + 1).toString().padStart(2, "0"),
      next.getDate().toString().padStart(2, "0"),
    ].join("");
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Concert Ricoune \u2014 ${concert.city}`,
    dates: `${startD}T${hh}${mm}00/${endD}T${endHH}${mm}00`,
    location: `${concert.venue}, ${concert.city} ${concert.postalCode}`,
    details: "Concert de Ricoune",
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
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
                  <p className="text-lg font-bold text-white">
                    {concert.city} ({concert.postalCode})
                  </p>
                  {/* Lieu — lien direct Google Maps */}
                  <a
                    href={concert.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-rc-yellow"
                    aria-label={`Voir sur Google Maps : ${concert.venue}, ${concert.city}`}
                  >
                    <MapPin
                      size={13}
                      className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="underline-offset-2 group-hover:underline">
                      {concert.venue}
                    </span>
                  </a>
                  {/* Lien agenda Google Calendar */}
                  <a
                    href={buildGoogleCalendarUrl(concert)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/60"
                  >
                    <CalendarPlus
                      size={11}
                      className="shrink-0 opacity-50 transition-opacity group-hover:opacity-80"
                      aria-hidden="true"
                    />
                    <span className="underline-offset-2 group-hover:underline">
                      Ajouter à Google Calendar
                    </span>
                  </a>
                </div>

                {/* Heure + Badge */}
                <div className="shrink-0 flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-sm text-white">{concert.time}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      concert.type === "solo"
                        ? "bg-rc-yellow/20 text-rc-yellow"
                        : "bg-rc-blue/20 text-rc-blue-mid"
                    }`}
                  >
                    {concert.type === "solo" ? "En Solo" : "En Groupe"}
                  </span>
                </div>
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
