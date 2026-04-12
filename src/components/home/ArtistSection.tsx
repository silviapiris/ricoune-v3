"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function ArtistSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection>
          <div className="rc-card grid items-center gap-8 overflow-hidden md:grid-cols-[2fr_3fr]">
            {/* Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[400px]">
              <Image
                src="/images/artist/l-artiste.webp"
                alt="Ricoune, l'artiste du Sud"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Texte */}
            <div className="px-6 pb-8 md:py-10 md:pr-10 md:pl-4">
              <span className="rc-section-label">L&apos;AME DE LA F&Ecirc;TE</span>
              <h2 className="mt-3 mb-6 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white md:text-4xl">
                RICOUNE, L&apos;IC&Ocirc;NE DU SUD
              </h2>
              <p className="mb-4 leading-relaxed text-white/85">
                V&eacute;ritable ic&ocirc;ne des f&ecirc;tes votives et des f&eacute;rias du Sud de
                la France, Ricoune est l&apos;artiste incontournable du milieu festif.
              </p>
              <p className="mb-8 leading-relaxed text-white/85">
                Auteur de l&apos;incontournable &laquo;&nbsp;Dans un verre &agrave;
                ballon&nbsp;&raquo;, lanc&eacute; en 2001, il est aussi le cr&eacute;ateur du
                g&eacute;n&eacute;rique de la fameuse &laquo;&nbsp;vache&nbsp;&raquo;
                d&apos;Interville en 2007.
              </p>
              <Link href="/biographie" className="rc-btn">
                D&eacute;couvrir la biographie
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
