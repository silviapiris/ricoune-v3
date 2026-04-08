"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Album } from "@/data/albums";

const streamingPlatforms = [
  {
    key: "spotify" as const,
    label: "Spotify",
    color: "bg-[#1DB954] hover:bg-[#1ed760]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    key: "apple" as const,
    label: "Apple Music",
    color: "bg-[#FC3C44] hover:bg-[#ff5a61]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.48-.18-.965.46-1.94 1.425-2.166.357-.084.72-.148 1.076-.238.34-.086.553-.3.6-.65.007-.05.01-.1.01-.15V9.63a.504.504 0 00-.4-.49c-.1-.023-.198-.04-.3-.053l-3.373-.48a.396.396 0 00-.478.378l-.002.02v7.078c0 .444-.063.878-.27 1.278-.3.58-.762.95-1.39 1.12-.345.094-.698.15-1.054.164-.96.04-1.807-.6-1.975-1.487-.18-.96.45-1.93 1.41-2.162.36-.087.726-.153 1.085-.24.328-.08.543-.293.6-.63.01-.048.014-.098.014-.147V7.202c0-.308.18-.558.478-.616L17.2 5.772c.074-.015.15-.02.224-.02.217 0 .38.158.393.375.003.04.003.078.003.118v4.87h-.25z" />
      </svg>
    ),
  },
  {
    key: "amazon" as const,
    label: "Amazon",
    color: "bg-[#00A8E1] hover:bg-[#25b8ec]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.077c-1.06-.876-1.25-1.281-1.829-2.115-1.748 1.784-2.987 2.317-5.254 2.317-2.681 0-4.768-1.653-4.768-4.963 0-2.585 1.401-4.344 3.396-5.205 1.727-.753 4.14-.89 5.982-1.098v-.41c0-.753.058-1.643-.384-2.293-.384-.577-1.122-.817-1.774-.817-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.547.58l-3.065-.33c-.259-.058-.547-.266-.473-.66C5.746 1.887 8.715.5 11.387.5c1.37 0 3.16.365 4.24 1.402 1.37 1.283 1.239 2.995 1.239 4.862v4.402c0 1.323.549 1.903 1.064 2.617.182.254.221.558-.009.744-.577.485-1.603 1.384-2.166 1.888l-.611-.62z" />
      </svg>
    ),
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    color: "bg-[#FF0000] hover:bg-[#ff3333]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "soundcloud" as const,
    label: "SoundCloud",
    color: "bg-[#FF5500] hover:bg-[#ff7733]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.048-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.194-1.282-.194-1.332c-.014-.057-.047-.094-.104-.094m1.848-1.18c-.063 0-.11.05-.116.11l-.209 2.496.209 2.407c.006.063.053.11.116.11.065 0 .11-.047.12-.11l.236-2.407-.236-2.496c-.01-.06-.055-.11-.12-.11m.943-.253c-.072 0-.122.055-.13.12l-.194 2.75.194 2.59c.008.063.058.12.13.12.073 0 .12-.057.132-.12l.217-2.59-.217-2.75c-.012-.065-.059-.12-.132-.12m.976-.25c-.083 0-.137.063-.145.133l-.178 2.883.178 2.682c.008.073.062.133.145.133.08 0 .136-.06.147-.133l.2-2.682-.2-2.883c-.011-.07-.067-.133-.147-.133m1.037-.081c-.09 0-.148.067-.155.143l-.163 2.964.163 2.727c.007.08.065.143.155.143.088 0 .148-.063.158-.143l.183-2.727-.183-2.964c-.01-.076-.07-.143-.158-.143m1.097-.17c-.1 0-.163.076-.17.156l-.147 3.134.147 2.76c.007.083.07.157.17.157.097 0 .163-.074.173-.157l.166-2.76-.166-3.134c-.01-.08-.076-.157-.173-.157" />
      </svg>
    ),
  },
];

interface Props {
  album: Album;
  prev: Album | null;
  next: Album | null;
}

export default function AlbumDetailClient({ album, prev, next }: Props) {
  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/albums"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-rc-yellow"
        >
          <ArrowLeft size={16} />
          Retour aux albums
        </Link>

        {/* Album header */}
        <div className="mt-6 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative aspect-square w-full max-w-xs flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={album.coverUrl}
              alt={album.title}
              fill
              sizes="320px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-sm font-medium text-rc-yellow">{album.year}</span>
            <h1 className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
              {album.title}
            </h1>
            {album.description && (
              <p className="mt-2 text-lg text-white/70">{album.description}</p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {streamingPlatforms.map(
                (platform) =>
                  album.streaming[platform.key] && (
                    <a
                      key={platform.key}
                      href={album.streaming[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${platform.color}`}
                    >
                      {platform.icon}
                      {platform.label}
                      <ExternalLink size={14} />
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Tracklist */}
        {album.tracklist.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-2xl font-bold text-white">
              Tracklist
            </h2>
            <div className="rc-card overflow-hidden">
              {album.tracklist.map((track, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-white/10 px-5 py-3.5 last:border-b-0 transition-colors hover:bg-white/5"
                >
                  <span className="w-8 text-right text-sm font-medium text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-white/80">{track}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {album.tracklist.length === 0 && (
          <div className="mt-12 rc-card p-8 text-center">
            <p className="text-white/50">
              La tracklist de cet album n&apos;est pas encore disponible.
            </p>
          </div>
        )}

        {/* Previous / Next navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          {prev ? (
            <Link
              href={`/albums/${prev.slug}`}
              className="group flex items-center gap-2 text-white/60 transition-colors hover:text-rc-yellow"
            >
              <ChevronLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              <div>
                <p className="text-xs text-white/40">Précédent</p>
                <p className="text-sm font-medium">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/albums/${next.slug}`}
              className="group flex items-center gap-2 text-right text-white/60 transition-colors hover:text-rc-yellow"
            >
              <div>
                <p className="text-xs text-white/40">Suivant</p>
                <p className="text-sm font-medium">{next.title}</p>
              </div>
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
