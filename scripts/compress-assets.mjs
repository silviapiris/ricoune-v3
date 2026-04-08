/**
 * Script de compression des assets CDC Ricoune V2
 * Compresse les images sources (jusqu'a 18MB) en WebP optimise pour le web
 * Usage: node scripts/compress-assets.mjs
 */
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const SRC_BASE = resolve(ROOT, 'site pour Kévin', 'écoute et visus');
const VISU_BASE = resolve(ROOT, 'site pour Kévin', 'visu site');
const PRO_BASE = resolve(ROOT, 'site pour Kévin', 'écoute et visus', '5 professionnel');
const PUBLIC = resolve(ROOT, 'public');

/** @param {string} src @param {string} dest @param {{ width?: number, quality?: number }} opts */
async function compressImage(src, dest, opts = {}) {
  const { width = 1920, quality = 82 } = opts;
  const ext = dest.split('.').pop();

  try {
    let pipeline = sharp(src).rotate(); // auto-rotate EXIF

    // Resize if wider than max
    const meta = await sharp(src).metadata();
    if (meta.width && meta.width > width) {
      pipeline = pipeline.resize({ width, withoutEnlargement: true });
    }

    if (ext === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (ext === 'jpg' || ext === 'jpeg') {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    } else if (ext === 'png') {
      pipeline = pipeline.png({ quality: Math.min(quality, 80), compressionLevel: 9 });
    }

    await pipeline.toFile(dest);
    const srcSize = (await sharp(src).metadata()).size || 0;
    const destMeta = await sharp(dest).metadata();
    console.log(`  OK: ${dest.replace(PUBLIC, 'public')} (${destMeta.width}x${destMeta.height})`);
  } catch (err) {
    console.error(`  FAIL: ${src} -> ${err.message}`);
  }
}

/** @param {string} src @param {string} dest @param {{ width?: number, quality?: number }} opts */
async function compressToWebp(src, dest, opts = {}) {
  const webpDest = dest.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, '.webp');
  await compressImage(src, webpDest, { ...opts, quality: opts.quality || 82 });
}

