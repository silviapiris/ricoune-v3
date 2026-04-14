"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { socialLinks } from "@/data/social-links";

interface SocialIcon {
  name: string;
  href: string;
  icon: React.ReactElement;
}

const SOCIAL_ICONS: SocialIcon[] = [
  {
    name: "Facebook",
    href: socialLinks.facebook.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="#1877F2" width="22" height="22" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: socialLinks.instagram.href,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <defs>
          <linearGradient id="ig-grad-about" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <path fill="url(#ig-grad-about)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: socialLinks.youtube.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF0000" width="22" height="22" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: socialLinks.tiktok.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="#ffffff" width="22" height="22" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function AboutSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr]">
          <AnimatedSection>
  <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden rounded-2xl shadow-xl">
    <Image
      src="/images/bio/home-concert-scene.jpg"
      alt="Ricoune en concert"
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 40vw"
    />
  </div>
</AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
              &Agrave; propos de Ricoune
            </h2>
            <p className="mb-4 leading-relaxed text-white/90">
              L&apos;univers de Ricoune, c&apos;est avant tout la f&ecirc;te et la bonne humeur.
            </p>
            <p className="mb-4 leading-relaxed text-white/90">
              Artiste embl&eacute;matique du Sud de la France, il enflamme les sc&egrave;nes avec
              ses chansons festives, populaires et entra&icirc;nantes.
            </p>
            <p className="mb-8 leading-relaxed text-white/90">
              &Agrave; travers ses concerts, Ricoune partage une &eacute;nergie communicative et
              rassemble toutes les g&eacute;n&eacute;rations autour d&apos;un m&ecirc;me esprit de
              convivialit&eacute;.
            </p>

            <div className="mb-6">
              <Link href="/biographie" className="rc-btn-outline">
                En savoir plus
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre Ricoune sur ${social.name}`}
                  className="transition-opacity hover:opacity-80"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
