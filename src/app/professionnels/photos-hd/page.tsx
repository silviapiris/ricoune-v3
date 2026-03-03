"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const downloads = [
  {
    title: "Flyer",
    type: "JPEG",
    thumbnailUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/flyer-Ricoune-rgb.jpg",
    downloadUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Flyer_Ricoune.jpeg",
  },
  {
    title: "Photo Professionnelle 1",
    type: "JPEG",
    thumbnailUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/ricoune-8-1140x760.jpg",
    downloadUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Ricoune__1.jpg",
  },
  {
    title: "Affiche Vierge",
    type: "JPEG",
    thumbnailUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Ricoune-affiche-2021-vierge.jpg",
    downloadUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Ricoune__affiche__vierge.jpeg",
  },
  {
    title: "Photo Professionnelle 2",
    type: "JPEG",
    thumbnailUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/ricoune-13-1140x760.jpg",
    downloadUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Ricoune__2.jpg",
  },
  {
    title: "Affiche Verre a Ballon",
    type: "PDF",
    thumbnailUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/affiche_verre.jpg",
    downloadUrl: "https://www.ricoune.com/wp-content/uploads/2024/06/Affiche_verre_ballon.pdf",
  },
];

export default function PhotosHDPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Photos HD
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Downloads */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-gray-400">
          Telechargez librement ces images en haute definition pour vos supports
          de communication.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="overflow-hidden rounded-xl border border-dark-lighter bg-dark-light"
            >
              {/* Thumbnail */}
              <div className="relative h-48">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  quality={70}
                />
              </div>

              {/* Info */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <span
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      item.type === "PDF"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-lighter text-gray-400 transition-colors hover:bg-primary hover:text-white"
                  aria-label={`Telecharger ${item.title}`}
                >
                  <Download size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
