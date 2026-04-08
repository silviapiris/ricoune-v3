"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BioTimeline from "@/components/bio/BioTimeline";

const TIMELINE_EVENTS = [
  {
    year: "1963",
    description: "Naissance \u00e0 Montpellier",
  },
  {
    year: "1983",
    description: "Premier groupe",
  },
  {
    year: "1988",
    description:
      "\u00c9volution artistique, d\u00e9but des grandes sc\u00e8nes",
  },
  {
    year: "2001",
    description:
      "\u00ab\u00a0Dans un verre \u00e0 ballon\u00a0\u00bb, le tube qui marque une g\u00e9n\u00e9ration",
  },
  {
    year: "2007",
    description:
      "G\u00e9n\u00e9rique de la c\u00e9l\u00e8bre \u00ab\u00a0vache\u00a0\u00bb d\u2019Interville",
  },
];

export default function BiographiePage(): React.ReactElement {
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
            L&apos;artiste incontournable des sc&egrave;nes festives
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
                La musique, c&apos;est le partage. Je chante pour les gens,
                avec les gens.
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
              De Montpellier aux sc&egrave;nes festives
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="leading-relaxed text-white/85">
                N&eacute; &agrave; Montpellier en 1963, Ricoune grandit
                berc&eacute; par la musique populaire du Sud. Tr&egrave;s
                t&ocirc;t, il d&eacute;couvre sa passion pour la sc&egrave;ne et
                le contact avec le public. En 1983, il forme son premier groupe
                et commence &agrave; &eacute;cumer les f&ecirc;tes de village,
                les bodegas et les f&eacute;rias qui font vibrer
                l&apos;Occitanie.
              </p>
              <p className="leading-relaxed text-white/85">
                Au fil des ann&eacute;es, Ricoune affine son style unique : un
                m&eacute;lange de chansons festives, de reprises populaires et
                de compositions originales qui mettent tout le monde
                d&apos;accord. Son authenticit&eacute; et son &eacute;nergie sur
                sc&egrave;ne en font rapidement une figure incontournable du
                circuit festif du Sud de la France.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 4. MOMENTS CLES (Timeline) ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-white">
              Moments cl&eacute;s
            </h2>
          </AnimatedSection>

          <BioTimeline events={TIMELINE_EVENTS} />
        </div>
      </section>

      {/* ===== 5. PHILOSOPHIE ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-white/90">
              Pour Ricoune, la musique n&apos;est pas un m&eacute;tier,
              c&apos;est un art de vivre. Libre, authentique, sans artifice. Sur
              sc&egrave;ne, il n&apos;y a pas de barri&egrave;re entre
              l&apos;artiste et son public. Chaque concert est un moment de
              partage, une c&eacute;l&eacute;bration collective o&ugrave; tout
              le monde chante, danse et oublie le quotidien.
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
                Envie de vivre l&apos;exp&eacute;rience Ricoune en live ?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/concerts" className="rc-btn">
                  Voir les prochaines dates
                </Link>
                <Link href="/professionnels/demande-de-devis" className="rc-btn-outline">Demander un devis</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
