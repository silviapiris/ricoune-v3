'use server'

import { createClient } from '@/lib/supabase/server'

export type AccountActionState = { error?: string; success?: string }

export async function updatePassword(
  _prevState: AccountActionState | undefined,
  formData: FormData
): Promise<AccountActionState> {
  const currentPassword = formData.get('currentPassword')
  const newPassword = formData.get('newPassword')
  const confirmPassword = formData.get('confirmPassword')

  if (
    typeof currentPassword !== 'string' ||
    typeof newPassword !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return { error: 'Tous les champs sont requis.' }
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'Tous les champs sont requis.' }
  }

  if (newPassword !== confirmPassword) {
    return { error: 'Les nouveaux mots de passe ne correspondent pas.' }
  }

  if (newPassword.length < 8) {
    return { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' }
  }

  if (newPassword === currentPassword) {
    return { error: "Le nouveau mot de passe doit être différent de l'ancien." }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return { error: 'Utilisateur non connecté.' }
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })

  if (signInError) {
    return { error: 'Mot de passe actuel incorrect.' }
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })

  if (updateError) {
    console.error('updatePassword:', updateError.message)
    return { error: 'Erreur lors de la mise à jour. Réessaye.' }
  }

  return { success: 'Mot de passe mis à jour avec succès.' }
}
