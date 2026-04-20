import type { Metadata } from "next";
import FormulesPageClient from "./FormulesPageClient";

export const metadata: Metadata = {
  title: "Formules & Prestations",
  description:
    "Découvrez les formules spectacle de Ricoune : solo, duo, groupe complet. Fiches techniques téléchargeables pour professionnels et organisateurs d'événements.",
  alternates: {
    canonical: "/professionnels/formules",
  },
  openGraph: {
    title: "Formules & Prestations | Ricoune",
    description:
      "Les formules spectacle de Ricoune : solo, duo, groupe. Fiches techniques disponibles.",
    url: "/professionnels/formules",
    type: "website",
  },
};

export default function FormulesPage() {
  return <FormulesPageClient />;
}
