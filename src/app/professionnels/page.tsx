"use client";

import Link from "next/link";
import { Music, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Nos Formules",
    description: "Decouvrez nos formules de spectacle",
    href: "/professionnels/formules",
    icon: Music,
    color: "primary",
  },
  {
    title: "Demande de Devis",
    description: "Obtenez un devis personnalise",
    href: "/professionnels/demande-de-devis",
    icon: FileText,
    color: "secondary",
  },
  {
    title: "Photos HD",
    description: "Telechargez nos photos professionnelles",
    href: "/professionnels/photos-hd",
    icon: Download,
    color: "primary",
  },
];

export default function ProfessionnelsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Espace Professionnels
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            La page dediee aux professionnels qui souhaitent faire appel a Ricoune
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const borderColor =
              card.color === "primary"
                ? "border-primary/30 hover:border-primary"
                : "border-secondary/30 hover:border-secondary";
            const iconColor =
              card.color === "primary" ? "text-primary" : "text-secondary";

            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link href={card.href}>
                  <div
                    className={`group rounded-xl border ${borderColor} bg-dark-light p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  >
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-lighter ${iconColor}`}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
