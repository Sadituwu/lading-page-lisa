<script setup>
import { computed } from 'vue'
import { images, footerLinks, resumeUrl } from '@/data/content'
import { useI18n } from '@/i18n'
import PillButton from './ui/PillButton.vue'

const { t } = useI18n()

const linkGroups = computed(() => [
  { title: t.value.footer.morePortfolio, links: footerLinks.portfolio },
  { title: t.value.footer.blog, links: footerLinks.blog },
])

const isExternal = (href) => /^https?:/.test(href)

const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer id="resume" class="site-footer">
    <div class="footer-top-grid">
      <div class="footer-links-col">
        <div class="footer-links-row">
          <div
            v-for="(group, i) in linkGroups"
            :key="i"
            v-reveal="i * 120"
            class="footer-link-group"
          >
            <h4>{{ group.title }}</h4>
            <div class="footer-red-links">
              <a
                v-for="link in group.links"
                :key="link.label"
                :href="link.href"
                v-bind="isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>

        <PillButton v-reveal="240" :href="resumeUrl" download class="footer-resume-btn">
          {{ t.footer.downloadResume }}
        </PillButton>
      </div>

      <div class="footer-essay">
        <p v-for="(paragraph, i) in t.footer.essay" :key="i" v-reveal="i * 120">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <!-- Galería collage -->
    <div class="footer-collage">
      <div v-reveal class="collage-col-posters">
        <img :src="images.posterMegan" :alt="t.footer.alts.posterMegan" loading="lazy" />
        <img :src="images.posterLevis" :alt="t.footer.alts.posterLevis" loading="lazy" />
      </div>

      <div v-reveal="120" class="collage-col-sketch">
        <img :src="images.sketch" :alt="t.footer.alts.sketch" loading="lazy" />
      </div>

      <div v-reveal="240" class="collage-col-design">
        <img :src="images.designIllustration" :alt="t.footer.alts.design" loading="lazy" />
        <div class="collage-placeholder-rect" role="img" :aria-label="t.footer.alts.placeholder" />
      </div>

      <div v-reveal="360" class="collage-col-right">
        <img :src="images.hands" :alt="t.footer.alts.hands" loading="lazy" />
        <button
          type="button"
          class="back-to-top-btn"
          :aria-label="t.a11y.toTop"
          @click="scrollToTop"
        >
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M24 38V10M24 10L12 22M24 10L36 22"
              stroke="#FFFFFF"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="footer-bottom-bar">
      <span>{{ t.footer.madeByMe }}</span>
      <span>©</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  background: var(--bg-dark);
  padding: 40px 0 64px;
}

.footer-top-grid {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

.footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.footer-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 48px 64px;
}

.footer-link-group h4 {
  font-size: clamp(24px, 2.08vw, 40px);
  font-weight: 400;
  color: var(--text-white);
  margin-bottom: 14px;
}

.footer-red-links {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;

  a {
    font-size: clamp(20px, 1.72vw, 33px);
    color: var(--accent-red);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.75;
    }
  }
}

// Sobrescribe tamaño del PillButton (el root del hijo recibe el scope del padre)
.footer-resume-btn.pill-btn {
  align-self: flex-start;
  height: 88px;
  padding: 0 44px;
  font-size: clamp(20px, 1.64vw, 31.5px);

  @include below($bp-md) {
    height: 68px;
    padding: 0 36px;
  }
  @include below($bp-sm) {
    height: 62px;
  }
}

.footer-essay {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 16px;
  line-height: 1.45;
  color: var(--text-muted);
  max-width: 580px;
}

/* Collage */
.footer-collage {
  max-width: 1760px;
  margin: 88px auto 0;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 225px 573px 580px 254px;
  gap: 36px;
  align-items: start;
  justify-content: center;

  @include below($bp-xl) {
    grid-template-columns: 0.9fr 2.2fr 2.2fr 1fr;
    gap: 24px;
  }
  @include below($bp-lg) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  @include below($bp-sm) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
}

.collage-col-posters {
  display: flex;
  flex-direction: column;
  gap: 140px;

  @include below($bp-lg) {
    flex-direction: row;
    gap: 24px;

    img {
      width: 48%;
    }
  }
  @include below($bp-sm) {
    flex-direction: column;

    img {
      width: 100%;
    }
  }
}

.collage-col-sketch img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.collage-col-design {
  display: flex;
  flex-direction: column;
  gap: 110px;

  @include below($bp-lg) {
    gap: 32px;
  }
}

.collage-placeholder-rect {
  width: 100%;
  aspect-ratio: 580 / 365;
  background: var(--surface-placeholder);
}

.collage-col-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 140px;
  padding-top: 220px;

  @include below($bp-lg) {
    padding-top: 0;
    gap: 48px;
    flex-direction: row;
    justify-content: space-between;
    grid-column: 1 / -1;
  }
  @include below($bp-sm) {
    flex-direction: column;
  }
}

.back-to-top-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  height: 112px;
  border: 1.5px solid var(--text-white);
  border-radius: 50%;
  transform: rotate(-16deg);
  transition:
    transform 0.25s var(--ease-out),
    background-color 0.25s ease;

  &:hover {
    transform: rotate(-16deg) scale(1.06);
    background: rgba(255, 255, 255, 0.08);
  }

  svg {
    transform: rotate(16deg);
    width: 48px;
    height: 48px;
  }
}

.footer-bottom-bar {
  max-width: var(--container-max);
  margin: 80px auto 0;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: clamp(16px, 1.25vw, 24px);
  color: var(--text-footer);
}
</style>
