"use client";

import { MapPin, Calendar, Info } from "lucide-react";
import type { Concert } from "@/data/concerts";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface FormattedDate {
  day: number;
  month: string;
  year: number;
}

function formatDate(dateStr: string, lang: string): FormattedDate {
  const d = new Date(dateStr + "T00:00:00");
  const locale = lang === "en" ? "en-US" : "fr-FR";
  return {
    day: d.getDate(),
    month: d.toLocaleDateString(locale, { month: "short" }).replace(".", "").toUpperCase(),
    year: d.getFullYear(),
  };
}

interface ConcertCardProps {
  concert: Concert;
}

export default function ConcertCard({
  concert,
}: ConcertCardProps): React.ReactElement {
  const { t, lang } = useLanguage();
  const date = formatDate(concert.date, lang);
  const isSolo = concert.type === "solo";

  return (
    <div className="overflow-hidden rounded-2xl">
      {concert.cancelled && (
        <div className="bg-red-600 py-2 text-center text-sm font-bold uppercase tracking-widest text-white">
          {t.concerts.cancelled}
        </div>
      )}
      <div className="rc-card p-5 md:p-6 border border-white/10 shadow-sm shadow-black/15 transition-all duration-300 hover:border-white/20 hover:shadow-md hover:shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">

        {/* Date block — always left on desktop, first on mobile */}
        <div className="shrink-0 text-center" style={{ minWidth: "60px" }}>
          <span className="block text-3xl font-bold text-rc-yellow">
            {date.day}
          </span>
          <span className="block text-sm font-semibold uppercase text-rc-yellow">
            {date.month}
          </span>
          <span className="block text-xs text-white/60">{date.year}</span>
        </div>

        {/* Center block — city, venue, infos spéciales, calendar */}
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-white">
            {concert.city} ({concert.postalCode})
          </p>

          {/* Lieu — lien Google Maps */}
          <a
            href={concert.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-rc-yellow"
            aria-label={`Voir sur Google Maps : ${concert.venue}, ${concert.city}`}
          >
            <MapPin
              size={16}
              className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="underline-offset-2 group-hover:underline">
              {concert.venue}
            </span>
          </a>

          {/* Note d'annulation — conditionnel */}
          {concert.cancellationNote && (
            <p className="mt-1 text-sm italic text-red-400">{concert.cancellationNote}</p>
          )}

          {/* Encadré infos spéciales — conditionnel */}
          {concert.infos_speciales && (
            <div className="border-l-4 border-rc-yellow bg-rc-yellow/5 p-3 rounded-r-md mt-3">
              <div className="flex items-center gap-2 mb-1">
                <Info size={16} className="text-rc-yellow" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider text-rc-yellow">
                  {t.concerts.specialInfo}
                </span>
              </div>
              <p className="text-sm text-white/80">{concert.infos_speciales}</p>
            </div>
          )}

          {/* Lien Google Calendar */}
          <a
            href={buildGoogleCalendarUrl(concert)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/60"
          >
            <Calendar
              size={16}
              className="shrink-0 opacity-50 transition-opacity group-hover:opacity-80"
              aria-hidden="true"
            />
            <span className="underline-offset-2 group-hover:underline">
              {t.concerts.addCalendar}
            </span>
          </a>
        </div>

        {/* Right block — heure + badge (row on mobile, column on desktop) */}
        <div className="shrink-0 flex items-center gap-3 sm:flex-col sm:items-end">
          <span className="text-sm text-white">{concert.time}</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isSolo
                ? "bg-rc-yellow/20 text-rc-yellow"
                : "bg-rc-blue-mid/20 text-rc-blue-mid"
            }`}
          >
            {isSolo ? t.concerts.solo : t.concerts.group}
          </span>
        </div>

      </div>
      </div>
    </div>
  );
}
