import 'server-only'
import { createClient } from '@/lib/supabase/server'

export type PublicPhoto = {
  id: string
  src: string
  alt: string
  pos: string | null
}

export async function getPublicPhotos(): Promise<PublicPhoto[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('photos')
    .select('id, storage_path, alt_text, css_position')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getPublicPhotos]:', error.message)
    return []
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

  return (data || []).map(row => ({
    id: row.id,
    src: `${SUPABASE_URL}/storage/v1/object/public/photos/${row.storage_path}`,
    alt: row.alt_text || 'Concert Ricoune',
    pos: row.css_position,
  }))
}
