'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UpdatePasswordResult = { error: string }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const OTP_REGEX = /^\d{6}$/

/**
 * Server action appelée par la page /admin/reset-password.
 * Mode OTP : vérifie le code à 6 chiffres reçu par email, puis met à jour
 * le mot de passe, puis force la déconnexion pour que l'utilisateur se
 * reconnecte avec son nouveau mot de passe.
 * En cas de succès, redirige vers /admin/login?password_updated=1.
 */
export async function updatePasswordAction(
  formData: FormData,
): Promise<UpdatePasswordResult | void> {
  const email = formData.get('email')
  const otpCode = formData.get('otpCode')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (
    typeof email !== 'string' ||
    typeof otpCode !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return { error: 'Champs invalides.' }
  }

  if (!email || !otpCode || !password || !confirmPassword) {
    return { error: 'Tous les champs sont requis.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Adresse email invalide.' }
  }

  if (!OTP_REGEX.test(otpCode)) {
    return { error: 'Le code de vérification doit contenir exactement 6 chiffres.' }
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

  const { error: otpError } = await supabase.auth.verifyOtp({
    email,
    token: otpCode,
    type: 'recovery',
  })

  if (otpError) {
    console.error('[updatePasswordAction] verifyOtp failed:', otpError.message)
    return { error: 'Code invalide ou expiré. Demandez un nouveau code.' }
  }

  const { error: updateError } = await supabase.auth.updateUser({ password })

  if (updateError) {
    console.error('[updatePasswordAction] updateUser failed:', updateError.message)
    return { error: 'Erreur lors de la mise a jour du mot de passe. Reessaye.' }
  }

  await supabase.auth.signOut()

  redirect('/admin/login?password_updated=1')
}
