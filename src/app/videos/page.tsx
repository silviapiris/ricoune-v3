"use client";

import { motion } from "framer-motion";

const videos = [
  {
    title: "Mon petit village (Clip Officiel)",
    embedId: "9MmBcm-3RNk",
  },
  {
    title: "Ricoune en Live (Medley)",
    embedId: "g_kT8OqT1fc",
  },
  {
    title: "Un Ricard Tube",
    embedId: "g_kT8OqT1fc",
  },
];

export default function VideosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Videos
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Video Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="overflow-hidden rounded-xl bg-dark-light shadow-lg"
            >
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
