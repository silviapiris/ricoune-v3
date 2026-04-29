import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Helper de middleware : rafraîchit la session Supabase à chaque requête.
 * À appeler depuis src/middleware.ts pour maintenir les tokens d'auth à jour.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Propagation des cookies dans la requête et la réponse
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Ne pas ajouter de logique entre createServerClient et getUser()
  // pour éviter de rendre les tokens de session inutilisables.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protection des routes /admin/*
  // Exception : /admin/login est accessible sans authentification
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
