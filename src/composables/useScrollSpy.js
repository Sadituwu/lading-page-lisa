import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Devuelve el id de la sección que cruza la mitad de la pantalla.
 * @param {string[]} ids  ids de las secciones a vigilar
 */
export function useScrollSpy(ids) {
  const activeId = ref(null)
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId.value = entry.target.id
        }
      },
      // Franja estrecha en el centro de la ventana
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())

  return activeId
}
