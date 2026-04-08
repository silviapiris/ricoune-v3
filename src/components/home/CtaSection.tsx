"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function CtaSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="rc-card px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mb-4 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
              ORGANISEZ VOTRE &Eacute;V&Eacute;NEMENT AVEC RICOUNE
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Mairies, comit&eacute;s des f&ecirc;tes, particuliers&nbsp;: mettez le feu &agrave;
              votre sc&egrave;ne.
            </p>
            <Link href="/contact" className="rc-btn">
              R&eacute;server / Contacter
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
