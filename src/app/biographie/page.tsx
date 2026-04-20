import type { Metadata } from "next";
import BiographiePageClient from "./BiographiePageClient";

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

export default function BiographiePage() {
  return <BiographiePageClient />;
}
