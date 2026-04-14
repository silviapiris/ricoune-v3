"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import type { Album } from "@/data/albums";

const STREAMING_PLATFORMS = [
  {
    key: "spotify" as const,
    label: "Spotify",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    key: "apple" as const,
    label: "Apple Music",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.48-.18-.965.46-1.94 1.425-2.166.357-.084.72-.148 1.076-.238.34-.086.553-.3.6-.65.007-.05.01-.1.01-.15V9.63a.504.504 0 00-.4-.49c-.1-.023-.198-.04-.3-.053l-3.373-.48a.396.396 0 00-.478.378l-.002.02v7.078c0 .444-.063.878-.27 1.278-.3.58-.762.95-1.39 1.12-.345.094-.698.15-1.054.164-.96.04-1.807-.6-1.975-1.487-.18-.96.45-1.93 1.41-2.162.36-.087.726-.153 1.085-.24.328-.08.543-.293.6-.63.01-.048.014-.098.014-.147V7.202c0-.308.18-.558.478-.616L17.2 5.772c.074-.015.15-.02.224-.02.217 0 .38.158.393.375.003.04.003.078.003.118v4.87h-.25z" />
      </svg>
    ),
  },
  {
    key: "amazon" as const,
    label: "Amazon",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.077c-1.06-.876-1.25-1.281-1.829-2.115-1.748 1.784-2.987 2.317-5.254 2.317-2.681 0-4.768-1.653-4.768-4.963 0-2.585 1.401-4.344 3.396-5.205 1.727-.753 4.14-.89 5.982-1.098v-.41c0-.753.058-1.643-.384-2.293-.384-.577-1.122-.817-1.774-.817-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.547.58l-3.065-.33c-.259-.058-.547-.266-.473-.66C5.746 1.887 8.715.5 11.387.5c1.37 0 3.16.365 4.24 1.402 1.37 1.283 1.239 2.995 1.239 4.862v4.402c0 1.323.549 1.903 1.064 2.617.182.254.221.558-.009.744-.577.485-1.603 1.384-2.166 1.888l-.611-.62zM21.779 20.8C19.474 22.676 16.073 24 13.148 24c-4.075 0-7.742-1.508-10.513-4.017-.218-.198-.024-.47.238-.316 2.994 1.74 6.697 2.788 10.52 2.788 2.58 0 5.413-.535 8.025-1.643.394-.168.724.259.361.588z" />
      </svg>
    ),
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
] as const;

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

export default function AlbumModal({ album, onClose }: AlbumModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={album.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleOverlayClick}
    >
      <div className="rc-card relative max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Cover */}
        <div className="mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-xl">
          <Image
            src={album.coverUrl}
            alt={album.title}
            width={400}
            height={400}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Title + year */}
        <h2 className="mt-6 text-center font-[family-name:var(--font-oswald)] text-2xl font-bold text-white md:text-3xl">
          {album.title}
        </h2>
        <p className="mt-1 text-center text-white/60">{album.year}</p>

        {/* Streaming links */}
        <div className="mt-6 flex flex-col gap-3">
          {STREAMING_PLATFORMS.map((platform) => {
            const url = album.streaming[platform.key];
            if (!url) return null;
            return (
              <a
                key={platform.key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rc-btn-outline justify-start"
              >
                {platform.icon}
                {platform.label}
                <ExternalLink size={14} className="ml-auto" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
