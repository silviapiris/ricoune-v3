"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { ContentItem } from "@/locales/fr";

function renderItem(item: ContentItem, idx: number): React.ReactNode {
  if (typeof item === "string") {
    return <p key={idx}>{item}</p>;
  }
  if ("list" in item) {
    return (
      <div key={idx}>
        <p className="mb-2">{item.list.label}</p>
        <ul className="mb-4 list-disc pl-6">
          {item.list.items.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <p key={idx} className={item.className}>
      {item.text}{" "}
      <a
        href={item.link.href}
        target={item.link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="text-rc-yellow underline transition-colors duration-200 hover:text-rc-yellow/80"
      >
        {item.link.label}
      </a>
    </p>
  );
}

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-bold text-rc-white">
        {title}
      </h2>
      <div className="text-rc-white/80 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyContent(): React.ReactElement {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold uppercase text-rc-white">
        {t.privacy.title}
      </h1>

      {t.privacy.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.content.map((item, idx) => renderItem(item, idx))}
        </LegalSection>
      ))}
    </div>
  );
}
