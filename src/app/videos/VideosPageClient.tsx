"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import VideoGrid from "@/components/videos/VideoGrid";
import YouTubePlayer from "@/components/videos/YouTubePlayer";
import type { Video } from "@/lib/videos-server";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoModal = dynamic(() => import("@/components/videos/VideoModal"), { ssr: false });

type VideoGridItem = { id: string; title: string; youtubeId: string; year?: number }

type Props = {
  featured: Video | null
  clips: Video[]
  lives: Video[]
}

export default function VideosPageClient({ featured, clips, lives }: Props) {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<VideoGridItem | null>(null);

  function handleSelect(item: VideoGridItem): void {
    setActiveVideo(item);
  }

  function handleClose(): void {
    setActiveVideo(null);
  }

  const clipItems: VideoGridItem[] = clips.map(v => ({ id: v.id, title: v.title, youtubeId: v.youtube_id }))
  const liveItems: VideoGridItem[] = lives.map(v => ({ id: v.id, title: v.title, youtubeId: v.youtube_id }))

  return (
    <>
      {/* Page title */}
      <section className="px-4 pt-16 pb-8">
        <h1 className="text-center font-[family-name:var(--font-oswald)] text-4xl font-bold text-white md:text-5xl">
          {t.videos.title}
        </h1>
      </section>

      {/* Featured video */}
      {featured !== null && (
        <section className="mx-auto max-w-4xl px-4 pb-12">
          <div className="overflow-hidden rounded-xl">
            <YouTubePlayer
              youtubeId={featured.youtube_id}
              title={featured.title}
              customThumbnailUrl={featured.custom_thumbnail_url}
              isFeatured
            />
          </div>
          <h2 className="mt-4 text-center font-[family-name:var(--font-oswald)] text-xl text-white">
            {featured.title}
          </h2>
        </section>
      )}

      {/* Clips officiels */}
      {clipItems.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white">
            {t.videos.officialClips}
          </h2>
          <VideoGrid items={clipItems} onSelect={handleSelect} />
        </section>
      )}

      {/* Extraits live */}
      {liveItems.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white">
            {t.videos.liveExcerpts}
          </h2>
          <VideoGrid items={liveItems} onSelect={handleSelect} showLiveBadge />
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rc-card p-8 text-center sm:p-12">
          <p className="font-[family-name:var(--font-oswald)] text-xl text-white">
            {t.videos.ctaText}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/concerts" className="rc-btn">
              {t.videos.viewDates}
            </Link>
            <Link href="/professionnels/demande-de-devis" className="rc-btn-outline">{t.videos.requestQuote}</Link>
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
