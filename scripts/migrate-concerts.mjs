/**
 * migrate-concerts.mjs
 * Objectif : migrer les 62 concerts de src/data/concerts.ts vers la table
 *            Supabase `concerts` (production).
 * Usage    : node scripts/migrate-concerts.mjs
 *            node scripts/migrate-concerts.mjs --force  (si table non vide)
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// ─── 1. Lecture de .env.local ────────────────────────────────────────────────

function parseEnvFile(path) {
  const vars = {}
  try {
    const lines = readFileSync(path, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const value = trimmed.slice(eqIdx + 1).trim()
      vars[key] = value
    }
  } catch {
    console.error('[ERROR] Impossible de lire .env.local')
    process.exit(1)
  }
  return vars
}

const env = parseEnvFile('.env.local')

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_KEY  = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL) {
  console.error('[ERROR] NEXT_PUBLIC_SUPABASE_URL absent de .env.local')
  process.exit(1)
}
if (!SERVICE_KEY) {
  console.error('[ERROR] SUPABASE_SERVICE_ROLE_KEY absent de .env.local')
  process.exit(1)
}

console.log('[INFO] Variables d\'environnement chargées.')

// ─── 2. Client Supabase (service_role — bypass RLS) ─────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

// ─── 3. Données concerts (62 entrées, JS pur, sans annotations TypeScript) ──

const CONCERTS = [
  {
    id: 1,
    date: '2026-04-05',
    city: 'Saint Rome de Tarn',
    department: '12',
    postalCode: '12490',
    venue: 'Bar Le Languedoc',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+Le+Languedoc%2C+Saint-Rome-de-Tarn+12490',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 2,
    date: '2026-04-18',
    city: 'Port Saint Louis du Rhône',
    department: '13',
    postalCode: '13230',
    venue: 'Salle Marcel Pagnol',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Salle+Marcel+Pagnol%2C+Port+Saint+Louis+du+Rh%C3%B4ne+13230',
    time: '19:00',
    type: 'solo',
    allAges: true,
    infos_speciales: 'Dress code : rouge et blanc. Réservation obligatoire. Pas de restauration sur place.',
  },
  {
    id: 3,
    date: '2026-05-07',
    city: 'Lattes',
    department: '34',
    postalCode: '34970',
    venue: 'Mas du cheval',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mas+du+Cheval%2C+Lattes+34970',
    time: '23:00',
    type: 'solo',
    allAges: true,
    infos_speciales: 'Entrée libre. Parking limité, covoiturage conseillé.',
  },
  {
    id: 4,
    date: '2026-05-08',
    city: 'Codolet',
    department: '30',
    postalCode: '30200',
    venue: 'Village de Codolet',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Codolet%2C+Codolet+30200',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 5,
    date: '2026-05-25',
    city: 'St Aunès',
    department: '34',
    postalCode: '34130',
    venue: 'Village de St Aunès',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Saint-Aun%C3%A8s%2C+Saint-Aun%C3%A8s+34130',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 6,
    date: '2026-06-05',
    city: 'Galargues',
    department: '34',
    postalCode: '34160',
    venue: 'Village de Galargues',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Galargues%2C+Galargues+34160',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 7,
    date: '2026-06-19',
    city: 'Meynes',
    department: '30',
    postalCode: '30840',
    venue: 'Cave de Pazac',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cave+de+Pazac%2C+Meynes+30840',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 8,
    date: '2026-07-03',
    city: 'Bagnols sur Cèze',
    department: '30',
    postalCode: '30200',
    venue: 'Parc Rimbaud',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parc+Rimbaud%2C+Bagnols-sur-C%C3%A8ze+30200',
    time: '21:00',
    type: 'groupe',
    allAges: true,
  },
  {
    id: 61,
    date: '2026-07-04',
    city: 'Saint Andiol',
    department: '13',
    postalCode: '13670',
    venue: 'O Central Bar',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=O+Central+Bar+45+Route+Nationale+7+13670+Saint-Andiol',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 9,
    date: '2026-07-12',
    city: 'Aniane',
    department: '34',
    postalCode: '34150',
    venue: 'Village de Aniane',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+d%27Aniane%2C+Aniane+34150',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 10,
    date: '2026-07-17',
    city: 'Adissan',
    department: '34',
    postalCode: '34230',
    venue: 'Village de Adissan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+d%27Adissan%2C+Adissan+34230',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 11,
    date: '2026-07-19',
    city: 'Port Saint Louis du Rhône',
    department: '13',
    postalCode: '13230',
    venue: 'Village',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Port+Saint+Louis+du+Rh%C3%B4ne+13230',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 12,
    date: '2026-07-31',
    city: 'Albepierre Bredons',
    department: '15',
    postalCode: '15300',
    venue: 'Village d’Albepierre Bredons',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+d%27Albepierre-Bredons%2C+15300',
    time: '21:00',
    type: 'groupe',
    allAges: true,
  },
  {
    id: 13,
    date: '2026-08-09',
    city: 'Mauguio',
    department: '34',
    postalCode: '34130',
    venue: 'Café du Midi',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+du+Midi%2C+Mauguio+34130',
    time: '12:00',
    type: 'groupe',
    allAges: true,
  },
  {
    id: 14,
    date: '2026-08-12',
    city: 'Béziers',
    department: '34',
    postalCode: '34500',
    venue: 'Féria de Béziers',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=F%C3%A9ria+de+B%C3%A9ziers%2C+B%C3%A9ziers+34500',
    time: '23:00',
    type: 'groupe',
    allAges: true,
  },
  {
    id: 15,
    date: '2026-08-14',
    city: 'La Garde Albaret St Marie',
    department: '48',
    postalCode: '48200',
    venue: 'Village de La Garde',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+La+Garde%2C+La+Garde+48200',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 16,
    date: '2026-08-15',
    city: 'Béziers',
    department: '34',
    postalCode: '34500',
    venue: 'Féria de Béziers',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=F%C3%A9ria+de+B%C3%A9ziers%2C+B%C3%A9ziers+34500',
    time: '23:00',
    type: 'groupe',
    allAges: true,
  },
  {
    id: 17,
    date: '2026-08-16',
    city: 'Béziers',
    department: '34',
    postalCode: '34500',
    venue: 'Arènes de Béziers - Concert 200 musiciens',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ar%C3%A8nes+de+B%C3%A9ziers%2C+B%C3%A9ziers+34500',
    time: '21:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 18,
    date: '2026-08-23',
    city: 'Villevieille',
    department: '30',
    postalCode: '30250',
    venue: 'Village de Villevieille',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Villevieille%2C+30250',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 19,
    date: '2026-08-23',
    city: 'Saint Quentin La Poterie',
    department: '30',
    postalCode: '30700',
    venue: 'Village',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saint-Quentin-la-Poterie+30700',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 20,
    date: '2026-04-16',
    city: 'Lattes',
    department: '34',
    postalCode: '34970',
    venue: 'Mas du cheval-Pozzo Féria',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mas+du+cheval+Pozzo+F%C3%A9ria%2C+Lattes+34970',
    time: '23:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 21,
    date: '2026-04-24',
    city: 'Marseille',
    department: '13',
    postalCode: '13000',
    venue: 'Florida Palace-BDE Polytech Marseille',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Florida+Palace+BDE+Polytech+Marseille%2C+Marseille+13000',
    time: '23:00',
    type: 'solo',
    allAges: true,
    cancelled: true,
  },
  {
    id: 22,
    date: '2026-05-07',
    city: 'Palavas les Flots',
    department: '34',
    postalCode: '34250',
    venue: 'Féria de Palavas',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=F%C3%A9ria+de+Palavas%2C+Palavas-les-Flots+34250',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 23,
    date: '2026-05-16',
    city: 'Saint-Drézéry',
    department: '34',
    postalCode: '34160',
    venue: 'Stade de Saint Drézéry',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Stade+de+Saint+Dr%C3%A9z%C3%A9ry%2C+Saint-Dr%C3%A9z%C3%A9ry+34160',
    time: '13:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 24,
    date: '2026-05-16',
    city: 'Gignac',
    department: '34',
    postalCode: '34150',
    venue: 'Ville de Gignac',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ville+de+Gignac%2C+Gignac+34150',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 25,
    date: '2026-05-17',
    city: 'Aigues Vives',
    department: '30',
    postalCode: '30670',
    venue: 'Bar des Arènes',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+des+Ar%C3%A8nes%2C+Aigues-Vives+30670',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 26,
    date: '2026-05-23',
    city: "Saint Chely d’Apcher",
    department: '48',
    postalCode: '48200',
    venue: "Village de Saint Chely d’Apcher",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Village+de+Saint+Chely+d%27Apcher%2C+Saint-Ch%C3%A9ly-d%27Apcher+48200",
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 27,
    date: '2026-05-24',
    city: 'Saint-Paulet de Caisson',
    department: '30',
    postalCode: '30130',
    venue: 'Village de Saint-Paulet de Caisson',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Saint-Paulet-de-Caisson%2C+Saint-Paulet-de-Caisson+30130',
    time: '13:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 28,
    date: '2026-05-30',
    city: 'Les Plans',
    department: '30',
    postalCode: '30340',
    venue: 'Manade du Mazet-Les Plans',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Manade+du+Mazet%2C+Les+Plans+30340',
    time: '13:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 29,
    date: '2026-05-30',
    city: 'Nîmes',
    department: '30',
    postalCode: '30000',
    venue: 'Quartier Russan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Quartier+Russan%2C+N%C3%AEmes+30000',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 30,
    date: '2026-06-06',
    city: 'Orsan',
    department: '30',
    postalCode: '30200',
    venue: 'Village de Orsan',
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Village+d%27Orsan%2C+Orsan+30200",
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 31,
    date: '2026-06-07',
    city: 'Mauguio',
    department: '34',
    postalCode: '34130',
    venue: 'Bar le Mistral',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+le+Mistral%2C+Mauguio+34130',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 59,
    date: '2026-06-12',
    city: 'Mauléon',
    department: '79',
    postalCode: '79700',
    venue: 'Festival du Canon Français',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Festival+du+Canon+Fran%C3%A7ais+Maul%C3%A9on+79700',
    time: '21:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 60,
    date: '2026-06-13',
    city: 'Mauléon',
    department: '79',
    postalCode: '79700',
    venue: 'Festival du Canon Français',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Festival+du+Canon+Fran%C3%A7ais+Maul%C3%A9on+79700',
    time: '21:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 32,
    date: '2026-06-20',
    city: 'Mondragon',
    department: '84',
    postalCode: '84430',
    venue: 'Bar le Provence',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+le+Provence%2C+Mondragon+84430',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 33,
    date: '2026-06-21',
    city: 'Vias Plage',
    department: '34',
    postalCode: '34450',
    venue: 'La guinguette des amis',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+guinguette+des+amis%2C+Vias+Plage+34450',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 34,
    date: '2026-06-28',
    city: 'Chanac',
    department: '48',
    postalCode: '48230',
    venue: 'Ville de Chanac',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ville+de+Chanac%2C+Chanac+48230',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 35,
    date: '2026-07-05',
    city: 'Méjannes lès Alès',
    department: '30',
    postalCode: '30340',
    venue: 'Village de Méjannes lès Alès',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+M%C3%A9jannes-l%C3%A8s-Al%C3%A8s%2C+30340',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 36,
    date: '2026-07-13',
    city: 'Gigean',
    department: '34',
    postalCode: '34770',
    venue: 'Bal des pompiers de Gigean',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bal+des+pompiers+de+Gigean%2C+Gigean+34770',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 37,
    date: '2026-07-16',
    city: 'Palavas les Flots',
    department: '34',
    postalCode: '34250',
    venue: 'Camping Montpellier Plage',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Camping+Montpellier+Plage%2C+Palavas-les-Flots+34250',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 38,
    date: '2026-07-18',
    city: 'Deaux',
    department: '30',
    postalCode: '30360',
    venue: 'Deaux',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Deaux+30360',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 39,
    date: '2026-07-21',
    city: 'Vendargues',
    department: '34',
    postalCode: '34740',
    venue: 'Brasserie des sports',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Brasserie+des+sports%2C+Vendargues+34740',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 40,
    date: '2026-07-25',
    city: "Saint Michel d’Euzet",
    department: '30',
    postalCode: '30200',
    venue: "Village de Saint Michel d’Euzet",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Village+de+Saint-Michel-d%27Euzet%2C+30200",
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 41,
    date: '2026-07-25',
    city: 'Notre Dame de Londres',
    department: '34',
    postalCode: '34380',
    venue: 'Village de Notre Dame de Londres',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Notre-Dame-de-Londres%2C+34380',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 42,
    date: '2026-07-26',
    city: 'Milhaud',
    department: '30',
    postalCode: '30540',
    venue: 'Ville de Milhaud',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ville+de+Milhaud%2C+Milhaud+30540',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 43,
    date: '2026-07-26',
    city: 'Séguret',
    department: '84',
    postalCode: '84110',
    venue: 'Village de Séguret',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+S%C3%A9guret%2C+84110',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 44,
    date: '2026-07-27',
    city: 'Les Mages',
    department: '30',
    postalCode: '30960',
    venue: 'Café de la poste',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+de+la+Poste%2C+Les+Mages+30960',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 45,
    date: '2026-07-29',
    city: 'Cournonterral',
    department: '34',
    postalCode: '34660',
    venue: 'Master tambourin',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Master+Tambourin%2C+Cournonterral+34660',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 46,
    date: '2026-08-01',
    city: 'Boyne',
    department: '12',
    postalCode: '12400',
    venue: 'Village de Boyne',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Boyne%2C+12400',
    time: '20:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 47,
    date: '2026-08-02',
    city: 'Sommières',
    department: '30',
    postalCode: '30250',
    venue: "L’Esplanade",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=L%27Esplanade%2C+Sommi%C3%A8res+30250",
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 48,
    date: '2026-08-04',
    city: 'Castries',
    department: '34',
    postalCode: '34160',
    venue: 'Café de la paix',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+de+la+Paix%2C+Castries+34160',
    time: '12:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 49,
    date: '2026-08-07',
    city: "L’Estrèchure",
    department: '30',
    postalCode: '30140',
    venue: "Village de l’Estrèchure",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Village+de+l%27Estr%C3%A9chure%2C+30140",
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 50,
    date: '2026-08-08',
    city: 'Boisseron',
    department: '34',
    postalCode: '34160',
    venue: 'Village de Boisseron',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Boisseron%2C+34160',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 51,
    date: '2026-08-13',
    city: 'Palavas les Flots',
    department: '34',
    postalCode: '34250',
    venue: 'Camping Montpellier Plage',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Camping+Montpellier+Plage%2C+Palavas-les-Flots+34250',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 52,
    date: '2026-08-21',
    city: 'Saint Jean de Maruéjols',
    department: '30',
    postalCode: '30430',
    venue: 'Village de Saint Jean de Maruéjols',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Saint-Jean-de-Maru%C3%A9jols%2C+30430',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 53,
    date: '2026-08-22',
    city: 'Logrian',
    department: '30',
    postalCode: '30610',
    venue: 'Village de Logrian',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+de+Logrian%2C+30610',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 54,
    date: '2026-08-30',
    city: 'Restinclières',
    department: '34',
    postalCode: '34160',
    venue: 'Ville de Restinclières',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ville+de+Restincli%C3%A8res%2C+34160',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 55,
    date: '2026-09-05',
    city: 'Blandas',
    department: '30',
    postalCode: '30120',
    venue: 'Restaurant Les Belvédères de Blandas',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurant+Les+Belv%C3%A9d%C3%A8res+de+Blandas%2C+Blandas+30120',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 56,
    date: '2026-09-06',
    city: 'Alba la Romaine',
    department: '07',
    postalCode: '07400',
    venue: "Village d’Alba la Romaine",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Village+d%27Alba-la-Romaine%2C+07400",
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 57,
    date: '2026-09-12',
    city: 'La Garnache',
    department: '85',
    postalCode: '85710',
    venue: 'La Dinguette',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Dinguette%2C+La+Garnache+85710',
    time: '21:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 62,
    date: '2026-09-19',
    city: 'Montfrin',
    department: '30',
    postalCode: '30490',
    venue: 'Arènes de Montfrin',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ar%C3%A8nes+de+Montfrin+Cours+Bouchard+30490+Montfrin',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
  {
    id: 58,
    date: '2026-07-24',
    city: 'Cers',
    department: '34',
    postalCode: '34420',
    venue: 'Ville de Cers',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ville+de+Cers%2C+Cers+34420',
    time: '19:00',
    type: 'solo',
    allAges: true,
  },
]

// ─── 4. Mapping camelCase TS → snake_case Supabase ───────────────────────────

function toSupabaseRow(c) {
  return {
    date:              c.date,
    city:              c.city,
    department:        c.department        ?? null,
    postal_code:       c.postalCode        ?? null,
    venue:             c.venue,
    maps_url:          c.mapsUrl           ?? null,
    time:              c.time,
    type:              c.type,
    all_ages:          c.allAges           ?? true,
    infos_speciales:   c.infos_speciales   ?? null,
    cancelled:         c.cancelled         ?? false,
    cancellation_note: c.cancellationNote  ?? null,
  }
}

// ─── 5. main() ───────────────────────────────────────────────────────────────

async function main() {
  const force = process.argv.includes('--force')

  // Guard anti-doublon
  const { count, error: countError } = await supabase
    .from('concerts')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    console.error('[ERROR] Impossible de vérifier la table concerts:', countError.message)
    process.exit(1)
  }

  if (count > 0 && !force) {
    console.warn(`[WARN] ${count} ligne(s) déjà présente(s) dans la table concerts.`)
    console.warn('[WARN] Abandon. Relancer avec --force pour écraser.')
    process.exit(0)
  }

  if (count > 0 && force) {
    console.warn(`[WARN] --force actif : ${count} ligne(s) existantes ignorées, insertion en cours...`)
  }

  // Mapping
  const rows = CONCERTS.map(toSupabaseRow)
  console.log(`[INFO] ${rows.length} concerts préparés pour insertion.`)

  // Insert batch
  const { data, error } = await supabase
    .from('concerts')
    .insert(rows)
    .select()

  if (error) {
    console.error('[ERROR] Échec de l\'insertion Supabase :')
    console.error('  message :', error.message)
    if (error.details) console.error('  details :', error.details)
    if (error.hint)    console.error('  hint    :', error.hint)
    process.exit(1)
  }

  console.log(`[OK] ${data.length} concerts insérés avec succès dans Supabase.`)
}

main().catch(err => {
  console.error('[ERROR] Erreur inattendue :', err.message)
  process.exit(1)
})
