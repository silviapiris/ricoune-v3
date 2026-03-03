"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  items: { id: number; gradient: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-dark-light/80 p-2 text-white transition-colors hover:bg-primary"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        {/* Previous */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-10 rounded-full bg-dark-light/80 p-3 text-white transition-colors hover:bg-primary"
          aria-label="Precedent"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Image area */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="mx-16 flex h-[70vh] w-full max-w-4xl items-center justify-center rounded-xl"
          style={{ background: current.gradient }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-4xl font-bold text-white/60">
            Photo {current.id}
          </span>
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-10 rounded-full bg-dark-light/80 p-3 text-white transition-colors hover:bg-primary"
          aria-label="Suivant"
        >
          <ChevronRight size={28} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 text-sm text-gray-400">
          {currentIndex + 1} / {items.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
