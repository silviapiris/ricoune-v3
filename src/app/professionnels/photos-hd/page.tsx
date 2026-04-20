import type { Metadata } from "next";
import PhotosHDPageClient from "./PhotosHDPageClient";

export const metadata: Metadata = {
  title: "Photos HD pour presse",
  description:
    "Téléchargez les visuels professionnels haute définition de Ricoune pour vos supports de communication : affiches, presse, réseaux sociaux.",
  alternates: {
    canonical: "/professionnels/photos-hd",
  },
  openGraph: {
    title: "Photos HD pour presse | Ricoune",
    description:
      "Visuels professionnels HD de Ricoune, téléchargeables pour presse et communication.",
    url: "/professionnels/photos-hd",
    type: "website",
  },
};

export default function PhotosHDPage() {
  return <PhotosHDPageClient />;
}
