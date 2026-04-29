import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SOURCE = '_assets-source/ricoune-icon-source.png';
const OUTPUT_DIR = 'src/app';

const sizes = [16, 32, 48, 180, 256];

console.log('Génération des PNG temporaires...');
const buffers = await Promise.all(
  sizes.map(size =>
    sharp(SOURCE)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
  )
);

console.log('Génération apple-icon.png (180x180)...');
const appleIcon180 = buffers[sizes.indexOf(180)];
writeFileSync(join(OUTPUT_DIR, 'apple-icon.png'), appleIcon180);
console.log('  -> src/app/apple-icon.png créé');

console.log('Génération favicon.ico multi-tailles (16, 32, 48, 256)...');
const icoSizes = [16, 32, 48, 256];
const icoBuffers = icoSizes.map(s => buffers[sizes.indexOf(s)]);

function buildIco(pngBuffers, dimensions) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  const entries = Buffer.alloc(16 * numImages);
  let offset = 6 + 16 * numImages;

  pngBuffers.forEach((buf, i) => {
    const dim = dimensions[i];
    const e = i * 16;
    entries.writeUInt8(dim === 256 ? 0 : dim, e);
    entries.writeUInt8(dim === 256 ? 0 : dim, e + 1);
    entries.writeUInt8(0, e + 2);
    entries.writeUInt8(0, e + 3);
    entries.writeUInt16LE(1, e + 4);
    entries.writeUInt16LE(32, e + 6);
    entries.writeUInt32LE(buf.length, e + 8);
    entries.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });

  return Buffer.concat([header, entries, ...pngBuffers]);
}

const icoBuffer = buildIco(icoBuffers, icoSizes);
writeFileSync(join(OUTPUT_DIR, 'favicon.ico'), icoBuffer);
console.log('  -> src/app/favicon.ico créé (' + icoBuffer.length + ' bytes)');

console.log('\n✓ Génération terminée');
console.log('  - src/app/favicon.ico : 4 tailles (16, 32, 48, 256)');
console.log('  - src/app/apple-icon.png : 180x180');
