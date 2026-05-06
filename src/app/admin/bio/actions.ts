'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const ALLOWED_FIELDS = [
  // Texte (B3.2)
  'hero_subtitle',
  'quote_text',
  'history_title',
  'history_paragraph_1',
  'history_paragraph_2',
  'portrait_alt',
  'philosophy_text',
  'cta_text',
  'cta_button_1_label',
  'cta_button_2_label',
  'strip_label',
  'strip_title',
  'strip_cta_label',
  // Images (B3.3)
  'hero_image_url',
  'portrait_image_url',
  'strip_photo_1_url',
  'strip_photo_2_url',
  'strip_photo_3_url',
] as const

type AllowedField = (typeof ALLOWED_FIELDS)[number]

export type BioTextState = { error?: string; success?: boolean }

export async function updateBioContent(
  _prev: BioTextState | undefined,
  formData: FormData
): Promise<BioTextState> {
  const patch: Partial<Record<AllowedField, string | null>> = {}

  for (const key of ALLOWED_FIELDS) {
    const val = formData.get(key)
    if (val !== null) {
      patch[key] = typeof val === 'string' && val.trim() !== '' ? val.trim() : null
    }
  }

  if (Object.keys(patch).length === 0) {
    return { error: 'Aucun champ à mettre à jour.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('bio_content')
    .update(patch)
    .eq('singleton', true)

  if (error) {
    console.error('[updateBioContent]:', error.message)
    return { error: 'Erreur lors de la sauvegarde. Réessaye.' }
  }

  revalidatePath('/biographie')
  revalidatePath('/admin/bio')
  return { success: true }
}
