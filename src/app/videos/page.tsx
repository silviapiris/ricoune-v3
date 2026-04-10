"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import VideoGrid from "@/components/videos/VideoGrid";
import { clips, lives, FEATURED_YOUTUBE_ID, type VideoItem } from "@/data/videos";

const VideoModal = dynamic(() => import("@/components/videos/VideoModal"), { ssr: false });

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);

  function handleSelect(item: VideoItem): void {
    setActiveVideo(item);
  }

  function handleClose(): void {
    setActiveVideo(null);
  }

  return (
    <>
      {/* Page title */}
      <section className="px-4 pt-16 pb-8">
        <h1 className="text-center font-[family-name:var(--font-oswald)] text-4xl font-bold text-white md:text-5xl">
          Vidéos
        </h1>
      </section>

      {/* Featured video — click-to-play */}
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="overflow-hidden rounded-xl">
          <div className="aspect-video w-full relative">
            {featuredPlaying ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${FEATURED_YOUTUBE_ID}?autoplay=1`}
                title="Clip officiel — Dans un verre a ballon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setFeaturedPlaying(true)}
                className="relative block h-full w-full cursor-pointer"
                aria-label="Lire le clip officiel — Dans un verre a ballon"
              >
                <Image
                  src={`https://img.youtube.com/vi/${FEATURED_YOUTUBE_ID}/maxresdefault.jpg`}
                  alt="Clip officiel — Dans un verre a ballon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20">
                  <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
                    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00" />
                    <path d="M45 24L27 14v20" fill="#fff" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
        <h2 className="mt-4 text-center font-[family-name:var(--font-oswald)] text-xl text-white">
          Clip officiel — Dans un verre a ballon
        </h2>
      </section>

      {/* Clips officiels */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white">
          Clips officiels
        </h2>
        <VideoGrid items={clips} onSelect={handleSelect} />
      </section>

      {/* Extraits live */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white">
          Extraits live
        </h2>
        <VideoGrid items={lives} onSelect={handleSelect} showLiveBadge />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rc-card p-8 text-center sm:p-12">
          <p className="font-[family-name:var(--font-oswald)] text-xl text-white">
            Vous aimez l&apos;ambiance ?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/concerts" className="rc-btn">
              Voir les prochaines dates
            </Link>
            <Link href="/professionnels/demande-de-devis" className="rc-btn-outline">Demander un devis</Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeVideo != null && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          onClose={handleClose}
        />
      )}
    </>
  );
}
