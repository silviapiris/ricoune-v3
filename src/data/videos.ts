export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  year?: number;
}

export const FEATURED_YOUTUBE_ID = "dQw4w9WgXcQ";

export const clips: VideoItem[] = [
  {
    id: "1",
    title: "Dans un verre a ballon",
    youtubeId: "dQw4w9WgXcQ",
    year: 2001,
  },
  { id: "2", title: "Le Kukela", youtubeId: "dQw4w9WgXcQ", year: 2015 },
  {
    id: "3",
    title: "Y faut etre gentil",
    youtubeId: "dQw4w9WgXcQ",
    year: 2016,
  },
  {
    id: "4",
    title: "Quand un faineant se rebelle",
    youtubeId: "dQw4w9WgXcQ",
    year: 2021,
  },
];

export const lives: VideoItem[] = [
  {
    id: "l1",
    title: "Live Feria de Beziers 2025",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "l2",
    title: "Live Fete de Montpellier 2024",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "l3",
    title: "Live Festival du Sud 2023",
    youtubeId: "dQw4w9WgXcQ",
  },
];
