/**
 * v-reveal — anima elementos cuando entran en pantalla.
 *
 *   v-reveal              → aparece subiendo (fade-up)
 *   v-reveal="200"        → con 200 ms de retraso (útil para escalonar listas)
 *   v-reveal.pop          → aparece escalando (estrellas, puntos, nubes)
 *   v-reveal.draw         → dibuja el trazo de un <path> SVG
 *   v-reveal.group        → observa el contenedor y, al verse, activa a la vez
 *                           todos sus hijos con atributo data-reveal (diagramas SVG)
 *
 * Con prefers-reduced-motion todo se muestra directamente, sin animación.
 * Las animaciones en sí están en src/styles/_motion.scss.
 */

const VISIBLE = 'is-visible'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function show(el) {
  el.classList.add(VISIBLE)
  if (el.__revealGroup) {
    el.querySelectorAll('[data-reveal]').forEach((child) => child.classList.add(VISIBLE))
  }
}

let observer = null
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        show(entry.target)
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const vReveal = {
  mounted(el, { value, modifiers }) {
    if (modifiers.group) {
      el.__revealGroup = true
    } else {
      el.dataset.reveal = modifiers.draw ? 'draw' : modifiers.pop ? 'pop' : 'fade'
      // pathLength="1" permite animar el trazo sin medir la longitud real del path
      if (modifiers.draw) el.setAttribute('pathLength', '1')
    }

    const delay = typeof value === 'number' ? value : 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      show(el)
      return
    }
    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
