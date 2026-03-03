"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Timeline from "@/components/Timeline";

const timelineEvents = [
  {
    year: "1963",
    title:
      "Naissance a Montpellier le 1er fevrier. Berce par la musique de son grand-pere saxophoniste.",
  },
  {
    year: "1983",
    title:
      "Creation de son premier groupe 'Generation 83'. Debut d'une aventure musicale de 5 ans.",
  },
  {
    year: "~1988",
    title:
      "Evolution vers 'Ricoune et les Counass', un format plus audacieux.",
  },
  {
    year: "2001",
    title:
      "Renaissance en solo sous le nom 'Ricoune'. Sortie du tube 'Dans un verre a ballon' qui deviendra l'hymne des fetes du Sud.",
  },
  {
    year: "2007",
    title:
      "Creation du generique de 'La Vache' pour l'emission Interville, diffusee sur France 2.",
  },
  {
    year: "2015",
    title:
      "Sortie de plusieurs albums dont 'Le Best Of', 'Ricoune 20 Ans!', 'Le Kukela', 'Mets tes lunettes'.",
  },
  {
    year: "2017",
    title: "Sortie de l'album 'Face B'.",
  },
  {
    year: "2021",
    title: "Dernier album en date : 'Quand un faineant se rebelle'.",
  },
];

export default function BiographiePage() {
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Image
          src="https://www.ricoune.com/wp-content/uploads/2022/10/Fond-Biographie-Ricoune.jpg"
          alt="Ricoune"
          fill
          className="object-cover"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl font-bold tracking-wider text-white md:text-7xl">
            Biographie
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </motion.div>
      </section>

      {/* ===== BIO INTRO / QUOTE ===== */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <Quote className="mx-auto mb-6 h-10 w-10 text-primary/40" />
            <blockquote className="text-2xl font-medium leading-relaxed text-secondary md:text-3xl">
              &laquo;&nbsp;Un artiste autodidacte, poete a ses heures, qui
              revendique sa liberte creative&nbsp;&raquo;
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="bg-dark-light py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14 text-center">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Parcours
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              Les grandes dates
            </h3>
          </AnimatedSection>

          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* ===== FULL BIO TEXT ===== */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              L&apos;histoire
            </h2>
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              De Montpellier aux scenes du Sud
            </h3>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Ne le 1er fevrier 1963 a Montpellier, Henri grandit berce par
                  la musique de son grand-pere saxophoniste. Apres avoir exerce
                  divers metiers — boulanger, bucheron, glacier — il fonde en
                  1983 son premier groupe &laquo;&nbsp;Generation
                  83&nbsp;&raquo;, qui durera cinq ans.
                </p>
                <p>
                  S&apos;ensuit la periode &laquo;&nbsp;Ricoune et les
                  Counass&nbsp;&raquo;, avant la renaissance en 2001 sous le nom
                  de &laquo;&nbsp;Ricoune&nbsp;&raquo;, avec des compositions
                  plus structurees. C&apos;est cette annee-la qu&apos;il lance
                  son tube incontournable &laquo;&nbsp;Dans un verre a
                  ballon&nbsp;&raquo;, devenu l&apos;hymne des fetes votives et
                  des ferias du Sud de la France.
                </p>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  En 2007, il signe le generique de la fameuse
                  &laquo;&nbsp;vache&nbsp;&raquo; pour le segment final de
                  l&apos;emission Interville sur France 2.
                </p>
                <p>
                  Artiste autodidacte, poete a ses heures, Ricoune revendique sa
                  liberte creative et refuse tout formatage mediatique. Un homme
                  epanoui qui partage son talent a travers ses textes, fidele a
                  lui-meme et a son public du Sud.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PHILOSOPHY SECTION ===== */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-dark-lighter bg-dark-light p-8 md:p-12">
              <h3 className="mb-6 text-center text-2xl font-bold text-white">
                Sa philosophie
              </h3>
              <div className="space-y-4 text-center text-gray-300 leading-relaxed">
                <p>
                  Ricoune est avant tout un homme libre. Autodidacte, il a
                  toujours refuse le formatage de l&apos;industrie musicale pour
                  rester fidele a son identite et a son public.
                </p>
                <p>
                  Poete du quotidien, il puise son inspiration dans la vie du
                  Sud, les fetes de village, les rencontres humaines et les
                  moments simples qui font la beaute de la vie.
                </p>
                <p className="text-lg font-medium text-secondary">
                  &laquo;&nbsp;La musique, c&apos;est le partage. Je chante pour
                  les gens, avec les gens.&nbsp;&raquo;
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
