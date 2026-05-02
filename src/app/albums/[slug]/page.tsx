import { notFound } from "next/navigation";
import { getAlbums, getAlbumBySlug } from "@/lib/albums-server";
import AlbumDetailClient from "./AlbumDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
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
  const [album, allAlbums] = await Promise.all([
    getAlbumBySlug(slug),
    getAlbums(),
  ]);
  if (!album) notFound();

  const currentIndex = allAlbums.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allAlbums[currentIndex - 1] : null;
  const next =
    currentIndex < allAlbums.length - 1 ? allAlbums[currentIndex + 1] : null;

  return <AlbumDetailClient album={album} prev={prev} next={next} />;
}
