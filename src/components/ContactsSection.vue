<script setup>
import { useClipboard } from '@vueuse/core'
import { contacts } from '@/data/content'
import { useI18n } from '@/i18n'
import StarIcon from './ui/StarIcon.vue'

const { t } = useI18n()
// legacy: true → también funciona en navegadores sin la API Clipboard
const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true })
</script>

<template>
  <section id="contacts" class="contacts-section">
    <h2 v-reveal class="contacts-script-title">{{ t.contacts.title }}</h2>

    <div class="guarantee-row">
      <div class="guarantee-star-wrap">
        <StarIcon v-reveal.pop="200" class="guarantee-star" />
      </div>
      <div v-reveal="150" class="guarantee-copy">
        <h3>{{ t.contacts.guaranteeTitle }}</h3>
        <p>{{ t.contacts.guaranteeText }}</p>
      </div>
    </div>

    <div class="contact-card-stage">
      <div v-reveal class="contact-card">
        <!-- "Mordida" de nube negra arriba a la derecha -->
        <svg class="contact-card-bite" viewBox="0 0 180 120" fill="none" aria-hidden="true">
          <path
            d="M 180 0 H 46 C 46 28, 68 50, 96 50 C 102 50, 108 49, 113 47 C 118 76, 144 98, 174 98 C 176 98, 178 98, 180 98 Z"
            fill="#000000"
          />
        </svg>

        <div class="email-row">
          <a :href="`mailto:${contacts.email}`" class="contact-email">{{ contacts.email }}</a>

          <button
            type="button"
            class="copy-btn"
            :class="{ 'is-copied': copied }"
            :aria-label="t.contacts.copy"
            :title="t.contacts.copy"
            @click="copy(contacts.email)"
          >
            <!-- Icono copiar / check -->
            <svg v-if="!copied" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="8" y="8" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.7" />
              <path
                d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- Aviso accesible: los lectores de pantalla anuncian "Скопировано!" -->
          <span class="copy-toast" :class="{ 'is-visible': copied }" role="status">
            {{ copied ? t.contacts.copied : '' }}
          </span>
        </div>

        <div class="contact-socials">
          <div v-for="s in contacts.socials" :key="s.label" class="social-item">
            <span class="social-label">{{ s.label }}</span>
            <a :href="s.href" target="_blank" rel="noopener noreferrer" class="social-handle">
              {{ s.handle }}
            </a>
          </div>
        </div>

        <!-- Nube negra con contorno superpuesta abajo a la izquierda -->
        <svg class="contact-cloud-overlap" viewBox="0 0 664 433" fill="none" aria-hidden="true">
          <defs>
            <linearGradient
              id="darkCloudStroke"
              x1="0"
              y1="0"
              x2="664"
              y2="433"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#3A3A3A" />
              <stop offset="55%" stop-color="#D8D8D8" />
              <stop offset="100%" stop-color="#555555" />
            </linearGradient>
          </defs>
          <path
            d="M 10 290 C 10 218, 68 160, 140 160 C 154 160, 168 162, 180 166 C 204 82, 280 20, 372 20 C 468 20, 548 86, 568 176 C 618 184, 656 226, 656 278 C 656 336, 608 384, 550 384 C 516 384, 486 368, 466 344 C 440 388, 392 418, 336 418 C 282 418, 234 390, 208 348 C 186 368, 156 380, 124 380 C 60 380, 10 338, 10 290 Z"
            fill="#000000"
            stroke="url(#darkCloudStroke)"
            stroke-width="2.5"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts-section {
  position: relative;
  background: var(--bg-dark);
  padding: 60px 0 120px;
  overflow: hidden;
}

.contacts-script-title {
  font-family: var(--font-script);
  font-size: clamp(30px, 3.12vw, 60px);
  font-weight: 400;
  text-align: center;
  color: var(--text-white);
  padding: 0 24px;
}

.guarantee-row {
  max-width: var(--container-max);
  margin: 64px auto 0;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 32px;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

.guarantee-star-wrap {
  display: flex;
  justify-content: flex-end;
  padding-right: 48px;

  @include below($bp-md) {
    justify-content: flex-start;
    padding-right: 0;
  }
}

.guarantee-star {
  width: clamp(72px, 6.5vw, 124px);
  height: auto;
}

.guarantee-copy {
  h3 {
    font-size: clamp(26px, 2.08vw, 40px);
    font-weight: 400;
    color: var(--text-white);
    margin-bottom: 16px;
  }

  p {
    font-size: clamp(16px, 1.25vw, 24px);
    line-height: 1.42;
    color: var(--text-muted);
    max-width: 580px;
  }
}

.contact-card-stage {
  position: relative;
  max-width: 1440px;
  margin: 96px auto 0;
  padding: 0 24px 120px;
}

.contact-card {
  position: relative;
  max-width: var(--container-max);
  margin: 0 auto;
  background: var(--bg-light);
  border-radius: 28px;
  padding: 84px 48px 92px;
  text-align: center;
  overflow: visible;

  @include below($bp-md) {
    padding: 56px 24px 64px;
  }
}

.contact-card-bite {
  position: absolute;
  top: -2px;
  right: -2px;
  width: clamp(90px, 9vw, 175px);
  height: auto;
  pointer-events: none;
}

.email-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 20px;
}

.copy-btn {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: clamp(40px, 3vw, 56px);
  height: clamp(40px, 3vw, 56px);
  border-radius: 50%;
  border: 1.5px solid currentColor;
  color: var(--text-black);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    scale 0.3s var(--ease-spring);

  svg {
    width: 50%;
    height: 50%;
  }

  &:hover {
    background: var(--text-black);
    color: var(--text-white);
  }

  &:active {
    scale: 0.92;
  }

  &.is-copied {
    color: var(--accent-red);
    background: transparent;
    scale: 1.08;
  }
}

.copy-toast {
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  translate: -50% 6px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--text-black);
  color: var(--text-white);
  font-size: 15px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    translate 0.35s var(--ease-out);

  &.is-visible {
    opacity: 1;
    translate: -50% 0;
  }

  &:empty {
    padding: 0;
  }
}

.contact-email {
  display: inline-block;
  font-size: clamp(20px, 2.81vw, 54px);
  font-weight: 400;
  color: var(--accent-red);
  word-break: break-word;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
}

.contact-socials {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 24px 88px;
}

.social-item {
  display: inline-flex;
  align-items: baseline;
  gap: 14px;
}

.social-label {
  font-size: clamp(20px, 2.08vw, 40px);
  color: var(--text-black);
}

.social-handle {
  font-size: clamp(24px, 2.81vw, 54px);
  color: var(--accent-red);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
}

.contact-cloud-overlap {
  position: absolute;
  left: -330px;
  bottom: -215px;
  width: clamp(260px, 34vw, 660px);
  pointer-events: none;
  z-index: 3;

  @include below($bp-md) {
    left: -40px;
    bottom: -60px;
  }
}
</style>
