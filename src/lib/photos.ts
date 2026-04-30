/**
 * Construit l'URL publique d'une photo stockee dans Supabase Storage.
 * Format : {SUPABASE_URL}/storage/v1/object/public/photos/{storage_path}
 */
export function getPublicUrl(storagePath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${baseUrl}/storage/v1/object/public/photos/${storagePath}`
}
