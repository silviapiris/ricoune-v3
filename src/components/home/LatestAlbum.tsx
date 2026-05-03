"use client";

import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { socialLinks } from "@/data/social-links";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Album } from "@/lib/albums-server";

export default function LatestAlbum({ album }: { album: Album | null }): React.ReactElement | null {
  const { t } = useLanguage();
  if (!album) return null;
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection>
          <div className="rc-card grid items-center gap-8 p-6 md:grid-cols-[1fr_1.5fr] md:p-10">
            {/* Jaquette */}
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl">
              <Image
                src={album.coverUrl}
                alt={`Pochette de l'album ${album.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>

            {/* Info */}
            <div>
              <span className="rc-section-label">{t.album.label}</span>
              <h2 className="mt-3 mb-4 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white md:text-3xl">
                {album.title}
              </h2>
              <p className="mb-8 leading-relaxed text-white/80">{t.album.description}</p>
              <div className="flex flex-wrap gap-4">
                {album.streaming.spotify && (
                  <a
                    href={album.streaming.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rc-btn"
                  >
                    {t.album.listenSpotify}
                  </a>
                )}
                <a
                  href={socialLinks.spotify.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rc-btn-outline"
                >
                  {t.album.followSpotify}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
