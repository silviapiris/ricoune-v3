"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { socialLinks } from "@/data/social-links";

interface UniversCard {
  title: string;
  icon: React.ReactElement;
  links: { label: string; href: string; external?: boolean }[];
  mainHref: string;
}

const CARDS: UniversCard[] = [
  {
    title: "\u00C9couter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    links: [
      { label: "Spotify", href: socialLinks.spotify.href, external: true },
      { label: "Deezer", href: socialLinks.deezer.href, external: true },
    ],
    mainHref: socialLinks.spotify.href,
  },
  {
    title: "Regarder",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    links: [{ label: "Voir les vid\u00E9os", href: "/videos" }],
    mainHref: "/videos",
  },
  {
    title: "Suivre",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    links: [
      { label: "Instagram", href: socialLinks.instagram.href, external: true },
      { label: "TikTok", href: socialLinks.tiktok.href, external: true },
    ],
    mainHref: socialLinks.instagram.href,
  },
];

export default function UniversSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card, index) => (
            <AnimatedSection key={card.title} delay={index * 0.1}>
              <CardWrapper card={card} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardWrapper({ card }: { card: UniversCard }): React.ReactElement {
  return (
    <div className="rc-card flex flex-col items-center p-8 text-center transition-transform hover:scale-[1.02]">
      <div className="mb-4 text-rc-yellow">{card.icon}</div>
      <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-xl font-bold text-white">
        {card.title}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {card.links.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
