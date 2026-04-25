"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AFFICHES = [
  {
    format: "JPG",
    src: "/images/photos-hd/affiche-verre-a-ballon.jpg",
    downloadSrc: "/images/photos-hd/affiche-verre-a-ballon.pdf",
  },
  {
    format: "JPG",
    src: "/images/photos-hd/affiche-ricoune-en-concert.jpg",
  },
];

const PORTRAITS = [
  {
    format: "JPG",
    src: "/images/photos-hd/portrait-concert-micro.jpg",
  },
  {
    format: "JPG",
    src: "/images/photos-hd/portrait-chemise-blanche.jpg",
  },
  {
    format: "JPG",
    src: "/images/photos-hd/portrait-scene-pied.jpg",
  },
];

export default function PhotosHDPageClient(): React.JSX.Element {
  const { t } = useLanguage();

  const affiches = AFFICHES.map((p, i) => ({ ...p, name: t.photosHd.photoNames[i] ?? "" }));
  const portraits = PORTRAITS.map((p, i) => ({ ...p, name: t.photosHd.photoNames[i + 2] ?? "" }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Titre */}
      <h1 className="text-center text-4xl font-bold font-[family-name:var(--font-oswald)] text-white md:text-5xl">
        {t.photosHd.title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
        {t.photosHd.subtitle}
      </p>

      {/* Section Affiches */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold font-[family-name:var(--font-oswald)] text-white">
          {t.photosHd.affichesTitle}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {affiches.map((photo) => (
            <div key={photo.src} className="rc-card overflow-hidden border border-white/10 shadow-md shadow-black/20 transition-all duration-[400ms] hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-lg hover:shadow-black/25">
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
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {photo.name}
                  </h3>
                  <span className="mt-1 inline-block rounded bg-rc-yellow/20 px-2 py-0.5 text-xs font-medium text-rc-yellow">
                    {photo.format}
                  </span>
                </div>
                <a
                  href={photo.downloadSrc ?? photo.src}
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
      </section>

      {/* Section Portraits */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold font-[family-name:var(--font-oswald)] text-white">
          {t.photosHd.portraitsTitle}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {portraits.map((photo) => (
            <div key={photo.src} className="rc-card overflow-hidden border border-white/10 shadow-md shadow-black/20 transition-all duration-[400ms] hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-lg hover:shadow-black/25">
              <div className="relative h-72 bg-black/20">
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {photo.name}
                  </h3>
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
      </section>

      {/* CTA bas de page */}
      <div className="relative mt-16 overflow-hidden rounded-2xl">
        <Image
          src="/images/bio/home-concert-scene.jpg"
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
