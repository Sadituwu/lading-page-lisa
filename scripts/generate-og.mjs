// Genera public/og-image.png (1200×630, previsualización al compartir)
// y public/apple-touch-icon.png a partir de SVG.
// Uso: npm run og
import sharp from 'sharp'

const star = (cx, cy, r, fill = '#fff') => {
  const k = r * 0.17
  return `<path fill="${fill}" d="M${cx} ${cy - r}L${cx + k} ${cy - k}L${cx + r} ${cy}L${cx + k} ${cy + k}L${cx} ${cy + r}L${cx - k} ${cy + k}L${cx - r} ${cy}L${cx - k} ${cy - k}Z"/>`
}

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="red" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#FF4747"/><stop offset="65%" stop-color="#E31818"/><stop offset="100%" stop-color="#9A0606"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#000"/>
  <g transform="translate(930 330) rotate(-25)" fill="none" stroke="#fff" stroke-width="1.5" opacity=".9">
    <ellipse rx="330" ry="120"/><ellipse rx="240" ry="88"/><ellipse rx="150" ry="56"/>
  </g>
  <circle cx="930" cy="330" r="62" fill="url(#red)"/>
  <path d="M -40 560 Q 600 690 1240 520" fill="none" stroke="#fff" stroke-width="2"/>
  ${star(640, 120, 34)}
  ${star(1110, 90, 14)}
  ${star(110, 470, 18)}
  <text x="80" y="230" fill="#fff" font-family="Inter, Arial, sans-serif" font-size="68" letter-spacing="1">ЕЛИЗАВЕТА ДУДИНА</text>
  <text x="82" y="290" fill="#c8c8c8" font-family="Inter, Arial, sans-serif" font-size="28" letter-spacing="2">ГРАФИЧЕСКИЙ ДИЗАЙНЕР + ИЛЛЮСТРАТОР</text>
  <text x="80" y="400" fill="#fff" font-family="'Bad Script', 'Segoe Script', cursive" font-size="40">Давайте создадим тот самый дизайн!</text>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png')
console.log('public/og-image.png')

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#000"/>
  ${star(90, 90, 62)}
  <circle cx="138" cy="42" r="11" fill="#d11a1a"/>
</svg>`

await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png')
console.log('public/apple-touch-icon.png')
