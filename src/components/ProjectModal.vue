<script setup>
// Ventana de detalle de un proyecto. Usa <dialog> nativo:
// atrapa el foco, cierra con Esc y devuelve el foco al botón que la abrió.
import { ref, computed, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { useI18n } from '@/i18n'

const props = defineProps({
  project: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const { t, localized } = useI18n()
const dialog = ref(null)
const scrollLocked = useScrollLock(document.body)

const title = computed(
  () => localized(props.project?.title) || `${t.value.portfolio.project} ${props.project?.id}`,
)
const category = computed(() => localized(props.project?.category))
const description = computed(() => localized(props.project?.description))

watch(
  () => props.project,
  (project) => {
    if (project && !dialog.value.open) {
      dialog.value.showModal()
      scrollLocked.value = true
    } else if (!project && dialog.value?.open) {
      dialog.value.close()
    }
  },
  { flush: 'post' },
)

const close = () => dialog.value?.close()

// Se dispara al cerrar por cualquier vía (botón, Esc, clic fuera)
function onClose() {
  scrollLocked.value = false
  emit('close')
}

// Un clic directamente sobre el <dialog> es un clic en el fondo oscuro
function onBackdropClick(event) {
  if (event.target === dialog.value) close()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="project-modal"
    aria-labelledby="project-modal-title"
    @close="onClose"
    @click="onBackdropClick"
  >
    <div v-if="project" class="project-modal__panel">
      <button
        type="button"
        class="project-modal__close"
        :aria-label="t.portfolio.close"
        @click="close"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <p v-if="category" class="project-modal__category">{{ category }}</p>
      <h3 id="project-modal-title" class="project-modal__title">{{ title }}</h3>
      <p v-if="description" class="project-modal__description">{{ description }}</p>

      <div class="project-modal__gallery">
        <template v-if="project.gallery.length">
          <img
            v-for="(src, i) in project.gallery"
            :key="i"
            :src="src"
            :alt="`${title} — ${i + 1}`"
            loading="lazy"
          />
        </template>
        <template v-else>
          <div class="project-modal__placeholder project-modal__placeholder--wide" />
          <div class="project-modal__placeholder" />
          <div class="project-modal__placeholder" />
          <p class="project-modal__note">{{ t.portfolio.galleryPlaceholder }}</p>
        </template>
      </div>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.project-modal {
  // Reset del <dialog>: el panel interior es la "caja" visible
  width: min(1100px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100dvh - 48px);
  margin: auto;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-black);
  overflow: visible;

  &::backdrop {
    background: rgba(0, 0, 0, 0.78);
    backdrop-filter: blur(6px);
  }

  &[open] {
    animation: modal-in 0.45s var(--ease-out);
  }

  &[open]::backdrop {
    animation: backdrop-in 0.3s ease;
  }
}

.project-modal__panel {
  position: relative;
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--bg-light);
  border-radius: 28px;
  padding: 56px 56px 48px;

  @include below($bp-md) {
    padding: 56px 20px 28px;
    border-radius: 20px;
  }
}

.project-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid var(--text-black);
  color: var(--text-black);
  transition:
    rotate 0.3s var(--ease-out),
    background-color 0.2s ease,
    color 0.2s ease;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    rotate: 90deg;
    background: var(--text-black);
    color: var(--text-white);
  }
}

.project-modal__category {
  font-size: clamp(14px, 1vw, 18px);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-red);
  margin-bottom: 8px;
}

.project-modal__title {
  font-size: clamp(28px, 2.6vw, 50px);
  font-weight: 400;
  line-height: 1.1;
  padding-right: 56px;
}

.project-modal__description {
  margin-top: 20px;
  max-width: 720px;
  font-size: clamp(16px, 1.25vw, 22px);
  line-height: 1.45;
  color: #333333;
}

.project-modal__gallery {
  margin-top: 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  img {
    width: 100%;
    border-radius: 16px;
  }

  img:first-child {
    grid-column: 1 / -1;
  }

  @include below($bp-sm) {
    grid-template-columns: 1fr;
  }
}

.project-modal__placeholder {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: var(--surface-placeholder);

  &--wide {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 7;
  }
}

.project-modal__note {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 16px;
  color: #777777;
}

@keyframes modal-in {
  from {
    opacity: 0;
    translate: 0 32px;
    scale: 0.97;
  }
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
}
</style>
