"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function LatestAlbum(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection>
          <div className="rc-card grid items-center gap-8 p-6 md:grid-cols-[1fr_1.5fr] md:p-10">
            {/* Jaquette */}
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl">
              <Image
                src="/images/albums/quand-un-faineant-se-rebelle.webp"
                alt="Pochette de l'album Quand un fainéant se rebelle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>

            {/* Info */}
            <div>
              <span className="rc-section-label">DERNIER ALBUM</span>
              <h2 className="mt-3 mb-4 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white md:text-3xl">
                Quand un fain&eacute;ant se rebelle
              </h2>
              <p className="mb-8 leading-relaxed text-white/80">
                Le dernier opus de Ricoune, c&apos;est pure musique du Sud. De la bonne humeur, des
                chansons populaires qui rassemblent, et l&apos;&eacute;nergie festive qui fait sa
                signature.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://open.spotify.com/artist/5nGIFgo1InYsrFRHCHNJBL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rc-btn"
                >
                  &Eacute;couter sur Spotify
                </a>
                <a
                  href="https://open.spotify.com/artist/5nGIFgo1InYsrFRHCHNJBL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rc-btn-outline"
                >
                  Suivre sur Spotify
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
