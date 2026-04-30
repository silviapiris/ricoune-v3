'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Concert = {
  id: string
  date: string
  city: string
  department: string | null
  postal_code: string | null
  venue: string
  maps_url: string | null
  time: string
  type: 'solo' | 'groupe'
  all_ages: boolean
  infos_speciales: string | null
  cancelled: boolean
  cancellation_note: string | null
  created_at: string
}

export type ConcertActionState = { error?: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (typeof val !== 'string' || val.trim() === '') return null
  return val.trim()
}

function isConcertType(val: string | null): val is 'solo' | 'groupe' {
  return val === 'solo' || val === 'groupe'
}

// ─── getConcerts ──────────────────────────────────────────────────────────────

export async function getConcerts(): Promise<{
  upcoming: Concert[]
  past: Concert[]
}> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const [{ data: upcoming, error: errUp }, { data: past, error: errPast }] =
    await Promise.all([
      supabase
        .from('concerts')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true }),
      supabase
        .from('concerts')
        .select('*')
        .lt('date', today)
        .order('date', { ascending: false }),
    ])

  if (errUp) console.error('[getConcerts] upcoming:', errUp)
  if (errPast) console.error('[getConcerts] past:', errPast)

  return {
    upcoming: (upcoming ?? []) as Concert[],
    past: (past ?? []) as Concert[],
  }
}

// ─── getConcertById ───────────────────────────────────────────────────────────

export async function getConcertById(id: string): Promise<Concert | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getConcertById]:', error)
    return null
  }

  return data as Concert
}

// ─── createConcert ────────────────────────────────────────────────────────────

export async function createConcert(
  _prevState: ConcertActionState | undefined,
  formData: FormData
): Promise<ConcertActionState> {
  const date = getString(formData, 'date')
  const city = getString(formData, 'city')
  const venue = getString(formData, 'venue')
  const time = getString(formData, 'time')
  const type = getString(formData, 'type')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return { error: 'La date est requise au format AAAA-MM-JJ.' }
  if (!city) return { error: 'La ville est requise.' }
  if (!venue) return { error: 'Le lieu est requis.' }
  if (!time) return { error: "L'heure est requise." }
  if (!isConcertType(type))
    return { error: "Le type doit être 'solo' ou 'groupe'." }

  const supabase = await createClient()

  const { error } = await supabase.from('concerts').insert({
    date,
    city,
    department: getString(formData, 'department'),
    postal_code: getString(formData, 'postal_code'),
    venue,
    maps_url: getString(formData, 'maps_url'),
    time,
    type,
    all_ages: formData.get('all_ages') === 'on',
    infos_speciales: getString(formData, 'infos_speciales'),
    cancelled: formData.get('cancelled') === 'on',
    cancellation_note: getString(formData, 'cancellation_note'),
  })

  if (error) {
    console.error('[createConcert]:', error)
    return { error: 'Erreur lors de la création du concert. Réessaye.' }
  }

  revalidatePath('/admin/concerts')
  redirect('/admin/concerts')
}

// ─── updateConcert ────────────────────────────────────────────────────────────

export async function updateConcert(
  id: string,
  _prevState: ConcertActionState | undefined,
  formData: FormData
): Promise<ConcertActionState> {
  const date = getString(formData, 'date')
  const city = getString(formData, 'city')
  const venue = getString(formData, 'venue')
  const time = getString(formData, 'time')
  const type = getString(formData, 'type')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return { error: 'La date est requise au format AAAA-MM-JJ.' }
  if (!city) return { error: 'La ville est requise.' }
  if (!venue) return { error: 'Le lieu est requis.' }
  if (!time) return { error: "L'heure est requise." }
  if (!isConcertType(type))
    return { error: "Le type doit être 'solo' ou 'groupe'." }

  const supabase = await createClient()

  const { error } = await supabase
    .from('concerts')
    .update({
      date,
      city,
      department: getString(formData, 'department'),
      postal_code: getString(formData, 'postal_code'),
      venue,
      maps_url: getString(formData, 'maps_url'),
      time,
      type,
      all_ages: formData.get('all_ages') === 'on',
      infos_speciales: getString(formData, 'infos_speciales'),
      cancelled: formData.get('cancelled') === 'on',
      cancellation_note: getString(formData, 'cancellation_note'),
    })
    .eq('id', id)

  if (error) {
    console.error('[updateConcert]:', error)
    return { error: 'Erreur lors de la mise à jour du concert. Réessaye.' }
  }

  revalidatePath('/admin/concerts')
  redirect('/admin/concerts')
}

// ─── deleteConcert ────────────────────────────────────────────────────────────

export async function deleteConcert(id: string): Promise<ConcertActionState> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('concerts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[deleteConcert]:', error)
    return { error: 'Erreur lors de la suppression du concert. Réessaye.' }
  }

  revalidatePath('/admin/concerts')
  return {}
}
