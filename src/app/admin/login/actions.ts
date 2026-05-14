'use server'

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
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
  const captchaToken = formData.get('cf-turnstile-response')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Champs invalides.' }
  }

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' }
  }

  if (typeof captchaToken !== 'string' || !captchaToken) {
    return { error: 'Veuillez compléter le CAPTCHA.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken,
    },
  })

  if (error) {
    return { error: 'Email ou mot de passe incorrect.' }
  }

  redirect('/admin')
}

// ============================================================================
// Reset password : envoi du lien Supabase par email
// ============================================================================

const passwordResetLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: false,
  prefix: 'rl:password-reset',
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SendPasswordResetResult = {
  success: true
  message: string
}

/**
 * Envoie l'email de réinitialisation Supabase à l'adresse fournie.
 * Sécurité : retourne TOUJOURS la même réponse générique, peu importe que
 * l'email existe en base ou non, qu'il soit mal formé, ou que Supabase
 * échoue. Les erreurs techniques sont seulement loggées côté serveur.
 */
export async function sendPasswordResetAction(
  _prevState: SendPasswordResetResult | undefined,
  formData: FormData,
): Promise<SendPasswordResetResult> {
  const genericResponse: SendPasswordResetResult = {
    success: true,
    message:
      'Si cet email est associé à un compte, un lien de réinitialisation a été envoyé.',
  }

  const emailRaw = formData.get('email')
  if (typeof emailRaw !== 'string') {
    return genericResponse
  }

  const email = emailRaw.trim().toLowerCase()
  if (!email || !EMAIL_REGEX.test(email)) {
    return genericResponse
  }

  const captchaToken = formData.get('cf-turnstile-response')
  if (typeof captchaToken !== 'string' || !captchaToken) {
    return genericResponse
  }

  // Rate limit par email (fail-open si Upstash indisponible)
  try {
    const { success } = await passwordResetLimiter.limit(email)
    if (!success) {
      console.warn('[sendPasswordResetAction] rate limit hit')
      return genericResponse
    }
  } catch (rlError) {
    console.error('[sendPasswordResetAction] rate limiter unavailable:', rlError)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://ricoune.com/auth/callback',
    captchaToken,
  })

  if (error) {
    console.error('[sendPasswordResetAction] resetPasswordForEmail failed:', error.message)
  }

  return genericResponse
}
