// Convierte las imágenes de src/assets/images/source/ a WebP en src/assets/images/
// Uso: npm run images
// Cada imagen se limita a ~2× su tamaño máximo en pantalla (por defecto 1600 px).
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'src/assets/images/source'
const OUT = 'src/assets/images'
const MAX_WIDTH = {
  walker: 440,
  'path-woman': 560,
  'path-child': 480,
  avatar: 880,
  hands: 1000,
  sketch: 1200,
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))

for (const file of files) {
  const { name } = parse(file)
  const width = MAX_WIDTH[name] ?? 1600
  const out = join(OUT, `${name}.webp`)
  const info = await sharp(join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(out)
  console.log(`${file} → ${out} (${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB)`)
}
