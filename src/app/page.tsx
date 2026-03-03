"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Clock,
  Play,
  Mail,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const upcomingConcerts = [
  {
    day: "05",
    month: "AVR",
    year: "2026",
    city: "Saint Rome de Tarn",
    venue: "Bar Le Languedoc",
    time: "12:00",
    type: "Solo",
  },
  {
    day: "18",
    month: "AVR",
    year: "2026",
    city: "Port Saint Louis du Rhone",
    venue: "Salle Marcel Pagnol",
    time: "19:00",
    type: "Solo",
  },
  {
    day: "07",
    month: "MAI",
    year: "2026",
    city: "Lattes",
    venue: "Mas du cheval",
    time: "23:00",
    type: "Solo",
  },
  {
    day: "08",
    month: "MAI",
    year: "2026",
    city: "Codolet",
    venue: "Village de Codolet",
    time: "12:00",
    type: "Solo",
  },
];

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.7.28a10.16 10.16 0 0 0-1.564-.15C17.51.073 16.882.04 16.254.04H7.746c-.628 0-1.256.033-1.882.09A10.2 10.2 0 0 0 4.3.28a5.022 5.022 0 0 0-1.874.61C1.308 1.603.563 2.6.246 3.91A9.23 9.23 0 0 0 .006 6.1v11.8a9.23 9.23 0 0 0 .24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 0 0 1.874.61c.626.058 1.254.09 1.882.09h8.508c.628 0 1.256-.032 1.882-.09a5.022 5.022 0 0 0 1.874-.61c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 0 0 .24-2.19V6.124zM16.95 13.27c0 1.66-.54 2.94-1.62 3.84-.96.8-2.14 1.2-3.54 1.2-.52 0-1.04-.08-1.56-.24-.52-.16-.98-.4-1.38-.72-.8-.64-1.2-1.52-1.2-2.64v-.24c0-.16.12-.28.28-.28h1.44c.16 0 .28.12.28.28v.16c0 .48.16.88.48 1.2.32.32.72.48 1.2.48.56 0 1.04-.2 1.44-.6.4-.4.6-.88.6-1.44V8.58l-5.4 1.68c-.16.04-.28-.04-.28-.2V8.62c0-.12.08-.22.2-.26l6.12-1.88c.04-.02.08-.02.12-.02.16 0 .28.12.28.28v6.5z" />
    </svg>
  );
}

function AmazonMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 0 1-.753.077c-1.06-.879-1.25-1.287-1.829-2.126-1.748 1.783-2.985 2.316-5.249 2.316C6.584 18.062 5 16.498 5 13.503c0-2.305 1.249-3.876 3.03-4.645 1.542-.681 3.696-.802 5.341-.989v-.367c0-.678.052-1.478-.346-2.063-.346-.521-.999-.736-1.58-.736-1.074 0-2.027.551-2.263 1.692-.048.254-.233.504-.487.517l-2.729-.294c-.23-.051-.486-.236-.42-.586C6.219 3.16 8.985 2.25 11.488 2.25c1.266 0 2.919.337 3.918 1.295 1.266 1.182 1.145 2.759 1.145 4.478v4.056c0 1.22.506 1.755.982 2.413.168.236.205.519-.01.694-.536.448-1.49 1.282-2.014 1.749l-.365-.14zM21.779 19.58C19.428 21.41 15.902 22.5 12.876 22.5c-4.314 0-8.197-1.595-11.13-4.249-.231-.209-.025-.494.252-.333 3.169 1.843 7.09 2.953 11.134 2.953 2.73 0 5.733-.566 8.495-1.739.417-.178.766.274.152.448z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://www.ricoune.com/wp-content/uploads/2022/10/Page-daccueil.jpg"
          alt="Ricoune en concert"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark" />

        <div className="relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 text-7xl font-bold tracking-[0.2em] text-white md:text-9xl"
          >
            RICOUNE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "6rem" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mx-auto mb-6 h-1 rounded-full bg-primary"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 text-xl text-secondary md:text-2xl"
          >
            L&apos;artiste incontournable des fetes du Sud
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/concerts"
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:border-primary hover:bg-primary hover:text-white"
            >
              Voir les dates
            </Link>
            <a
              href="https://open.spotify.com/artist/ricoune"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:bg-primary-light"
            >
              <SpotifyIcon />
              Ecouter sur Spotify
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="bg-dark-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://www.ricoune.com/wp-content/uploads/2022/10/Fond-Biographie-Ricoune.jpg"
                  alt="Ricoune portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                A propos
              </h2>
              <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                L&apos;artiste
              </h3>
              <p className="mb-4 leading-relaxed text-gray-300">
                Veritable icone des fetes votives et des ferias du Sud de la
                France, Ricoune est l&apos;artiste incontournable du milieu
                festif.
              </p>
              <p className="mb-8 leading-relaxed text-gray-300">
                Auteur de l&apos;incontournable &laquo;&nbsp;Dans un verre a
                ballon&nbsp;&raquo; lance en 2001, il est aussi le createur du
                generique de la fameuse &laquo;&nbsp;vache&nbsp;&raquo;
                d&apos;Interville en 2007.
              </p>
              <Link
                href="/biographie"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
              >
                Decouvrir la biographie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== UPCOMING CONCERTS ===== */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Agenda
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              Prochains Concerts
            </h3>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingConcerts.map((concert, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group rounded-xl border border-dark-lighter bg-dark-light p-6 transition-all hover:border-primary/50 hover:bg-dark-lighter">
                  {/* Date */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {concert.day}
                    </span>
                    <span className="ml-2 text-sm font-semibold uppercase tracking-wider text-secondary">
                      {concert.month}
                    </span>
                  </div>

                  {/* Info */}
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    {concert.city}
                  </h4>
                  <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {concert.venue}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {concert.time}
                  </div>

                  {/* Badge */}
                  <div className="mt-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {concert.type}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <Link
              href="/concerts"
              className="group inline-flex items-center gap-2 rounded-full border border-dark-lighter px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary hover:text-primary"
            >
              Voir toutes les dates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== LATEST ALBUM ===== */}
      <section className="bg-dark-light py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://www.ricoune.com/wp-content/uploads/2021/12/Ricoune-Pochette-Quand-un-fainéant-se-rebelle-couleur-Automne-copie-400x400.jpg"
                  alt="Quand un fainéant se rebelle - Album"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  quality={80}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Dernier album
              </h2>
              <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Quand un faineant se rebelle
              </h3>
              <p className="mb-8 leading-relaxed text-gray-300">
                Sorti en 2021, ce dernier album en date capture toute
                l&apos;essence de Ricoune : des textes sinceres, des melodies
                festives et l&apos;esprit libre du Sud.
              </p>

              {/* Streaming buttons */}
              <div className="mb-8 flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/artist/ricoune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <SpotifyIcon />
                  Spotify
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-full bg-[#FA243C] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <AppleMusicIcon />
                  Apple Music
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-full bg-[#00A8E1] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <AmazonMusicIcon />
                  Amazon
                </a>
                <a
                  href="https://www.youtube.com/@ricoune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#FF0000] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Play className="h-4 w-4" />
                  YouTube
                </a>
              </div>

              <Link
                href="/albums"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
              >
                Voir tous les albums
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== VIDEOS ===== */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              A voir
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              Videos
            </h3>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection>
              <div className="overflow-hidden rounded-xl bg-dark-light">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/9MmBcm-3RNk"
                    title="Mon petit village (Clip Officiel)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-300">Mon petit village (Clip Officiel)</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="overflow-hidden rounded-xl bg-dark-light">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/g_kT8OqT1fc"
                    title="Ricoune en Live (Medley)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-300">Ricoune en Live (Medley)</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-10 text-center">
            <Link
              href="/videos"
              className="group inline-flex items-center gap-2 rounded-full border border-dark-lighter px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary hover:text-primary"
            >
              Voir toutes les videos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-dark-light p-8 text-center md:p-12">
              <div className="mb-4 flex justify-center">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                Restez informe
              </h3>
              <p className="mb-8 text-gray-400">
                Recevez les dernieres nouvelles et dates de concerts
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 rounded-full border border-dark-lighter bg-dark px-5 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                >
                  S&apos;inscrire
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
