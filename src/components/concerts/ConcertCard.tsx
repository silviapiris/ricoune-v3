import type { Concert } from "@/data/concerts";

const MONTHS_FR = [
  "Jan",
  "Fev",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Aout",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface FormattedDate {
  day: number;
  month: string;
  year: number;
}

function formatDate(dateStr: string): FormattedDate {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.getDate(),
    month: MONTHS_FR[d.getMonth()],
    year: d.getFullYear(),
  };
}

interface ConcertCardProps {
  concert: Concert;
}

export default function ConcertCard({
  concert,
}: ConcertCardProps): React.ReactElement {
  const date = formatDate(concert.date);
  const isSolo = concert.type === "solo";

  return (
    <div className="rc-card p-5 md:p-6">
      {/* Desktop : horizontal | Mobile : 2 rows */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Row 1 mobile / Left block desktop : date + badge */}
        <div className="flex items-center justify-between sm:contents">
          {/* Date */}
          <div className="shrink-0 text-center" style={{ minWidth: "60px" }}>
            <span className="block text-3xl font-bold text-rc-yellow">
              {date.day}
            </span>
            <span className="block text-sm font-semibold uppercase text-rc-yellow">
              {date.month}
            </span>
            <span className="block text-xs text-white/60">{date.year}</span>
          </div>

          {/* Badge type (visible mobile only on first row) */}
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:hidden ${
              isSolo
                ? "bg-rc-yellow/20 text-rc-yellow"
                : "bg-rc-blue-mid/20 text-rc-blue-mid"
            }`}
          >
            {isSolo ? "En Solo" : "En Groupe"}
          </span>
        </div>

        {/* Row 2 mobile / Center block desktop : city + venue */}
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-white">{concert.city}</p>
          <p className="text-sm text-white/70">{concert.venue}</p>
        </div>

        {/* Right block desktop : time + badge */}
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <span className="text-sm text-white">{concert.time}</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isSolo
                ? "bg-rc-yellow/20 text-rc-yellow"
                : "bg-rc-blue-mid/20 text-rc-blue-mid"
            }`}
          >
            {isSolo ? "En Solo" : "En Groupe"}
          </span>
        </div>

        {/* Time visible on mobile only (below city) */}
        <span className="text-sm text-white sm:hidden">{concert.time}</span>
      </div>
    </div>
  );
}
