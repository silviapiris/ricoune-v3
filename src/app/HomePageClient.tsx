"use client";

import HeroSection from "@/components/home/HeroSection";
import SocialBar from "@/components/home/SocialBar";
import ConcertsPreview from "@/components/home/ConcertsPreview";
import AboutSection from "@/components/home/AboutSection";
import LatestAlbum from "@/components/home/LatestAlbum";
import ArtistSection from "@/components/home/ArtistSection";
import UniversSection from "@/components/home/UniversSection";
import CtaSection from "@/components/home/CtaSection";
import type { Concert } from "@/data/concerts";

export default function HomePageClient({ upcomingConcerts }: { upcomingConcerts: Concert[] }): React.ReactElement {
  return (
    <>
      {/* 1. Hero plein ecran */}
      <HeroSection />

      {/* 2. Barre réseaux sociaux */}
      <SocialBar />

      {/* 3. Prochains concerts */}
      <ConcertsPreview concerts={upcomingConcerts} />

      {/* 4. A propos de Ricoune */}
      <AboutSection />

      {/* 5. Dernier album */}
      <LatestAlbum />

      {/* 6. Section artiste */}
      <ArtistSection />

      {/* 7. Univers / Actions */}
      <UniversSection />

      {/* 8. CTA */}
      <CtaSection />
    </>
  );
}
