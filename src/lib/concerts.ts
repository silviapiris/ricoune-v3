import type { Concert } from "@/data/concerts";

/**
 * Un concert est visible publiquement jusqu'au lendemain 12:00 après
 * son heure de début (ex: concert 23h le 24/04 → masqué le 25/04 à 12:00).
 */
export function isConcertVisible(concert: Concert): boolean {
  const [y, mo, d] = concert.date.split("-").map(Number);
  const [h, m] = concert.time.split(":").map(Number);
  const concertStart = new Date(y, mo - 1, d, h, m, 0);
  const threshold = new Date(concertStart);
  threshold.setDate(threshold.getDate() + 1);
  threshold.setHours(12, 0, 0, 0);
  return new Date() < threshold;
}
