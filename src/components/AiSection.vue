<script setup>
import { images } from '@/data/content'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <section class="ai-section">
    <div class="ai-stage">
      <img
        v-reveal
        class="ai-bg-image"
        :src="images.aiBg"
        :alt="t.ai.imageAlt"
        loading="lazy"
      />

      <div v-reveal="200" class="ai-card">
        <h2 class="ai-card-title">{{ t.ai.title }}</h2>
        <p v-for="(paragraph, i) in t.ai.paragraphs" :key="i">{{ paragraph }}</p>

        <!-- Nube negra que se superpone al fondo de la tarjeta -->
        <svg class="ai-card-cloud" viewBox="0 0 640 190" fill="none" aria-hidden="true">
          <path
            d="M 0 190 V 142 C 28 134, 62 138, 86 154 C 110 72, 188 12, 280 12 C 362 12, 434 60, 464 132 C 482 118, 506 110, 532 110 C 578 110, 618 138, 636 178 L 640 190 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ai-section {
  position: relative;
  background: var(--bg-dark);
  padding: 80px 24px 120px;
  overflow: hidden;
}

.ai-stage {
  position: relative;
  max-width: 1460px;
  margin: 0 auto;
  min-height: 760px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include below($bp-md) {
    min-height: auto;
    padding-top: 200px;
  }
}

.ai-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
  z-index: 1;

  @include below($bp-md) {
    height: 360px;
    top: 0;
    bottom: auto;
  }
}

.ai-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  background: var(--bg-light);
  color: var(--text-black);
  border-radius: 28px;
  padding: 64px 56px 220px;
  margin-top: 60px;
  overflow: hidden;

  p {
    font-size: clamp(16px, 1.25vw, 24px);
    line-height: 1.42;
    color: #141414;

    & + p {
      margin-top: 28px;
    }
  }

  @include below($bp-md) {
    padding: 40px 28px 160px;
  }
}

.ai-card-title {
  font-size: clamp(26px, 2.08vw, 40px);
  font-weight: 400;
  text-align: center;
  color: var(--text-black);
  margin-bottom: 32px;
}

.ai-card-cloud {
  position: absolute;
  left: -4%;
  right: -4%;
  bottom: -2px;
  width: 108%;
  height: auto;
  pointer-events: none;
}
</style>
