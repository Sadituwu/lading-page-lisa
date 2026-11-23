<script setup>
import { ref } from 'vue'
import { projects } from '@/data/content'
import { useI18n } from '@/i18n'
import StarIcon from './ui/StarIcon.vue'
import ProjectModal from './ProjectModal.vue'

const { t, localized } = useI18n()

const projectTitle = (p) => localized(p.title) || `${t.value.portfolio.project} ${p.id}`

const openProject = ref(null)
const open = (project) => (openProject.value = project)
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <!-- Nube negra arriba a la izquierda -->
    <svg class="portfolio-cloud-left" viewBox="0 0 620 260" fill="none" aria-hidden="true">
      <path
        d="M 0 0 H 612 C 594 82, 520 144, 432 144 C 428 144, 424 144, 420 143 C 392 210, 326 256, 248 256 C 164 256, 94 202, 68 128 C 46 138, 23 144, 0 144 Z"
        fill="#000000"
      />
    </svg>

    <!-- Nube con contorno arriba a la derecha -->
    <svg class="portfolio-cloud-right" viewBox="0 0 460 190" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="cloudOutlineGrad"
          x1="0"
          y1="0"
          x2="460"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#E5E5E5" />
          <stop offset="55%" stop-color="#333333" />
          <stop offset="100%" stop-color="#D0D0D0" />
        </linearGradient>
      </defs>
      <path
        v-reveal.draw="200"
        d="M 24 0 C 32 76, 98 134, 178 134 C 218 134, 255 119, 282 94 C 306 136, 352 164, 404 164 C 424 164, 443 160, 460 152"
        stroke="url(#cloudOutlineGrad)"
        stroke-width="2.5"
        fill="none"
      />
    </svg>

    <div class="portfolio-header">
      <h2 v-reveal class="portfolio-title">{{ t.portfolio.title }}</h2>
      <StarIcon v-reveal.pop="300" class="portfolio-star" color="#000000" />
    </div>

    <div class="portfolio-grid">
      <article
        v-for="(item, i) in projects"
        :key="item.id"
        v-reveal="(i % 2) * 120"
        class="portfolio-card"
      >
        <!-- Zona clicable con el ratón; para teclado y lectores está el botón de abajo -->
        <div class="portfolio-thumb" @click="open(item)">
          <img v-if="item.cover" :src="item.cover" alt="" loading="lazy" />
          <div class="portfolio-overlay" aria-hidden="true">
            <span v-if="localized(item.category)" class="portfolio-overlay__category">
              {{ localized(item.category) }}
            </span>
            <span class="portfolio-overlay__title">{{ projectTitle(item) }}</span>
          </div>
        </div>

        <button
          type="button"
          class="portfolio-more"
          aria-haspopup="dialog"
          :aria-label="`${t.portfolio.more}: ${projectTitle(item)}`"
          @click="open(item)"
        >
          <span>{{ t.portfolio.more }}</span>
          <svg viewBox="0 0 56 18" fill="none" aria-hidden="true">
            <path
              d="M0 9H54M54 9L46 2M54 9L46 16"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </article>
    </div>

    <ProjectModal :project="openProject" @close="openProject = null" />
  </section>
</template>

<style scoped lang="scss">
.portfolio-section {
  position: relative;
  background: var(--bg-light);
  color: var(--text-black);
  padding: 130px 0 180px;
  overflow: hidden;
}

.portfolio-cloud-left {
  position: absolute;
  top: -4px;
  left: 0;
  width: clamp(240px, 32vw, 620px);
  pointer-events: none;
  z-index: 1;
}

.portfolio-cloud-right {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(200px, 24vw, 460px);
  pointer-events: none;
  z-index: 1;
}

.portfolio-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
}

.portfolio-title {
  font-size: clamp(42px, 4.42vw, 85px);
  font-weight: 400;
  line-height: 1.05;
  color: var(--text-black);
  text-align: center;
}

.portfolio-star {
  position: absolute;
  right: 21%;
  top: -70px;
  width: clamp(64px, 6.5vw, 125px);
  height: auto;

  @include below($bp-md) {
    right: 8%;
    top: -40px;
  }
}

.portfolio-grid {
  position: relative;
  z-index: 2;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 32px;
  row-gap: 54px;

  @include below($bp-md) {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }
}

.portfolio-card {
  display: flex;
  flex-direction: column;

  &:hover {
    .portfolio-thumb {
      transform: translateY(-4px);
      background: #cfcfcf;
    }

    .portfolio-thumb img {
      scale: 1.04;
    }

    .portfolio-overlay {
      opacity: 1;

      > * {
        translate: 0 0;
      }
    }
  }
}

.portfolio-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 604 / 420;
  background: var(--surface-placeholder);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.25s var(--ease-out),
    background-color 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: scale 0.6s var(--ease-out);
  }
}

// Capa con título que aparece al pasar el ratón
.portfolio-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  padding: 28px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0) 60%);
  color: var(--text-white);
  opacity: 0;
  transition: opacity 0.35s ease;

  > * {
    translate: 0 12px;
    transition: translate 0.45s var(--ease-out);
  }

  &__category {
    font-size: clamp(12px, 0.9vw, 16px);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted-light);
  }

  &__title {
    font-size: clamp(22px, 1.9vw, 36px);
    line-height: 1.1;
  }

  // En pantallas táctiles (sin hover) la capa se ve siempre
  @media (hover: none) {
    opacity: 1;

    > * {
      translate: 0 0;
    }
  }
}

.portfolio-more {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
  padding-left: 28px;
  font-size: clamp(20px, 1.72vw, 33px);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-black);
  transition:
    gap 0.22s ease,
    opacity 0.22s ease;

  &:hover {
    gap: 22px;
    opacity: 0.72;
  }

  svg {
    width: 56px;
    height: 18px;
    flex-shrink: 0;
  }
}
</style>
