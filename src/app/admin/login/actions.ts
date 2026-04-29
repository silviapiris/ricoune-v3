'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type SignInState = {
  error?: string
}

export async function signIn(
  _prevState: SignInState | undefined,
  formData: FormData
): Promise<SignInState> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Champs invalides.' }
  }

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email ou mot de passe incorrect.' }
  }

  redirect('/admin')
}
