"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BioTimeline from "@/components/bio/BioTimeline";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BiographiePageClient(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/bio/bio-hero.webp"
          alt="Ricoune sur sc&egrave;ne"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase text-white md:text-7xl">
            RICOUNE
          </h1>
          <p className="mt-4 font-[family-name:var(--font-raleway)] text-xl text-white/80">
            {t.biography.subtitle}
          </p>
        </div>
      </section>

      {/* ===== 2. CITATION ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatedSection>
            <div className="rc-card px-8 py-12 text-center md:px-16 md:py-16">
              <span className="font-[family-name:var(--font-oswald)] text-6xl leading-none text-rc-yellow">
                &laquo;
              </span>
              <blockquote className="mt-2 font-[family-name:var(--font-raleway)] text-xl italic leading-relaxed text-white md:text-2xl">
                {t.biography.quote}
              </blockquote>
              <span className="mt-2 inline-block font-[family-name:var(--font-oswald)] text-6xl leading-none text-rc-yellow">
                &raquo;
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 3. HISTOIRE ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              {t.biography.historyTitle}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid items-start gap-8 md:grid-cols-[1fr_2fr]">
              <div className="mx-auto w-full max-w-[280px] md:max-w-none">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-rc-yellow/20 shadow-xl">
                  <Image
                    src="/images/bio/home-bio-portrait.webp"
                    alt={t.biography.bioPortraitAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, 33vw"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-white/85">
                  {t.biography.historyP1}
                </p>
                <p className="leading-relaxed text-white/85">
                  {t.biography.historyP2}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 4. MOMENTS CLES (Timeline) ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              {t.biography.keyMomentsTitle}
            </h2>
          </AnimatedSection>

          <BioTimeline events={t.biography.timeline} />
        </div>
      </section>

      {/* ===== 4b. PHOTO STRIP ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10">
            <span className="rc-section-label">{t.biography.stripLabel}</span>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              {t.biography.stripTitle}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                "/images/photos/3O8A8773-800x453.jpg",
                "/images/photos/3O8A5701-800x523.jpg",
                "/images/photos/3O8A8845-800x453.jpg",
              ].map((src, i) => (
                <Link href="/photos" key={src} className="group block overflow-hidden rounded-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={src}
                      alt={`Ricoune en scène ${i + 1}`}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:saturate-150"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/photos" className="rc-btn-outline">
                {t.biography.stripCta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 5. PHILOSOPHIE ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-white/90">
              {t.biography.philosophy}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 6. CTA ===== */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <div className="rc-card px-6 py-12 text-center md:px-12 md:py-16">
              <p className="mb-8 text-xl text-white/90 md:text-2xl">
                {t.biography.ctaText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/concerts" className="rc-btn">
                  {t.biography.viewDates}
                </Link>
                <Link href="/professionnels/demande-de-devis" className="rc-btn-outline">{t.biography.requestQuote}</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
