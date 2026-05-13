import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Callback Supabase pour les flows email (reset password, magic link).
 * Reçoit `?code=...` après clic sur le lien de l'email, l'echange contre
 * une session puis redirige vers la page de saisie du nouveau mot de passe.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/admin/login?error=invalid_link', request.url),
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchangeCodeForSession failed:', error.message)
    return NextResponse.redirect(
      new URL('/admin/login?error=expired_link', request.url),
    )
  }

  return NextResponse.redirect(new URL('/admin/reset-password', request.url))
}
