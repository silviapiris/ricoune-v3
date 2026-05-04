'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type TimelineActionState = { ok?: boolean; error?: string } | undefined

// ─── createTimelineEvent ─────────────────────────────────────────────────────

export async function createTimelineEvent(
  _prev: TimelineActionState,
  formData: FormData
): Promise<TimelineActionState> {
  const year = ((formData.get('year') as string | null) ?? '').trim()
  const description = ((formData.get('description') as string | null) ?? '').trim()

  if (!year || !description) {
    return { error: 'Les champs année et description sont obligatoires.' }
  }
  if (year.length > 20) {
    return { error: "L'année ne peut pas dépasser 20 caractères." }
  }
  if (description.length > 500) {
    return { error: 'La description ne peut pas dépasser 500 caractères.' }
  }

  const supabase = await createClient()

  const { data: maxRow } = await supabase
    .from('bio_timeline_events')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextOrder = maxRow ? maxRow.sort_order + 10 : 0

  const { error } = await supabase
    .from('bio_timeline_events')
    .insert({ year, description, sort_order: nextOrder })

  if (error) {
    console.error('[createTimelineEvent]:', error.message)
    return { error: 'Erreur lors de la création. Réessaye.' }
  }

  revalidatePath('/biographie')
  revalidatePath('/admin/bio')
  return { ok: true }
}

// ─── updateTimelineEvent ─────────────────────────────────────────────────────

export async function updateTimelineEvent(
  _prev: TimelineActionState,
  formData: FormData
): Promise<TimelineActionState> {
  const id = ((formData.get('id') as string | null) ?? '').trim()
  const year = ((formData.get('year') as string | null) ?? '').trim()
  const description = ((formData.get('description') as string | null) ?? '').trim()

  if (!year || !description) {
    return { error: 'Les champs année et description sont obligatoires.' }
  }
  if (year.length > 20) {
    return { error: "L'année ne peut pas dépasser 20 caractères." }
  }
  if (description.length > 500) {
    return { error: 'La description ne peut pas dépasser 500 caractères.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('bio_timeline_events')
    .update({ year, description })
    .eq('id', id)

  if (error) {
    console.error('[updateTimelineEvent]:', error.message)
    return { error: 'Erreur lors de la mise à jour. Réessaye.' }
  }

  revalidatePath('/biographie')
  revalidatePath('/admin/bio')
  return { ok: true }
}

// ─── deleteTimelineEvent ─────────────────────────────────────────────────────

export async function deleteTimelineEvent(formData: FormData): Promise<{ error?: string }> {
  const id = ((formData.get('id') as string | null) ?? '').trim()

  const supabase = await createClient()

  const { error } = await supabase
    .from('bio_timeline_events')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[deleteTimelineEvent]:', error.message)
    return { error: 'Erreur lors de la suppression. Réessaye.' }
  }

  revalidatePath('/biographie')
  revalidatePath('/admin/bio')
  return {}
}

// ─── reorderTimelineEvents ───────────────────────────────────────────────────

export async function reorderTimelineEvents(
  orderedIds: string[]
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.rpc('reorder_timeline_events', {
    event_ids: orderedIds,
  })

  if (error) {
    console.error('[reorderTimelineEvents]:', error.message)
    return { error: 'Erreur lors du réordonnancement. Réessaye.' }
  }

  revalidatePath('/biographie')
  revalidatePath('/admin/bio')
  return {}
}
