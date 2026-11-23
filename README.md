# Portafolio — Елизавета Дудина

Vue 3 + Vite + SCSS. Sitio 100 % estático (sin backend).

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera dist/ para publicar
npm run preview   # sirve dist/ localmente
npm run images    # convierte src/assets/images/source/* a WebP optimizado
npm run og        # regenera public/og-image.png y el icono de Apple
```

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Textos (RU / EN) | `src/i18n/ru.js`, `src/i18n/en.js` |
| Imágenes, enlaces, proyectos, currículum | `src/data/content.js` |
| Secciones | `src/components/*.vue` |
| Colores, reset, accesibilidad | `src/styles/main.scss` |
| Animaciones de aparición | `src/directives/reveal.js` + `src/styles/_motion.scss` |
| Parallax | `src/directives/parallax.js` |

## Pendiente antes de publicar

- [ ] **Imágenes de Google** (`lh3.googleusercontent.com/aida/…` en `content.js`): exigen
      iniciar sesión, un visitante verá la imagen rota. Descargarlas, guardarlas en
      `src/assets/images/source/`, ejecutar `npm run images` e importarlas como las demás.
- [ ] **Proyectos del portafolio**: rellenar `projects` en `content.js` (título, categoría,
      descripción, portada, galería).
- [ ] **Currículum**: copiar el PDF a `public/resume.pdf` (o cambiar `resumeUrl`).
- [ ] **Enlaces del footer**: URLs reales de Dprofile, Behance y el blog (`footerLinks`).
- [ ] **Dominio**: cambiar `VITE_SITE_URL` en `.env` (lo usan las etiquetas Open Graph).
- [ ] Revisar la traducción al inglés (`src/i18n/en.js`).

## Publicar

Cualquier hosting estático sirve. Comando de build `npm run build`, carpeta `dist`.

- **Netlify / Vercel**: importar el repositorio; detectan Vite solos.
- **GitHub Pages** en `usuario.github.io/repo/`: añadir `base: '/repo/'` en
  `vite.config.js` y publicar `dist/` (por ejemplo con la acción `actions/deploy-pages`).
