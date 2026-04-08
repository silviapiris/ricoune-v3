import Link from "next/link";
import { Music2, FileText, Image } from "lucide-react";

const cards = [
  {
    title: "Nos formules",
    description: "Découvrez nos formules spectacle",
    href: "/professionnels/formules",
    icon: Music2,
    cta: "Voir les formules",
  },
  {
    title: "Demander un devis",
    description: "Obtenez un devis personnalisé",
    href: "/professionnels/demande-de-devis",
    icon: FileText,
    cta: "Demander un devis",
  },
  {
    title: "Photos HD",
    description: "Téléchargez des visuels professionnels",
    href: "/professionnels/photos-hd",
    icon: Image,
    cta: "Télécharger les visuels",
  },
];

export default function ProfessionnelsPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Titre */}
      <h1 className="text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-5xl">
        Espace Professionnels
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white/70">
        Tout pour organiser votre événement avec Ricoune
      </p>

      {/* Cartes */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.href}
              className="rc-card flex flex-col items-center p-8 text-center transition-transform duration-200 hover:scale-[1.02]"
            >
              <Icon size={48} className="mb-4 text-rc-yellow" />
              <h2 className="mb-2 text-xl font-bold font-[family-name:var(--font-oswald)] text-white">
                {card.title}
              </h2>
              <p className="mb-6 flex-1 text-sm text-white/70">
                {card.description}
              </p>
              <Link href={card.href} className="rc-btn-outline">
                {card.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
