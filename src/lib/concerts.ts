import type { Concert } from "@/data/concerts";
import { createClient } from "@/lib/supabase/server";

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

/**
 * Récupère les concerts publics (non annulés) depuis Supabase.
 * Filtre côté DB : cancelled=false + date >= hier (pour que isConcertVisible
 * puisse gérer la règle J+1 12h00).
 */
export async function getPublicConcerts(): Promise<Concert[]> {
  const supabase = await createClient();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const cutoff = yesterday.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("concerts")
    .select("*")
    .eq("cancelled", false)
    .gte("date", cutoff)
    .order("date", { ascending: true });

  if (error) {
    console.error("getPublicConcerts error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    date: row.date as string,
    city: row.city as string,
    department: (row.department ?? "") as string,
    postalCode: (row.postal_code ?? "") as string,
    venue: row.venue as string,
    mapsUrl: (row.maps_url ?? "") as string,
    time: row.time as string,
    type: row.type as "solo" | "groupe",
    allAges: (row.all_ages ?? true) as boolean,
    infos_speciales: row.infos_speciales ?? undefined,
    cancelled: false,
    cancellationNote: undefined,
  }));
}
