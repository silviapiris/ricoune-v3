"use client";

import Image from "next/image";

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  year?: number;
}

interface VideoGridProps {
  items: VideoItem[];
  onSelect: (item: VideoItem) => void;
  showLiveBadge?: boolean;
}

export default function VideoGrid({
  items,
  onSelect,
  showLiveBadge = false,
}: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="rc-card group overflow-hidden text-left transition-transform duration-200 hover:scale-[1.02]"
          aria-label={`Regarder ${item.title}`}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1A1A1A"
                >
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </div>

            {/* LIVE badge */}
            {showLiveBadge && (
              <span className="absolute left-2 top-2 rounded bg-[#C0392B] px-2 py-0.5 text-xs font-bold text-white">
                LIVE
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-[family-name:var(--font-oswald)] text-base font-semibold text-white">
              {item.title}
            </h3>
            {item.year != null && (
              <p className="mt-1 text-sm text-white/60">{item.year}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
