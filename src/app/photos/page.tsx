"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

const photoUrls = [
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8962.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8722.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5554.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8725.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8715.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5432.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5701.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5550.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8776.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8693.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8900.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8719.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5653.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5631.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8945.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8863.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8830.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/2a01c934-3c7f-4adb-b36c-c68619a1ad67.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8819.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5449.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5562.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A9008.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8705.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8773.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8750.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5692.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8880.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5540.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8855.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8845.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8730.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8977.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A5428.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A9027.jpg",
  "https://www.ricoune.com/wp-content/uploads/2023/09/3O8A8974.jpg",
];

const heights = [320, 240, 280, 360, 260, 300, 340, 240, 300, 280, 360, 260, 320, 280, 240, 360, 300, 260, 340, 280, 320, 240, 300, 360, 260, 280, 340, 300, 240, 320, 280, 360, 260, 300, 340];

export default function PhotosPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? photoUrls.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === photoUrls.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    },
    [goToPrev, goToNext]
  );

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [lightboxIndex, handleKeyDown]);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Photos
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photoUrls.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="relative mb-4 cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              style={{ height: `${heights[index % heights.length]}px` }}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={url}
                alt={`Ricoune en concert - Photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading={index < 6 ? "eager" : "lazy"}
                quality={70}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-dark-light/80 p-2 text-white transition-colors hover:bg-primary"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 z-10 rounded-full bg-dark-light/80 p-3 text-white transition-colors hover:bg-primary"
              aria-label="Precedent"
            >
              <ChevronLeft size={28} />
            </button>

            <div
              className="relative mx-16 h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={lightboxIndex}
                src={photoUrls[lightboxIndex]}
                alt={`Ricoune - Photo ${lightboxIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                quality={90}
                priority
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-10 rounded-full bg-dark-light/80 p-3 text-white transition-colors hover:bg-primary"
              aria-label="Suivant"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-6 text-sm text-gray-400">
              {lightboxIndex + 1} / {photoUrls.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
