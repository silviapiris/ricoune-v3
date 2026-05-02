import type { Metadata } from "next";
import { getPublicVideos } from "@/lib/videos-server";
import VideosPageClient from "./VideosPageClient";

export const metadata: Metadata = {
  title: "Vidéos & Clips",
  description:
    "Regardez les clips officiels et extraits live de Ricoune. Retrouvez toutes ses vidéos musicales et performances sur scène.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Vidéos & Clips | Ricoune",
    description:
      "Clips officiels et extraits live de Ricoune en concert.",
    url: "/videos",
    type: "website",
  },
};

export default async function VideosPage() {
  const { featured, clips, lives } = await getPublicVideos();
  return <VideosPageClient featured={featured} clips={clips} lives={lives} />;
}
