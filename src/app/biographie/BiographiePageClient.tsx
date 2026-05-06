"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BioTimeline from "@/components/bio/BioTimeline";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BioContent, BioTimelineEvent } from "@/lib/bio";

interface Props {
  bio: BioContent | null;
  timeline: BioTimelineEvent[];
}

export default function BiographiePageClient({ bio, timeline }: Props): React.ReactElement {
  const { lang } = useLanguage();

  const txt = (fr: string | null | undefined, en: string | null | undefined): string => {
    if (lang === "en") {
      const enTrimmed = en?.trim();
      return enTrimmed ? enTrimmed : (fr ?? "");
    }
    return fr ?? "";
  };

  const heroSrc = bio?.hero_image_url ?? "/images/bio/bio-hero.webp";
  const portraitSrc = bio?.portrait_image_url ?? "/images/bio/ricoune-bio.webp";

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src={heroSrc}
          alt="Ricoune sur scène"
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
            {txt(bio?.hero_subtitle, bio?.hero_subtitle_en)}
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
                {txt(bio?.quote_text, bio?.quote_text_en)}
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
              {txt(bio?.history_title, bio?.history_title_en)}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid items-start md:items-center gap-8 md:grid-cols-[1fr_2fr]">
              <div className="mx-auto w-full max-w-[280px] md:max-w-none">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-rc-yellow/20 shadow-xl">
                  <Image
                    src={portraitSrc}
                    alt={txt(bio?.portrait_alt, bio?.portrait_alt_en)}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, 33vw"
                  />
                </div>
              </div>
              <div className="space-y-4 md:text-justify">
                <p className="leading-relaxed text-white/85">
                  {txt(bio?.history_paragraph_1, bio?.history_paragraph_1_en)}
                </p>
                <p className="leading-relaxed text-white/85">
                  {txt(bio?.history_paragraph_2, bio?.history_paragraph_2_en)}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 4. MOMENTS CLÉS (Timeline) ===== */}
      {timeline.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <AnimatedSection className="mb-10">
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
                {txt(bio?.timeline_title, bio?.timeline_title_en)}
              </h2>
            </AnimatedSection>

            <BioTimeline
              events={timeline.map(({ year, year_en, description, description_en }) => ({
                year: txt(year, year_en),
                description: txt(description, description_en),
              }))}
            />
          </div>
        </section>
      )}

      {/* ===== 4b. PHOTO STRIP ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10">
            <span className="rc-section-label">{txt(bio?.strip_label, bio?.strip_label_en)}</span>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              {txt(bio?.strip_title, bio?.strip_title_en)}
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[bio?.strip_photo_1_url, bio?.strip_photo_2_url, bio?.strip_photo_3_url]
                .filter((src): src is string => src !== null && src !== undefined)
                .map((src, i) => (
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
                {txt(bio?.strip_cta_label, bio?.strip_cta_label_en)}
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
              {txt(bio?.philosophy_text, bio?.philosophy_text_en)}
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
                {txt(bio?.cta_text, bio?.cta_text_en)}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/concerts" className="rc-btn">
                  {txt(bio?.cta_button_1_label, bio?.cta_button_1_label_en)}
                </Link>
                <Link href="/professionnels/demande-de-devis" className="rc-btn-outline">
                  {txt(bio?.cta_button_2_label, bio?.cta_button_2_label_en)}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
