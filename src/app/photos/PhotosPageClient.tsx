"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Lightbox = dynamic(() => import("@/components/Lightbox"), { ssr: false });

const BASE = "/images/photos";

const photos: { id: string; src: string; alt: string; pos?: string; contain?: boolean }[] = [
  // Photos locales (concerts indoor)
  { id: "1", src: "/images/photos/ricoune1.webp", alt: "Ricoune en concert" },
  { id: "2", src: "/images/photos/ricoune2.webp", alt: "Ricoune sur scène", pos: "object-[center_35%]" },
  { id: "3", src: "/images/photos/ricoune3.webp", alt: "Ricoune et son public" },
  { id: "4", src: "/images/photos/ricoune4.webp", alt: "Ricoune en spectacle" },
  { id: "5", src: "/images/photos/ricoune5.webp", alt: "Ambiance concert Ricoune" },
  // Session photo professionnelle septembre 2023 (ricoune.com)
  { id: "p01",  src: `${BASE}/3O8A8719-800x826.jpg`,                          alt: "Ricoune sur scène" },
  // p02 supprimé : doublon de ricoune2 (même scène danseuse verte + Ricoune, têtes coupées)
  { id: "p03",  src: `${BASE}/3O8A8705-800x384.jpg`,                          alt: "Ricoune en concert" },
  { id: "p04",  src: `${BASE}/3O8A8773-800x453.jpg`,                          alt: "Ricoune et la foule" },
  { id: "p05",  src: `${BASE}/3O8A8900-800x465.jpg`,                          alt: "Ricoune sur scène" },
  { id: "p06",  src: `${BASE}/3O8A5701-800x523.jpg`,                          alt: "Ricoune en performance" },
  { id: "p07",  src: `${BASE}/3O8A5653-800x523.jpg`,                          alt: "Ricoune au micro" },
  { id: "p08",  src: `${BASE}/3O8A8730-800x362.jpg`,                          alt: "Ambiance concert" },
  { id: "p09",  src: `${BASE}/3O8A8830-800x388.jpg`,                          alt: "Ricoune et son public" },
  { id: "p10",  src: `${BASE}/3O8A8855-800x615.jpg`,                          alt: "Ricoune en concert" },
  { id: "p11",  src: `${BASE}/3O8A8693-800x535.jpg`,                          alt: "Ricoune sur scène" },
  { id: "p12",  src: `${BASE}/3O8A9027-800x575.jpg`,                          alt: "Ricoune en spectacle" },
  { id: "p13",  src: `${BASE}/3O8A8977-800x674.jpg`,                          alt: "Ricoune et la foule" },
  { id: "p14",  src: `${BASE}/3O8A5432-800x457.jpg`,                          alt: "Ricoune en performance" },
  { id: "p15",  src: `${BASE}/3O8A8776-800x793.jpg`,                          alt: "Portrait Ricoune" },
  { id: "p16",  src: `${BASE}/3O8A5554-800x875.jpg`,                          alt: "Ricoune au micro" },
  { id: "p17",  src: `${BASE}/3O8A8962-800x592.jpg`,                          alt: "Ambiance concert Ricoune" },
  { id: "p18",  src: `${BASE}/3O8A5428-786x1000.jpg`,                         alt: "Ricoune en concert",  pos: "object-top" },
  { id: "p19",  src: `${BASE}/3O8A5692-765x1000.jpg`,                         alt: "Portrait de Ricoune" },
  // p20 supprimé : doublon de ricoune4 (même scène batteur drums rouges + fumée jaune)
  { id: "p21",  src: `${BASE}/3O8A8845-800x453.jpg`,                          alt: "Ricoune et son public" },
  { id: "p22",  src: `${BASE}/3O8A5550-800x556.jpg`,                          alt: "Ricoune en spectacle" },
  { id: "p23",  src: `${BASE}/3O8A5449-800x910.jpg`,                          alt: "Batteur en concert" },
  { id: "p24",  src: `${BASE}/3O8A8715-667x1000.jpg`,                         alt: "Ricoune au micro",    pos: "object-top" },
  { id: "p25",  src: `${BASE}/3O8A5562-664x1000.jpg`,                         alt: "Ricoune en concert",  pos: "object-top" },
  { id: "p26",  src: `${BASE}/3O8A9008-800x415.jpg`,                          alt: "Ambiance Ricoune" },
  { id: "p27",  src: `${BASE}/3O8A8750-800x445.jpg`,                          alt: "Ricoune sur scène" },
  { id: "p28",  src: `${BASE}/2a01c934-3c7f-4adb-b36c-c68619a1ad67-800x665.jpg`, alt: "Ricoune en performance" },
  { id: "p29",  src: `${BASE}/3O8A8974-721x1000.jpg`,                         alt: "Portrait de Ricoune", pos: "object-top" },
  { id: "p30",  src: `${BASE}/3O8A8725-800x962.jpg`,                          alt: "Ricoune au micro", pos: "object-top" },
  { id: "p31",  src: `${BASE}/3O8A8863-800x969.jpg`,                          alt: "Ricoune et danseuse" },
  { id: "p32",  src: `${BASE}/3O8A5631-800x752.jpg`,                          alt: "Ricoune et la foule" },
  { id: "p33",  src: `${BASE}/3O8A5540-800x462.jpg`,                          alt: "Ambiance concert" },
  { id: "p34",  src: `${BASE}/3O8A8819-800x459.jpg`,                          alt: "Ricoune sur scène" },
  { id: "p35",  src: `${BASE}/3O8A8722-800x968.jpg`,                          alt: "Portrait Ricoune",   pos: "object-top" },
];

export default function PhotosPageClient() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? photos.length - 1 : prev - 1,
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === photos.length - 1 ? 0 : prev + 1,
    );
  }, []);

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
              className={`group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rc-yellow${photo.contain ? " bg-black/80" : ""}`}
              aria-label={`Voir ${photo.alt} en grand`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={photo.contain
                  ? "object-contain transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-105"
                  : `object-cover ${photo.pos ?? "object-center"} transition-transform duration-300 group-hover:scale-[1.03] group-hover:brightness-105`
                }
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
