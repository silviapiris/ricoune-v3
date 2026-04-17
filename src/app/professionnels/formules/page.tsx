"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ContentItem } from "@/locales/fr";

function renderFeature(feature: ContentItem): React.ReactNode {
  if (typeof feature === "string") {
    return feature;
  }
  if ("link" in feature) {
    return (
      <a
        href={feature.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rc-yellow underline"
      >
        {feature.link.label}
      </a>
    );
  }
  return null;
}

export default function FormulesPage(): React.JSX.Element {
  const { t } = useLanguage();

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
          {t.formules.title}
        </h1>

        {/* Cartes */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {t.formules.offers.map((offer) => (
            <div key={offer.title} className="rc-card flex flex-col p-8">
              {/* Titre formule */}
              <h2 className="mb-3 text-2xl font-bold font-[family-name:var(--font-oswald)] text-white">
                {offer.title}
              </h2>

              {/* Badge */}
              <span className="rc-section-label mb-6">{t.formules.quote}</span>

              {/* Liste */}
              <ul className="mb-8 flex-1 space-y-3">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-rc-yellow"
                    />
                    <span className="text-sm text-white/80">
                      {renderFeature(feature)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/professionnels/demande-de-devis" className="rc-btn">
                {t.formules.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA global */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-white/80">
            {t.formules.ctaGlobal}
          </p>
          <Link href="/professionnels/demande-de-devis" className="rc-btn">
            {t.formules.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
