import type { Metadata } from "next";
import ProfessionnelsPageClient from "./ProfessionnelsPageClient";

export const metadata: Metadata = {
  title: "Professionnels",
  description:
    "Faites appel à Ricoune pour vos événements professionnels : fêtes votives, férias, soirées privées, mariages. Découvrez nos formules et demandez un devis personnalisé.",
  alternates: {
    canonical: "/professionnels",
  },
  openGraph: {
    title: "Professionnels | Ricoune",
    description:
      "Faites appel à Ricoune pour vos événements professionnels. Formules, fiches techniques et demandes de devis.",
    url: "/professionnels",
    type: "website",
  },
};

export default function ProfessionnelsPage() {
  return <ProfessionnelsPageClient />;
}
