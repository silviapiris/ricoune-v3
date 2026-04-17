"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { albums } from "@/data/albums";
import type { Album } from "@/data/albums";
import { useLanguage } from "@/contexts/LanguageContext";

const AlbumModal = dynamic(() => import("@/components/AlbumModal"), { ssr: false });

export default function AlbumsPage() {
  const { t } = useLanguage();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const handleClose = useCallback(() => {
    setSelectedAlbum(null);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <h1 className="text-center font-[family-name:var(--font-oswald)] text-4xl font-bold tracking-wide text-white md:text-5xl">
        {t.albums.title}
      </h1>
      <p className="mt-3 text-center text-white/70">{t.albums.subtitle}</p>

      {/* Album grid */}
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album.slug}
            type="button"
            onClick={() => setSelectedAlbum(album)}
            className="group cursor-pointer text-left transition-transform duration-300 hover:scale-[1.03]"
            aria-label={`${album.title} (${album.year})`}
          >
            {/* Cover */}
            <div className="aspect-square overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
              <Image
                src={album.coverUrl}
                alt={album.title}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Title + year */}
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white md:text-base">
              {album.title}
            </p>
            <p className="text-sm text-white/60">{album.year}</p>
          </button>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-16 rc-card p-8 md:p-12 text-center">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl md:text-3xl font-bold mb-4">
          {t.albums.ctaTitle}
        </h2>
        <p className="text-white/70 mb-6">{t.albums.ctaDesc}</p>
        <Link href="/professionnels/demande-de-devis" className="rc-btn">{t.albums.requestQuote}</Link>
      </section>

      {/* Modal */}
      {selectedAlbum !== null && (
        <AlbumModal album={selectedAlbum} onClose={handleClose} />
      )}
    </section>
  );
}
