export interface Concert {
  id: string;
  date: string;
  city: string;
  department: string;
  postalCode: string;
  venue: string;
  mapsUrl: string;
  time: string;
  type: "solo" | "groupe";
  allAges: boolean;
  infos_speciales?: string;
  cancelled?: boolean;
  cancellationNote?: string;
}

// Données chargées dynamiquement depuis Supabase via getPublicConcerts().
export const concerts: Concert[] = [];
