"use client";

import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPageClient(): React.ReactElement {
  const { t } = useLanguage();
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[30vh] items-center justify-center bg-gradient-to-b from-rc-dark/80 to-transparent py-16">
        <div className="relative text-center">
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-white md:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Content — 2 columns */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Gauche — Formulaire (60%) */}
          <AnimatedSection className="lg:col-span-3">
            <ContactForm />
          </AnimatedSection>

          {/* Droite — Sidebar (40%) */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <ContactSidebar />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
