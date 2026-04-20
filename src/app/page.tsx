import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  // title: garde le default du layout ("Ricoune — Site Officiel")
  description:
    "Ricoune, l'artiste incontournable des fêtes du Sud de la France. Concerts, albums, vidéos et demandes de devis pour vos fêtes votives, férias et événements.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ricoune — Site Officiel",
    description:
      "L'artiste incontournable des fêtes du Sud de la France. Concerts, albums, vidéos et demandes de devis.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
