<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { navSections } from '@/data/content'
import { useI18n } from '@/i18n'
import { useScrollSpy } from '@/composables/useScrollSpy'

const { t, otherLocale, toggleLocale } = useI18n()

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

// Cabecera fija: fondo difuminado al bajar; se oculta al bajar y vuelve al subir
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 24)
const hidden = ref(false)
let lastY = 0
watch(y, (current) => {
  const delta = current - lastY
  if (Math.abs(delta) < 6) return
  hidden.value = delta > 0 && current > 240
  lastY = current
})
const isHidden = computed(() => hidden.value && !menuOpen.value)
// Si se navega con teclado hasta la cabecera oculta, se vuelve a mostrar
const revealHeader = () => (hidden.value = false)

// Sección visible → enlace activo en el menú
const activeId = useScrollSpy([...navSections, 'resume'])

// Bloquea el scroll del body mientras el menú móvil está abierto
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'is-hidden': isHidden }"
    @focusin="revealHeader"
  >
    <a href="#top" class="brand-lockup" :aria-label="t.a11y.home">
      <span class="brand-name">{{ t.brand.name }}</span>
      <span class="brand-roles">
        <span>{{ t.brand.role1 }}</span>
        <span class="plus">+</span>
        <span>{{ t.brand.role2 }}</span>
      </span>
    </a>

    <nav id="mainNav" class="main-nav" :class="{ 'is-open': menuOpen }" :aria-label="t.a11y.nav">
      <a
        v-for="(id, i) in navSections"
        :key="id"
        :href="`#${id}`"
        class="nav-link"
        :class="{ 'is-active': activeId === id }"
        :aria-current="activeId === id ? 'location' : undefined"
        :style="{ '--i': i }"
        @click="closeMenu"
      >
        {{ t.nav[id] }}
      </a>
      <a
        href="#resume"
        class="nav-link nav-link--arrow"
        :class="{ 'is-active': activeId === 'resume' }"
        :aria-current="activeId === 'resume' ? 'location' : undefined"
        :style="{ '--i': navSections.length }"
        @click="closeMenu"
      >
        <span>{{ t.nav.resume }}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </nav>

    <!-- La pastilla muestra el idioma al que se cambia (como en el diseño: RU → "ENG") -->
    <button
      type="button"
      class="lang-switch"
      :data-lang="otherLocale"
      :aria-label="t.a11y.switchLang"
      @click="toggleLocale"
    >
      <span class="lang-switch__badge">{{ otherLocale === 'en' ? 'ENG' : 'RU' }}</span>
    </button>

    <button
      type="button"
      class="mobile-menu-btn"
      :class="{ 'is-open': menuOpen }"
      :aria-label="menuOpen ? t.a11y.closeMenu : t.a11y.openMenu"
      :aria-expanded="String(menuOpen)"
      aria-controls="mainNav"
      @click="toggleMenu"
    >
      <span />
      <span />
      <span />
    </button>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  // --pt/--pb: padding original · --ps: padding vertical al hacer scroll
  --pt: 40px;
  --pb: 24px;
  --px: 88px;
  --ps: 14px;
  --header-ease: 0.4s var(--ease-out);

  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  padding: var(--pt) var(--px) var(--pb);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  transition:
    padding var(--header-ease),
    margin var(--header-ease),
    transform var(--header-ease);

  // Fondo difuminado en un pseudo-elemento: si backdrop-filter estuviera en el
  // header, el menú móvil (position: fixed) quedaría recortado dentro de él.
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    opacity: 0;
    transition: opacity var(--header-ease);
    pointer-events: none;
  }

  &.is-scrolled {
    padding-top: var(--ps);
    padding-bottom: var(--ps);
    // Compensa el padding perdido para que el contenido de abajo no salte
    margin-bottom: calc(var(--pt) + var(--pb) - 2 * var(--ps));

    &::before {
      opacity: 1;
    }
  }

  &.is-hidden {
    transform: translateY(-100%);
  }

  @include below($bp-lg) {
    --pt: 28px;
    --pb: 28px;
    --px: 32px;
    --ps: 12px;
  }
  @include below($bp-sm) {
    --pt: 20px;
    --pb: 20px;
    --px: 16px;
    --ps: 10px;
  }
}

.brand-lockup {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.brand-name {
  font-size: clamp(22px, 2.08vw, 40px);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.08;
  color: var(--text-white);
  white-space: nowrap;

  @include below($bp-sm) {
    font-size: 18px;
  }
}

.brand-roles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
  font-size: clamp(10px, 0.83vw, 16px);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text-muted-light);
  text-transform: uppercase;

  .plus {
    font-size: 1.1em;
    color: var(--text-white);
  }

  @include below($bp-sm) {
    font-size: 9px;
  }
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(20px, 3.1vw, 56px);

  // Menú móvil: pantalla completa con fundido y enlaces escalonados
  @include below($bp-md) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.96);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.35s ease,
      visibility 0s linear 0.35s;

    .nav-link {
      font-size: 28px;
      opacity: 0;
      translate: 0 18px;
      transition:
        opacity 0.4s ease,
        translate 0.5s var(--ease-out);
    }

    &.is-open {
      opacity: 1;
      visibility: visible;
      transition:
        opacity 0.35s ease,
        visibility 0s;

      .nav-link {
        opacity: 1;
        translate: 0 0;
        transition-delay: calc(0.08s + var(--i) * 0.06s);
      }
    }
  }
}

.nav-link {
  position: relative;
  font-size: clamp(15px, 1.25vw, 24px);
  font-weight: 400;
  color: var(--text-white);
  transition:
    opacity 0.2s ease,
    color 0.2s ease;
  white-space: nowrap;

  // Subrayado de la sección activa
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    scale: 0 1;
    transform-origin: left;
    transition: scale 0.35s var(--ease-out);
  }

  &.is-active::after {
    scale: 1 1;
  }

  &:hover {
    opacity: 0.72;
  }

  &--arrow {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
}

.lang-switch {
  display: inline-flex;
  align-items: center;
  width: 112px;
  height: 44px;
  padding: 3px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.55);
  background: #222222;
  position: relative;
  flex-shrink: 0;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--text-white);
  }

  &__badge {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 100%;
    border-radius: 7px;
    background: var(--text-white);
    color: var(--text-black);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: transform 0.25s var(--ease-out);
  }

  &[data-lang='ru'] .lang-switch__badge {
    transform: translateX(-36px);
  }

  @include below($bp-md) {
    width: 88px;
    height: 36px;

    &__badge {
      width: 52px;
      font-size: 15px;
    }

    &[data-lang='ru'] .lang-switch__badge {
      transform: translateX(-28px);
    }
  }
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  padding: 6px;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--text-white);
    border-radius: 2px;
    transition:
      transform 0.25s ease,
      opacity 0.25s ease;
  }

  // Animación a "X" cuando el menú está abierto
  &.is-open {
    span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  @include below($bp-md) {
    display: flex;
    z-index: 110;
  }
}
</style>
