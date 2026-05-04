import type { Metadata } from "next";
import BiographiePageClient from "./BiographiePageClient";
import { getBioContent, getBioTimeline } from "@/lib/bio";

export const metadata: Metadata = {
  title: "Biographie",
  description:
    "Découvrez le parcours de Ricoune, chanteur emblématique du Sud de la France. De ses débuts à aujourd'hui : plus de 50 concerts par an dans les fêtes votives et férias.",
  alternates: {
    canonical: "/biographie",
  },
  openGraph: {
    title: "Biographie | Ricoune",
    description:
      "Le parcours de Ricoune, chanteur emblématique du Sud de la France.",
    url: "/biographie",
    type: "website",
  },
};

export default async function BiographiePage() {
  const [bio, timeline] = await Promise.all([
    getBioContent(),
    getBioTimeline(),
  ]);

  return <BiographiePageClient bio={bio} timeline={timeline} />;
}
