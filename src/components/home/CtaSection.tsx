"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CtaSection(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="rc-card px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mb-4 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mb-8 text-lg text-white/80">{t.cta.subtitle}</p>
            <Link href="/contact" className="rc-btn">
              {t.cta.book}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
