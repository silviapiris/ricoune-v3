"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Lightbox = dynamic(() => import("@/components/Lightbox"), { ssr: false });

type PublicPhoto = {
  id: string
  src: string
  alt: string
  pos: string | null
}

type Props = { photos: PublicPhoto[] }

export default function PhotosPageClient({ photos }: Props) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? photos.length - 1 : prev - 1,
    );
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === photos.length - 1 ? 0 : prev + 1,
    );
  }, [photos.length]);

  return (
    <>
      {/* Page title */}
      <section className="px-4 pt-16 pb-8 text-center">
        <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-white md:text-5xl">
          {t.photos.title}
        </h1>
        <p className="mt-3 text-white/70">{t.photos.subtitle}</p>
      </section>

      {/* Photo grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rc-yellow"
              aria-label={`Voir ${photo.alt} en grand`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover ${photo.pos ?? "object-center"} transition-transform duration-300 group-hover:scale-[1.03] group-hover:brightness-105`}
                loading={index < 3 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rc-card p-8 text-center sm:p-12">
          <p className="font-[family-name:var(--font-oswald)] text-xl text-white">
            {t.photos.ctaText}
          </p>
          <Link
            href="/professionnels/demande-de-devis"
            className="rc-btn mt-6"
          >
            {t.photos.requestQuote}
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  );
}
