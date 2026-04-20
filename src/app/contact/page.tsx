import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Ricoune pour vos fêtes votives, férias, soirées privées ou événements dans le Sud de la France. Réponse rapide garantie.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ricoune",
    description:
      "Contactez Ricoune pour vos événements dans le Sud de la France.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
