"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHOTO_DATA = [
  { format: "PNG", src: "/images/photos-hd/visuel-01.png" },
  { format: "JPEG", src: "/images/photos-hd/visuel-02.jpg" },
];

export default function PhotosHDPage(): React.JSX.Element {
  const { t } = useLanguage();

  const photos = PHOTO_DATA.map((p, i) => ({
    ...p,
    name: t.photosHd.photoNames[i] ?? "",
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Titre */}
      <h1 className="text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-5xl">
        {t.photosHd.title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
        {t.photosHd.subtitle}
      </p>

      {/* Grille photos */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {photos.map((photo) => (
          <div key={photo.src} className="rc-card overflow-hidden border border-white/10 shadow-md shadow-black/20 transition-all duration-[400ms] hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-lg hover:shadow-black/25">
            {/* Aperçu — object-contain pour ne rien tronquer */}
            <div className="relative h-72 bg-black/20">
              <Image
                src={photo.src}
                alt={photo.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                loading="lazy"
                quality={80}
              />
            </div>

            {/* Infos + téléchargement */}
            <div className="flex items-center justify-between p-5">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {photo.name}
                </h2>
                <span className="mt-1 inline-block rounded bg-rc-yellow/20 px-2 py-0.5 text-xs font-medium text-rc-yellow">
                  {photo.format}
                </span>
              </div>
              <a
                href={photo.src}
                download
                className="rc-btn-outline flex h-10 items-center gap-2 px-4 text-sm"
                aria-label={`${t.photosHd.download} ${photo.name}`}
              >
                <Download size={16} />
                {t.photosHd.download}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA bas de page */}
      <div className="relative mt-16 overflow-hidden rounded-2xl">
        <Image
          src="/images/hero/home-concert-scene.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative px-6 py-16 text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-3xl">
            {t.photosHd.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            {t.photosHd.ctaDesc}
          </p>
          <Link
            href="/professionnels/demande-de-devis"
            className="rc-btn mt-6"
          >
            {t.photosHd.ctaBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
