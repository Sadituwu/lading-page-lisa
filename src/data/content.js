// Datos de la página que NO son texto traducible (imágenes, enlaces, coordenadas).
// Los textos viven en src/i18n/ru.js y src/i18n/en.js.
//
// Imágenes locales: los originales van en src/assets/images/source/ y
// `npm run images` genera los .webp optimizados que se importan aquí.
import walkerImg from '@/assets/images/walker.webp'
import pathWomanImg from '@/assets/images/path-woman.webp'
import sketchImg from '@/assets/images/sketch.webp'
import handsImg from '@/assets/images/hands.webp'

// ⚠️ Estas URLs de lh3.googleusercontent.com/aida/ exigen iniciar sesión en Google:
// un visitante normal verá la imagen rota. Hay que descargarlas (con la sesión
// abierta en el navegador), guardarlas en src/assets/images/source/ con estos
// mismos nombres (avatar.png, ai-bg.png…), ejecutar `npm run images`
// y sustituir cada URL por un import del .webp, como las de arriba.
const GUC = 'https://lh3.googleusercontent.com/aida/'

export const images = {
  avatar: GUC + 'ALJJyrAwDB3dWyoRoHptBazzO3egN7lM7zzxUI8IozQis0WMAIxvTQ2PBisumNlR5FakY9tMkFru_fOneP6xE6aq9AwzYrVVnJ6qlITTqckzLeQVebtcMRblIOGwt2T-DauTVmv5iPDuYxbnTYLSIQj0EuFhNC7yN__6Tl4NeIMKgH-1AF0IkCqCVzNi5BpItui5Wfo3rsoEiichR2Gco2cewSa0UPrQuycufNlC_tMVqIqI6i_UifTXDMDz7BY',
  aiBg: GUC + 'ALJJyrB7p2qznYZEqWQfxPUUKy7Sn36umEi971m9HxBN4GbCe4ezjZViIxVUumhsJ6g88vfAiiQEegnP53gipP5eT4gYy6695Xa_Gr8KsxR-xYHHmbUtkjO0wcwS74czC3dNxD4imoC0P8LH0cQZ5WRBiHNtp-wacn83srkw5BtLN9wc0w2hHXjpgA0t-Kw_tVqeDSOFAkAg_72GNbAcTS039PffU0Yor8BD6ziUgDg4EMHArnBzohupJy56Dcuz',
  pathChild: GUC + 'ALJJyrAQkduIjAmceeqGfI_PQfzyda2KRzY2eee-LhVDs5JeSeF1l9OOjGO3H6PNAk8K6PnmNUJLDE7g-gjjD5NuR3tScobKg2gTo5hqbfSBKx_lVYLUeBYxlFN0uNPTCZBg2BBOUiIfvD2wzpJJ8x5WOnM--2HZmCuvh6JS0uoFeVjNo0y8mcV_xyhFPB12s813RP_imz1FEuEqg-YhZpY2MWZ49OxrxM_6X5f6l88oGDwIXiU38ao0VaFnappL_VNB3Q',
  pathPhoto: GUC + 'ALJJyrCca7TzjyFiH1oQkH_CfYRdKcRJfJ_jhB5P1zbjRO6-fPRGUHD2wrlK7QIBDhZGnVqxDFpLqPW2m9-PN_kOqMbtT2Zm68l1n0uCISiQtYsUdZ89vTlEmb7yyv8WANDIwyqO21T87HN7RaO42nrSFoxwwWvVKrKTbHj94t8pJKZ7tXtwHryvp7-P9rUDHaX4I1RZvDcrKyTfHTtSLk3iFjV33w026133fAQH4HLRa0jb0lMdHlAlxoBkow',
  posterMegan: GUC + 'ALJJyrDNxgo9x3IMP4HrDCZdV3UEAJWctD7Y4fdPng59DPa1ZjsLJLC4GKsHUOCi-te3l-9AWuiqlClSjDYccOpy2nKhjRb_zAux9iekkBerjAYpGXcPrLIsh0fdDhdpKZgUseQJqagBqmy3Mn8etMv8nI-p7aDcfeRWIFoZeUxSlGas-jIVL7JH8JuTH1cwN__OMYSY1BpHXxnWVDMRJqthkxnkVSs0bwx2NPVCDkaeBpe0--fAlSSK9uWfdlEwYQ',
  posterLevis: GUC + 'ALJJyrBkvygTnwvlIlvOEDdrEJ6pS7mVQdWccBAc7qmoFxfRtu8GzwSOSI7mM3X3sR2bAfREXZTO7t0l9-sNHkTufIjj6cQWjbjT-RMJi_wZsEcFggFysklKMT9780pWHmwBg-AaE57d3hDWX8ANQxZYbbZbd24yHjuA_ihVmMqDGPOYhSuhXinAhQuBvb7UjcsfsgWx-q-cxdyo3XCrVT3qMHN3wYjWYVDhzLu0Zk4FisQtzdFTBipU4sp0tT-aTXA',
  designIllustration: GUC + 'ALJJyrA2rRt3peT7_Hwwm1Fu1Ss7fa-buQeGyNm7Lg3X5DB8-LOdLo_nlZuL1iqrVpveupda8MFZplkLaxR3B0JAtP_C4h5cWO3G6M_DznYKCpRF1hsxWKtOeV57vVEd5QbdjhHwcQ_yKVV5y_d8gLaqFRhP0wzGi37qDN8iaPHaJ7MLaWNox5WQfc9DFHCnoXNiTtRo0DWk2HOfmLoZqPllIoBYzidaNv6Swd3jRa5rpzzL5XcUiLi9z_ibj0xZ6g',
  walker: walkerImg,
  pathWoman: pathWomanImg,
  sketch: sketchImg,
  hands: handsImg,
}

