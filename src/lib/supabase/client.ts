import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase pour les composants navigateur ("use client").
 * Appeler createClient() dans chaque composant client qui en a besoin.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
