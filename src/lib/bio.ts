import 'server-only'

import { createClient } from '@/lib/supabase/server'

export interface BioContent {
  id: string
  singleton: boolean
  updated_at: string
  hero_subtitle: string | null
  hero_image_url: string | null
  quote_text: string | null
  history_title: string | null
  history_paragraph_1: string | null
  history_paragraph_2: string | null
  portrait_image_url: string | null
  portrait_alt: string | null
  timeline_title: string | null
  strip_label: string | null
  strip_title: string | null
  strip_photo_1_url: string | null
  strip_photo_2_url: string | null
  strip_photo_3_url: string | null
  strip_cta_label: string | null
  philosophy_text: string | null
  cta_text: string | null
  cta_button_1_label: string | null
  cta_button_2_label: string | null
}

export interface BioTimelineEvent {
  id: string
  year: string
  description: string
  sort_order: number
}

export async function getBioContent(): Promise<BioContent | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('bio_content')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[getBioContent]:', error.message)
    return null
  }

  return data as BioContent | null
}

export async function getBioTimeline(): Promise<BioTimelineEvent[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('bio_timeline_events')
    .select('id, year, description, sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[getBioTimeline]:', error.message)
    return []
  }

  return (data ?? []) as BioTimelineEvent[]
}
