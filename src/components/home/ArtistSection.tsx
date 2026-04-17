"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArtistSection(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection>
          <div className="rc-card grid items-center gap-8 overflow-hidden md:grid-cols-[2fr_3fr]">
            {/* Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[400px]">
              <Image
                src="/images/bio/home-bio-portrait.webp"
                alt="Ricoune, l'artiste du Sud"
                fill
                className="object-cover object-top scale-[1.15] origin-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Texte */}
            <div className="px-6 pb-8 md:py-10 md:pr-10 md:pl-4">
              <span className="rc-section-label">{t.artist.soulLabel}</span>
              <h2 className="mt-3 mb-6 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
                {t.artist.title}
              </h2>
              <p className="mb-4 leading-relaxed text-white/85">{t.artist.p1}</p>
              <p className="mb-8 leading-relaxed text-white/85">{t.artist.p2}</p>
              <Link href="/biographie" className="rc-btn">
                {t.artist.discoverBio}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
