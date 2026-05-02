import type { Metadata } from "next";
import PhotosPageClient from "./PhotosPageClient";
import { getPublicPhotos } from "@/lib/photos-public";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Découvrez la galerie photos de Ricoune en concert : scènes de fêtes votives, férias, événements privés dans le Sud de la France.",
  alternates: {
    canonical: "/photos",
  },
  openGraph: {
    title: "Photos | Ricoune",
    description:
      "Galerie photos de Ricoune en concert et en coulisses.",
    url: "/photos",
    type: "website",
  },
};

export default async function PhotosPage() {
  const photos = await getPublicPhotos();
  return <PhotosPageClient photos={photos} />;
}
