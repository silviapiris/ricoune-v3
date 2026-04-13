"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function HeroSection(): React.ReactElement {
  return (
    <section className="relative flex min-h-screen items-start md:items-end justify-start pb-24 sm:pb-0 overflow-hidden">
      <Image
        src="/images/hero/hero-concert-hd.webp"
        alt="Ricoune en concert devant une foule en fete"
        fill
        priority
        className="object-cover scale-[0.85] md:scale-100 object-[center_20%] md:object-center"
        sizes="(max-width: 768px) 300vw, 100vw"
      />
      {/* Gradient soutenant le texte en bas sans écraser le sujet */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Vignette latérale gauche discrète pour ancrer le texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      {/* Atténuation haute pour lisibilité navbar sur spots lumineux */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[160px] bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      <div className="relative z-10 w-full max-w-2xl px-6 pb-4 pt-[70vh] md:pt-0 text-center md:text-left md:px-16 md:pb-8 lg:px-20 lg:pb-8">
        <AnimatedSection>
          <Image
            src="/images/hero/ricoune-logo-hero.png"
            alt="Ricoune"
            width={520}
            height={260}
            priority
            className="mb-4 block mx-auto md:mx-0 w-64 md:w-[420px] md:translate-y-14"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mb-5 md:mb-10 font-[family-name:var(--font-raleway)] text-xl text-white/80 md:text-2xl">
            L&apos;artiste incontournable des f&ecirc;tes du Sud
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start md:items-start">
            <a
              href="https://open.spotify.com/artist/5nGIFgo1InYsrFRHCHNJBL"
              target="_blank"
              rel="noopener noreferrer"
              className="rc-btn"
            >
              <SpotifyIcon />
              &Eacute;couter sur Spotify
            </a>
            <Link
              href="/professionnels/demande-de-devis"
              className="rc-btn-outline"
            >
              Demander une date
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SpotifyIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
