/**
 * v-parallax="0.12" — desplaza el elemento en vertical según el scroll.
 * El valor es la intensidad: positivo = se mueve más lento que la página.
 *
 * Usa la propiedad `transform`; v-reveal usa `translate`, así que ambas
 * directivas pueden ir en el mismo elemento sin pisarse.
 * Desactivado con prefers-reduced-motion.
 */
const items = new Map() // elemento → intensidad
let ticking = false
let listening = false

function update() {
  ticking = false
  const viewportCenter = window.innerHeight / 2
  for (const [el, speed] of items) {
    const rect = el.getBoundingClientRect()
    // Se resta el desplazamiento actual para medir la posición "real"
    const center = rect.top + rect.height / 2 - (el.__parallaxY ?? 0)
    const distance = center - viewportCenter
    if (Math.abs(distance) > window.innerHeight * 1.5) continue
    const y = Math.round(distance * -speed * 10) / 10
    el.__parallaxY = y
    el.style.transform = `translate3d(0, ${y}px, 0)`
  }
}

function requestUpdate() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

function listen() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate, { passive: true })
}

function unlisten() {
  if (!listening || items.size) return
  listening = false
  window.removeEventListener('scroll', requestUpdate)
  window.removeEventListener('resize', requestUpdate)
}

export const vParallax = {
  mounted(el, { value }) {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    items.set(el, typeof value === 'number' ? value : 0.1)
    el.style.willChange = 'transform'
    listen()
    requestUpdate()
  },
  updated(el, { value }) {
    if (items.has(el) && typeof value === 'number') items.set(el, value)
  },
  unmounted(el) {
    items.delete(el)
    unlisten()
  },
}
