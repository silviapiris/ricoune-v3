import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  // 1. Authentification admin Supabase
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // 2. Parser et valider les parametres URL
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') ?? '30d'
  const metric = searchParams.get('metric') ?? 'overview'

  const validPeriods = ['7d', '30d', '90d', '365d'] as const
  const validMetrics = [
    'overview',
    'pageviews',
    'pages',
    'referrers',
    'countries',
    'cities',
    'devices',
    'os',
    'browsers',
  ] as const

  if (!validPeriods.includes(period as typeof validPeriods[number])) {
    return NextResponse.json(
      { error: 'Invalid period parameter' },
      { status: 400 }
    )
  }

  if (!validMetrics.includes(metric as typeof validMetrics[number])) {
    return NextResponse.json(
      { error: 'Invalid metric parameter' },
      { status: 400 }
    )
  }

  // Calculer startAt / endAt selon period (timestamps en ms)
  const now = Date.now()
  const periodMs = {
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
    '90d': 90 * 24 * 60 * 60 * 1000,
    '365d': 365 * 24 * 60 * 60 * 1000,
  }
  const startAt = now - periodMs[period as keyof typeof periodMs]
  const endAt = now

  // 3. Construire l'URL Umami selon le metric demande
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const apiKey = process.env.UMAMI_API_KEY
  const apiEndpoint = process.env.UMAMI_API_ENDPOINT

  if (!websiteId || !apiKey || !apiEndpoint) {
    return NextResponse.json(
      { error: 'Analytics service not configured' },
      { status: 503 }
    )
  }

  let umamiPath: string
  const baseParams = `startAt=${startAt}&endAt=${endAt}`

  switch (metric) {
    case 'overview':
      umamiPath = `/websites/${websiteId}/stats?${baseParams}`
      break
    case 'pageviews':
      umamiPath = `/websites/${websiteId}/pageviews?${baseParams}&unit=day&timezone=Europe/Paris`
      break
    case 'pages':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=url&limit=10`
      break
    case 'referrers':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=referrer&limit=10`
      break
    case 'countries':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=country&limit=10`
      break
    case 'cities':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=city&limit=10`
      break
    case 'devices':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=device&limit=10`
      break
    case 'os':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=os&limit=10`
      break
    case 'browsers':
      umamiPath = `/websites/${websiteId}/metrics?${baseParams}&type=browser&limit=10`
      break
    default:
      // Type guard: impossible normalement grace a la validation
      // precedente, mais pour la safety TypeScript
      return NextResponse.json(
        { error: 'Invalid metric' },
        { status: 400 }
      )
  }

  // 4. Appel a l'API Umami
  try {
    const umamiResponse = await fetch(`${apiEndpoint}${umamiPath}`, {
      headers: {
        'x-umami-api-key': apiKey,
        'Accept': 'application/json',
      },
      // Cache cote Next.js (revalidate toutes les 5 min)
      next: { revalidate: 300 },
    })

    if (!umamiResponse.ok) {
      // Erreur cote Umami : ne pas leak les details
      console.error('[analytics] Umami API error:', umamiResponse.status)
      return NextResponse.json(
        { error: 'Analytics service error' },
        { status: 502 }
      )
    }

    const data = await umamiResponse.json()

    return NextResponse.json(
      { period, metric, data },
      {
        status: 200,
        headers: {
          'Cache-Control': 'private, max-age=300, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('[analytics] Fetch failed:', error)
    return NextResponse.json(
      { error: 'Analytics service unavailable' },
      { status: 503 }
    )
  }
}
