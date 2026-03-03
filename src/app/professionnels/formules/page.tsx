"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const formules = [
  {
    name: "The Ricoune Show",
    badge: "Groupe",
    price: "Sur devis",
    accent: "primary",
    features: [
      "Concert de 2 heures",
      "Musiciens et comedien sur scene",
      "DJ optionnel pour prolonger la soiree",
      "Fiche technique fournie",
      "Adaptation selon l'evenement",
    ],
  },
  {
    name: "L'ApeRicoune",
    badge: "Solo",
    price: "Sur devis",
    accent: "secondary",
    features: [
      "Animation musicale solo",
      "Ideal pour aperitifs et cocktails",
      "Format flexible et convivial",
      "Dynamise vos evenements festifs",
      "Ambiance garantie",
    ],
  },
];

export default function FormulesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[40vh] items-center justify-center bg-gradient-to-b from-dark-light to-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,47,40,0.15),transparent_70%)]" />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-6xl">
            Nos Formules
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {formules.map((formule, index) => {
            const isPrimary = formule.accent === "primary";
            const borderClass = isPrimary
              ? "border-primary/40"
              : "border-secondary/40";
            const badgeBg = isPrimary ? "bg-primary" : "bg-secondary";
            const checkColor = isPrimary ? "text-primary" : "text-secondary";
            const btnBg = isPrimary
              ? "bg-primary hover:bg-primary-light"
              : "bg-secondary hover:bg-secondary-light";

            return (
              <motion.div
                key={formule.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col rounded-xl border ${borderClass} bg-dark-light p-8`}
              >
                {/* Badge */}
                <span
                  className={`${badgeBg} mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white`}
                >
                  {formule.badge}
                </span>

                {/* Name */}
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {formule.name}
                </h3>

                {/* Price */}
                <p className="mb-6 text-lg text-gray-400">{formule.price}</p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {formule.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={18} className={`mt-0.5 shrink-0 ${checkColor}`} />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/professionnels/demande-de-devis"
                  className={`${btnBg} rounded-lg px-6 py-3 text-center text-sm font-semibold text-white transition-colors`}
                >
                  Demander un devis
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
