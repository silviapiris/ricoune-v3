'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UpdatePasswordResult = { error: string }

/**
 * Server action appelée par la page /admin/reset-password.
 * Valide le mot de passe puis met à jour la session Supabase en cours.
 * En cas de succès, redirige vers /admin?password_updated=1.
 */
export async function updatePasswordAction(
  formData: FormData,
): Promise<UpdatePasswordResult | void> {
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
    return { error: 'Champs invalides.' }
  }

  if (!password || !confirmPassword) {
    return { error: 'Tous les champs sont requis.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Les deux mots de passe ne correspondent pas.' }
  }

  if (password.length < 12) {
    return { error: 'Le mot de passe doit contenir au moins 12 caractères.' }
  }

  if (!/[A-Z]/.test(password)) {
    return { error: 'Le mot de passe doit contenir au moins une majuscule.' }
  }

  if (!/[a-z]/.test(password)) {
    return { error: 'Le mot de passe doit contenir au moins une minuscule.' }
  }

  if (!/[0-9]/.test(password)) {
    return { error: 'Le mot de passe doit contenir au moins un chiffre.' }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return { error: 'Le mot de passe doit contenir au moins un caractere special.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    console.error('[updatePasswordAction] updateUser failed:', error.message)
    return { error: 'Erreur lors de la mise a jour du mot de passe. Reessaye.' }
  }

  redirect('/admin?password_updated=1')
}
