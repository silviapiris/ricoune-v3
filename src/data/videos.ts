export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  year?: number;
}

// Vidéo mise en avant (héro de la page Vidéos)
export const FEATURED_YOUTUBE_ID = "L_NfdWk1KdU";
export const FEATURED_TITLE = "RICOUNE — Le Vieux Chêne Des Cévennes";

// Clips officiels (source : ricoune.com)
export const clips: VideoItem[] = [
  {
    id: "1",
    title: "Je Passerai Demain",
    youtubeId: "pUYaxz_MSjM",
  },
  {
    id: "2",
    title: "La Goutte De Trop",
    youtubeId: "wsBOgchog5Y",
  },
  {
    id: "3",
    title: "Quand une femme s'en va",
    youtubeId: "6B0wjW1DdAI",
  },
  {
    id: "4",
    title: "La Crapola",
    youtubeId: "g_kT8OqT1fc",
  },
  {
    id: "5",
    title: "C'est l'été",
    youtubeId: "b-scwkE0qtQ",
  },
  {
    id: "6",
    title: "Le Tube",
    youtubeId: "zYl1kI748dY",
  },
  {
    id: "7",
    title: "Mon petit village",
    youtubeId: "9MmBcm-3RNk",
  },
];

// Extraits live / concerts
export const lives: VideoItem[] = [
  {
    id: "l1",
    title: "Ricoune en concert (Extrait)",
    youtubeId: "X-uCGJlec4Y",
  },
];
