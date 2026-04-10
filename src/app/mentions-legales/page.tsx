import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Ricoune",
  description: "Mentions légales du site officiel Ricoune.",
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

export default function MentionsLegalesPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold uppercase text-rc-white">
        Mentions légales
      </h1>

      <LegalSection title="Éditeur du site">
        <p>Ricoune</p>
        <p>
          Email :{" "}
          <a
            href="mailto:contact@ricoune.fr"
            className="text-rc-yellow underline transition-colors duration-200 hover:text-rc-yellow/80"
          >
            contact@ricoune.fr
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Responsable de la publication">
        <p>Ricoune</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          O2Switch — 222 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand,
          France
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur ce site est protégé par le
          droit de la propriété intellectuelle.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          L&apos;éditeur du site ne saurait être tenu responsable des erreurs ou
          omissions.
        </p>
      </LegalSection>

      <LegalSection title="Liens externes">
        <p>
          L&apos;éditeur ne peut être tenu responsable du contenu des sites
          externes.
        </p>
      </LegalSection>
    </div>
  );
}