async function main() {
  console.log('=== Compression des assets Ricoune V2 ===\n');

  // 1. Hero
  console.log('-- Hero --');
  await compressToWebp(
    join(SRC_BASE, '1 page d\'accueil', 'home_concert_scene.JPG'),
    join(PUBLIC, 'images/hero/home-concert-scene.webp'),
    { width: 1920, quality: 80 }
  );

  // 2. Bio
  console.log('-- Bio --');
  await compressToWebp(
    join(SRC_BASE, '2 biographie', 'bio_hero.jpg.jpg'),
    join(PUBLIC, 'images/bio/bio-hero.webp'),
    { width: 1920, quality: 80 }
  );
  await compressToWebp(
    join(SRC_BASE, '1 page d\'accueil', 'home_bio_portrait.png'),
    join(PUBLIC, 'images/bio/home-bio-portrait.webp'),
    { width: 800, quality: 85 }
  );

  // 3. Albums
  console.log('-- Albums --');
  const albumFiles = [
    ['album_quand_un_faineant_se_rebelle.jpg.jpg', 'quand-un-faineant-se-rebelle.webp'],
    ['Album  Kukela.jpg', 'kukela.webp'],
    ['Album  y faut etre gentil.jpg', 'y-faut-etre-gentil.webp'],
    ['Album 20 Ans.jpg', '20-ans.webp'],
    ['Album chat de Jourdan.jpg', 'chat-de-jourdan.webp'],
    ['Album Mets tes lunettes.jpg', 'mets-tes-lunettes.webp'],
    ['Album on y est.jpg', 'on-y-est.webp'],
    ['Album RICOUNE RECTO copy.jpg', 'ricoune-recto.webp'],
    ['Album ricoune_bestof-400x400.jpg', 'bestof.webp'],
  ];
  for (const [src, dest] of albumFiles) {
    await compressToWebp(
      join(SRC_BASE, '4 albums', src),
      join(PUBLIC, 'images/albums', dest),
      { width: 800, quality: 85 }
    );
  }

  // 4. Artist (l-artiste / CDC_L_ARTISTE)
  console.log('-- Artist --');
  const artistSrc = join(VISU_BASE, 'CDC L\'ARTISTE.jpg');
  if (existsSync(artistSrc)) {
    await compressToWebp(artistSrc, join(PUBLIC, 'images/artist/l-artiste.webp'), { width: 800, quality: 85 });
  } else {
    console.log('  SKIP: CDC L\'ARTISTE.jpg not found at', artistSrc);
  }

  // 5. Photos galerie
  console.log('-- Photos galerie --');
  for (let i = 1; i <= 5; i++) {
    const pad = i.toString().padStart(2, '0');
    await compressToWebp(
      join(SRC_BASE, '3 photos', `photos_${pad}.jpg.jpg`),
      join(PUBLIC, `images/photos/photos-${pad}.webp`),
      { width: 1200, quality: 80 }
    );
  }

  // 6. Photos HD
  console.log('-- Photos HD --');
  await compressImage(
    join(SRC_BASE, '6 photos HD', 'photos_hd_visuel_01.png'),
    join(PUBLIC, 'images/photos-hd/visuel-01.png'),
    { width: 2400, quality: 90 }
  );
  await compressImage(
    join(SRC_BASE, '6 photos HD', 'photos_hd_visuel_02.jpeg'),
    join(PUBLIC, 'images/photos-hd/visuel-02.jpg'),
    { width: 2400, quality: 90 }
  );

  // 7. Pro background
  console.log('-- Pro --');
  const proSrc = join(PRO_BASE, 'pro_background.jpg.webp');
  if (existsSync(proSrc)) {
    copyFileSync(proSrc, join(PUBLIC, 'images/pro/pro-background.webp'));
    console.log('  OK: public/images/pro/pro-background.webp (copie directe, deja webp)');
  } else {
    console.log('  SKIP: pro_background.jpg.webp not found');
  }

  // 8. Logo
  console.log('-- Logo --');
  await compressImage(
    join(SRC_BASE, '7 global (logo)', 'logo_ricoune_icon.png.png'),
    join(PUBLIC, 'images/logo/ricoune-icon.png'),
    { width: 200, quality: 90 }
  );
  copyFileSync(
    join(SRC_BASE, '7 global (logo)', 'logo_ricoune_header.png.ico'),
    join(PUBLIC, 'images/logo/ricoune-favicon.ico')
  );
  console.log('  OK: public/images/logo/ricoune-favicon.ico (copie directe)');

  // 9. PDFs
  console.log('-- Documents PDF --');
  const pdfSolo = join(PRO_BASE, 'Fiche technique Solo.pdf');
  if (existsSync(pdfSolo)) {
    copyFileSync(pdfSolo, join(PUBLIC, 'documents/fiche-technique-solo.pdf'));
    console.log('  OK: public/documents/fiche-technique-solo.pdf');
  }
  const pdfGroupe = join(PRO_BASE, 'FICHE TECHNIQUE groupz.pdf');
  if (existsSync(pdfGroupe)) {
    copyFileSync(pdfGroupe, join(PUBLIC, 'documents/fiche-technique-groupe.pdf'));
    console.log('  OK: public/documents/fiche-technique-groupe.pdf');
  }

  // Also copy home_album_latest for accueil
  console.log('-- Accueil album --');
  await compressToWebp(
    join(SRC_BASE, '1 page d\'accueil', 'home_album_latest.jpg.jpg'),
    join(PUBLIC, 'images/albums/home-album-latest.webp'),
    { width: 800, quality: 85 }
  );

  console.log('\n=== Compression terminee ===');
}

main().catch(console.error);
