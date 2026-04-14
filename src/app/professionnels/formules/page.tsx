import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

interface FormulaItem {
  text: string;
  link?: { href: string; label: string };
}

const formules: {
  name: string;
  items: FormulaItem[];
}[] = [
  {
    name: "Formule complète",
    items: [
      { text: "Concert 1h30" },
      { text: "7 musiciens sur scène" },
      {
        text: "Fiche technique",
        link: {
          href: "/documents/fiche-technique-groupe.pdf",
          label: "Fiche technique",
        },
      },
      { text: "Adaptation selon vos événements" },
    ],
  },
  {
    name: "Apéro concert / Show case",
    items: [
      { text: "Idéal pour cocktail et show case" },
      { text: "Sono fournie sauf départements hors Occitanie" },
      {
        text: "Fiche technique",
        link: {
          href: "/documents/fiche-technique-solo.pdf",
          label: "Fiche technique",
        },
      },
      { text: "Adaptation selon vos événements" },
    ],
  },
];

export default function FormulesPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* Background image + overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hero/home-concert-scene.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre */}
        <h1 className="text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-5xl">
          Nos Formules
        </h1>

        {/* Cartes */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {formules.map((formule) => (
            <div key={formule.name} className="rc-card flex flex-col p-8">
              {/* Titre formule */}
              <h2 className="mb-3 text-2xl font-bold font-[family-name:var(--font-oswald)] text-white">
                {formule.name}
              </h2>

              {/* Badge */}
              <span className="rc-section-label mb-6">Sur devis</span>

              {/* Liste */}
              <ul className="mb-8 flex-1 space-y-3">
                {formule.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-rc-yellow"
                    />
                    <span className="text-sm text-white/80">
                      {item.link ? (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rc-yellow underline"
                        >
                          {item.link.label}
                        </a>
                      ) : (
                        item.text
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/professionnels/demande-de-devis" className="rc-btn">
                Demander un devis
              </Link>
            </div>
          ))}
        </div>

        {/* CTA global */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-white/80">
            Un événement sur mesure ? Contactez-nous pour un devis personnalisé.
          </p>
          <Link href="/professionnels/demande-de-devis" className="rc-btn">
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
