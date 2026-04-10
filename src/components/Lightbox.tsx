"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIndex];

  function handleTouchStart(e: React.TouchEvent): void {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent): void {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    const SWIPE_THRESHOLD = 50;
    if (diff > SWIPE_THRESHOLD) onPrev();
    if (diff < -SWIPE_THRESHOLD) onNext();
    setTouchStart(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
          >{/* Background flou */}
<div className="absolute inset-0">
  <Image
    src={current.src}
    alt=""
    fill
    sizes="100vw"
    className="scale-110 object-cover blur-2xl brightness-40 saturate-150"
    priority
  />
</div>

{/* Overlay sombre */}
<div className="absolute inset-0 bg-black/30" />
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:text-rc-yellow"
        aria-label="Fermer"
      >
        <X size={28} />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:text-rc-yellow"
        aria-label="Photo précédente"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={currentIndex}
          src={current.src}
          alt={current.alt}
          fill
          sizes="90vw"
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:text-rc-yellow"
        aria-label="Photo suivante"
      >
        <ChevronRight size={36} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 text-sm text-white/60">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
