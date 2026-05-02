import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

// 1. Charger les credentials depuis .env.local
const env = readFileSync('.env.local', 'utf8')
const get = (k) => env.match(new RegExp('^' + k + '=(.+)$', 'm'))?.[1]?.trim()
const SUPABASE_URL = get('NEXT_PUBLIC_SUPABASE_URL')
const SERVICE_KEY = get('SUPABASE_SERVICE_ROLE_KEY')

// 2. Lister les photos a migrer (38 au total)
const PHOTOS_DIR = 'public/images/photos'
const allFiles = readdirSync(PHOTOS_DIR).sort()
const filesToMigrate = allFiles.filter(f =>
  // Exclure photos-0X.webp (orphelins, supprimes en parallele)
  !f.match(/^photos-0[1-5]\.webp$/)
)

console.log(`${filesToMigrate.length} photos a migrer`)

// 3. Verifier que c'est bien 38
if (filesToMigrate.length !== 38) {
  console.error(`ATTENTION : attendu 38 fichiers, trouve ${filesToMigrate.length}`)
  console.error('Liste :', filesToMigrate)
  process.exit(1)
}

// 4. Pour chaque photo : upload Storage + INSERT DB
let uploaded = 0
let failed = 0
const errors = []

for (let i = 0; i < filesToMigrate.length; i++) {
  const filename = filesToMigrate[i]
  const sortOrder = i * 10  // 0, 10, 20, 30, ...
  const filepath = join(PHOTOS_DIR, filename)
  const fileBuffer = readFileSync(filepath)

  // Determiner Content-Type
  const ext = filename.split('.').pop().toLowerCase()
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
                    : ext === 'png' ? 'image/png'
                    : ext === 'webp' ? 'image/webp'
                    : 'application/octet-stream'

  // Upload Storage
  const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/photos/${filename}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': contentType,
    },
    body: fileBuffer,
  })

  if (!uploadRes.ok) {
    const errorText = await uploadRes.text()
    errors.push(`${filename} : upload failed - ${errorText}`)
    failed++
    console.log(`FAIL ${filename}`)
    continue
  }

  // INSERT DB
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/photos`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      storage_path: filename,
      alt_text: null,
      caption: null,
      sort_order: sortOrder,
      size_bytes: fileBuffer.length,
    }),
  })

  if (!insertRes.ok) {
    const errorText = await insertRes.text()
    errors.push(`${filename} : DB insert failed - ${errorText}`)
    // Rollback : supprimer le fichier Storage qu'on vient d'uploader
    await fetch(`${SUPABASE_URL}/storage/v1/object/photos/${filename}`, {
      method: 'DELETE',
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    })
    failed++
    console.log(`FAIL ${filename} (rollback)`)
    continue
  }

  uploaded++
  console.log(`OK ${filename} (sort_order=${sortOrder})`)
}

console.log('\n' + '='.repeat(50))
console.log(`Uploaded : ${uploaded}/${filesToMigrate.length}`)
console.log(`Failed : ${failed}`)
if (errors.length > 0) {
  console.log('\nErreurs :')
  errors.forEach(e => console.log('  -', e))
}
