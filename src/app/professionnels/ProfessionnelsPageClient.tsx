"use client";

import Link from "next/link";
import { Music2, FileText, Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfessionnelsPageClient(): React.JSX.Element {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.professionals.offers,
      description: t.professionals.offersDesc,
      href: "/professionnels/formules",
      icon: Music2,
      cta: t.professionals.offersCta,
    },
    {
      title: t.professionals.quote,
      description: t.professionals.quoteDesc,
      href: "/professionnels/demande-de-devis",
      icon: FileText,
      cta: t.professionals.quoteCta,
    },
    {
      title: t.professionals.media,
      description: t.professionals.mediaDesc,
      href: "/professionnels/photos-hd",
      icon: Image,
      cta: t.professionals.mediaCta,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Titre */}
      <h1 className="text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-5xl">
        {t.professionals.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white/70">
        {t.professionals.subtitle}
      </p>

      {/* Cartes */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.href}
              className="rc-card flex flex-col items-center p-8 text-center border border-white/10 shadow-md shadow-black/20 transition-all duration-[400ms] hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-lg hover:shadow-black/25"
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
