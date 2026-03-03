"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { concerts } from "@/data/concerts";

type Filter = "tous" | "solo" | "groupe";

const MONTHS_FR = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.getDate(),
    month: MONTHS_FR[d.getMonth()],
    year: d.getFullYear(),
    weekday: d.toLocaleDateString("fr-FR", { weekday: "long" }),
  };
}

function isPast(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + "T00:00:00");
  return d < today;
}

export default function ConcertsPage() {
  const [filter, setFilter] = useState<Filter>("tous");

  const sorted = useMemo(() => {
    const filtered =
      filter === "tous"
        ? concerts
        : concerts.filter((c) => c.type === filter);
    return [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: "tous", label: "Tous" },
    { key: "solo", label: "En Solo" },
    { key: "groupe", label: "En Groupe" },
  ];

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
            Concerts & Dates
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex justify-center gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-dark-light text-gray-400 hover:bg-dark-lighter hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Concert list */}
        <div className="space-y-4">
          {sorted.map((concert, i) => {
            const date = formatDate(concert.date);
            const past = isPast(concert.date);

            return (
              <motion.div
                key={concert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  past
                    ? "border-dark-lighter/30 bg-dark-light/40 opacity-60"
                    : "border-dark-lighter bg-dark-light hover:border-primary/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center">
                  {/* Date block */}
                  <div
                    className={`flex flex-shrink-0 items-center gap-3 px-5 py-4 sm:w-44 sm:flex-col sm:gap-0 sm:py-5 ${
                      past ? "text-gray-600" : "text-white"
                    }`}
                  >
                    <span className="text-3xl font-bold leading-none sm:text-4xl">
                      {date.day}
                    </span>
                    <div className="sm:text-center">
                      <span className="text-sm font-medium text-secondary sm:block">
                        {date.month}
                      </span>
                      <span className="ml-1 text-xs text-gray-500 sm:ml-0 sm:block">
                        {date.year}
                      </span>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="hidden w-px self-stretch bg-dark-lighter sm:block" />

                  {/* Info */}
                  <div className="flex-1 px-5 pb-4 sm:py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-lg font-bold ${past ? "text-gray-500" : "text-white"}`}
                      >
                        {concert.city}
                      </h3>
                      <span className="rounded bg-dark-lighter px-2 py-0.5 text-xs font-medium text-gray-400">
                        {concert.department}
                      </span>
                      {past && (
                        <span className="rounded bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-400">
                          Passe
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 flex items-center gap-1.5 text-sm ${past ? "text-gray-600" : "text-gray-400"}`}
                    >
                      <MapPin size={14} />
                      {concert.venue}
                    </p>
                  </div>

                  {/* Right badges */}
                  <div className="flex flex-wrap items-center gap-2 px-5 pb-4 sm:flex-col sm:items-end sm:pb-0 sm:py-4 sm:pr-5">
                    <span
                      className={`inline-flex items-center gap-1 text-sm ${past ? "text-gray-600" : "text-gray-300"}`}
                    >
                      <Clock size={14} />
                      {concert.time}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        concert.type === "groupe"
                          ? past
                            ? "bg-primary-dark/30 text-gray-500"
                            : "bg-primary/20 text-primary-light"
                          : past
                            ? "bg-secondary-dark/30 text-gray-500"
                            : "bg-secondary/20 text-secondary"
                      }`}
                    >
                      <Users size={12} />
                      {concert.type === "groupe" ? "En Groupe" : "En Solo"}
                    </span>
                    {concert.allAges && !past && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-dark-lighter px-3 py-1 text-xs font-medium text-gray-400">
                        <Calendar size={12} />
                        Tout public
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="rounded-xl bg-dark-light p-12 text-center">
            <p className="text-gray-400">
              Aucun concert trouve pour ce filtre.
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-8 text-center sm:p-12"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Vous souhaitez privatiser Ricoune ?
          </h2>
          <p className="mt-3 text-gray-200">
            Pour vos evenements prives, fetes de village, mariages ou soirees
            d&apos;entreprise.
          </p>
          <Link
            href="/professionnels/demande-de-devis"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-accent"
          >
            Demandez un devis
          </Link>
        </motion.div>
      </section>
    </>
  );
}
