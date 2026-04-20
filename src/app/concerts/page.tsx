import type { Metadata } from "next";
import ConcertsPageClient from "./ConcertsPageClient";

export const metadata: Metadata = {
  title: "Concerts & Dates",
  description:
    "Retrouvez toutes les dates de concerts de Ricoune : fêtes votives, férias, soirées privées. Plus de 50 dates par an dans le Sud de la France.",
  alternates: {
    canonical: "/concerts",
  },
  openGraph: {
    title: "Concerts & Dates | Ricoune",
    description:
      "Toutes les dates de concerts de Ricoune dans le Sud de la France.",
    url: "/concerts",
    type: "website",
  },
};

export default function ConcertsPage() {
  return <ConcertsPageClient />;
}
