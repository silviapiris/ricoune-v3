import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ricoune",
  description: "Politique de confidentialité du site officiel Ricoune.",
};

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-bold text-rc-white">
        {title}
      </h2>
      <div className="text-rc-white/80 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PolitiqueConfidentialitePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold uppercase text-rc-white">
        Politique de confidentialité
      </h1>

      <LegalSection title="Collecte des données">
        <p>Les données sont collectées via les formulaires.</p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Nom, prénom, email, téléphone, message.</p>
      </LegalSection>

      <LegalSection title="Finalité">
        <p>Répondre aux demandes et établir un contact.</p>
      </LegalSection>

      <LegalSection title="Conservation">
        <p>Les données sont conservées le temps nécessaire.</p>
      </LegalSection>

      <LegalSection title="Destinataires">
        <p>Exclusivement Ricoune.</p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>Mesures de protection mises en place.</p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Accès, rectification, suppression :{" "}
          <a
            href="mailto:ricouneofficiel@gmail.com"
            className="text-rc-yellow underline transition-colors duration-200 hover:text-rc-yellow/80"
          >
            ricouneofficiel@gmail.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Utilisation à des fins de fonctionnement et statistiques.
        </p>
      </LegalSection>

      <LegalSection title="Gestion des cookies">
        <p className="mb-4">
          Ce site utilise des cookies pour améliorer l&apos;expérience
          utilisateur.
        </p>
        <p className="mb-2">Types de cookies :</p>
        <ul className="mb-4 list-disc pl-6">
          <li>techniques</li>
          <li>mesure d&apos;audience</li>
        </ul>
        <p className="mb-4">
          Vous pouvez accepter, refuser ou configurer vos choix via votre
          navigateur.
        </p>
        <p>
          Aucune donnée n&apos;est vendue ou utilisée à des fins publicitaires.
        </p>
      </LegalSection>
    </div>
  );
}
