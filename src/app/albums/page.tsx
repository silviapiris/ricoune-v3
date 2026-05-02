import type { Metadata } from "next";
import { getAlbums } from "@/lib/albums-server";
import AlbumsPageClient from "./AlbumsPageClient";

export const metadata: Metadata = {
  title: "Albums & Discographie",
  description:
    "Explorez la discographie complète de Ricoune. Écoutez ses albums sur Spotify, Apple Music, Deezer et YouTube Music.",
  alternates: {
    canonical: "/albums",
  },
  openGraph: {
    title: "Albums & Discographie | Ricoune",
    description:
      "La discographie complète de Ricoune, disponible sur toutes les plateformes de streaming.",
    url: "/albums",
    type: "website",
  },
};

export default async function AlbumsPage() {
  const albums = await getAlbums();
  return <AlbumsPageClient albums={albums} />;
}
