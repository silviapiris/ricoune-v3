import { notFound } from "next/navigation";
import { albums, getAlbumBySlug } from "@/data/albums";
import AlbumDetailClient from "./AlbumDetailClient";

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) return { title: "Album introuvable" };
  return {
    title: `${album.title} - Ricoune`,
    description: `Ecoutez ${album.title} (${album.year}) de Ricoune`,
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) notFound();

  const currentIndex = albums.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? albums[currentIndex - 1] : null;
  const next =
    currentIndex < albums.length - 1 ? albums[currentIndex + 1] : null;

  return <AlbumDetailClient album={album} prev={prev} next={next} />;
}
