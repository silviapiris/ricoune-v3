import type { Metadata } from "next";
import DevisPageClient from "./DevisPageClient";

export const metadata: Metadata = {
  title: "Demande de devis",
  description:
    "Obtenez un devis personnalisé pour votre événement avec Ricoune : fêtes votives, férias, mariages, soirées privées. Réponse rapide garantie.",
  alternates: {
    canonical: "/professionnels/demande-de-devis",
  },
  openGraph: {
    title: "Demande de devis | Ricoune",
    description:
      "Devis personnalisé pour votre événement avec Ricoune.",
    url: "/professionnels/demande-de-devis",
    type: "website",
  },
};

export default function DevisPage() {
  return <DevisPageClient />;
}
