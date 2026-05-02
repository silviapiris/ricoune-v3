import { readFileSync } from 'fs'

const env = readFileSync('.env.local', 'utf8')
const get = (k) => env.match(new RegExp('^' + k + '=(.+)$', 'm'))?.[1]?.trim()
const SUPABASE_URL = get('NEXT_PUBLIC_SUPABASE_URL')
const SERVICE_KEY = get('SUPABASE_SERVICE_ROLE_KEY')

const POSITION_MAP = {
  'ricoune2.webp':            'object-[center_35%]',
  '3O8A5428-786x1000.jpg':    'object-top',
  '3O8A8715-667x1000.jpg':    'object-top',
  '3O8A5562-664x1000.jpg':    'object-top',
  '3O8A8974-721x1000.jpg':    'object-top',
  '3O8A8725-800x962.jpg':     'object-top',
  '3O8A8722-800x968.jpg':     'object-top',
}

let success = 0, failed = 0
for (const [filename, position] of Object.entries(POSITION_MAP)) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/photos?storage_path=eq.${encodeURIComponent(filename)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ css_position: position }),
    }
  )
  if (res.ok) {
    console.log(`OK ${filename} -> ${position}`)
    success++
  } else {
    console.log(`FAIL ${filename} (${res.status})`)
    failed++
  }
}
console.log(`\n${success}/${Object.keys(POSITION_MAP).length} updated, ${failed} failed`)