// IDs de sección del menú (los textos están en t.nav)
export const navSections = ['about', 'approach', 'portfolio', 'contacts']

// TODO: poner aquí el PDF real del currículum (archivo en /public)
export const resumeUrl = '/resume.pdf'

/**
 * Proyectos del portafolio — PROVISIONALES.
 * Para cada proyecto real:
 *   title / category / description: { ru, en } (si falta title se muestra "Проект N")
 *   cover: imagen de la tarjeta (import de un .webp)
 *   gallery: imágenes que se ven en la ventana de detalle
 */
export const projects = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: null,
  category: null,
  description: null,
  cover: null,
  gallery: [],
}))

// Nodos del diagrama orbital (coordenadas del SVG original, viewBox 1180x620).
// `key` → textos en t.approach.nodes · `order` → orden de aparición (centro → fuera)
export const orbitNodes = [
  { key: 'world', order: 5, cx: 110, cy: 306, lines: [{ x: 128, y: 314 }] },
  { key: 'operations', order: 0, cx: 678, cy: 296, lines: [{ x: 696, y: 302 }, { x: 696, y: 328 }] },
  { key: 'branding', order: 1, cx: 734, cy: 256, lines: [{ x: 752, y: 264 }] },
  { key: 'marketing', order: 2, cx: 812, cy: 212, lines: [{ x: 830, y: 220 }] },
  { key: 'design', order: 3, cx: 892, cy: 166, lines: [{ x: 910, y: 174 }] },
  { key: 'touchpoints', order: 4, cx: 976, cy: 118, lines: [{ x: 994, y: 124 }, { x: 994, y: 150 }] },
]

export const orbitEllipses = [
  { rx: 510, ry: 185 },
  { rx: 420, ry: 152 },
  { rx: 330, ry: 120 },
  { rx: 240, ry: 88 },
  { rx: 150, ry: 56 },
]

export const contacts = {
  email: 'dudinaelizaveta222@gmail.com',
  socials: [
    { label: 'vk', handle: '@dudliz', href: 'https://vk.com/dudliz' },
    { label: 'tg', handle: '@liDesigner27', href: 'https://t.me/liDesigner27' },
  ],
}

// TODO: sustituir por las URLs reales de los perfiles y del blog
export const footerLinks = {
  portfolio: [
    { label: 'Dprofile', href: 'https://dprofile.ru' },
    { label: 'Behance', href: 'https://www.behance.net' },
  ],
  blog: [{ label: 'СЕТКА', href: '#top' }],
}
