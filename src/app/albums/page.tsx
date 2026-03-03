"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { albums } from "@/data/albums";

const gradients = [
  "from-primary to-primary-dark",
  "from-secondary-dark to-primary",
  "from-dark-lighter to-primary-dark",
  "from-secondary to-secondary-dark",
  "from-primary-light to-secondary",
  "from-primary-dark to-dark-lighter",
  "from-secondary-dark to-dark-lighter",
  "from-primary to-secondary-dark",
];

export default function AlbumsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/30 to-dark" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold tracking-wider text-white md:text-7xl"
          >
            Discographie
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary"
          />
        </div>
      </section>

      {/* Albums Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album, i) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/albums/${album.slug}`}
                className="group block overflow-hidden rounded-xl bg-dark-light transition-transform duration-300 hover:scale-[1.03]"
              >
                {/* Cover */}
                <div className="relative aspect-square">
                  <Image
                    src={album.coverUrl}
                    alt={album.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  {/* Year badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {album.year}
                  </span>
                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <h2 className="text-lg font-bold text-white">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="mt-1 text-sm text-secondary">
                        {album.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
