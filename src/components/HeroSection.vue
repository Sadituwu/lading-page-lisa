<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import PillButton from './ui/PillButton.vue'
import HeroStars from './HeroStars.vue'

const { t, locale } = useI18n()

// El título entra palabra por palabra
const WORD_STAGGER = 90
const words = computed(() => t.value.hero.title.split(' '))
const afterTitle = computed(() => words.value.length * WORD_STAGGER)
</script>

<template>
  <section class="hero-section">
    <HeroStars />

    <div class="hero-inner">
      <!-- key con el idioma: al cambiar de idioma la animación se repite -->
      <h1 :key="locale" class="hero-title">
        <template v-for="(word, i) in words" :key="i">
          <span v-reveal="i * WORD_STAGGER" class="hero-word">{{ word }}</span>
          {{ ' ' }}
        </template>
      </h1>
      <p v-reveal="afterTitle" class="hero-subtitle">{{ t.hero.subtitle }}</p>

      <div class="hero-actions">
        <PillButton v-reveal="afterTitle + 150" href="#portfolio" star>
          {{ t.hero.portfolio }}
        </PillButton>
        <PillButton v-reveal="afterTitle + 250" href="#resume" star>
          {{ t.hero.resume }}
        </PillButton>
        <PillButton v-reveal="afterTitle + 350" href="#contacts" variant="white">
          {{ t.hero.discuss }}
        </PillButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  // Diseño original: 76vw (hasta 1340px). Se limita a la altura de la ventana
  // (menos la cabecera) para que el hero no ocupe más de una pantalla.
  min-height: min(clamp(680px, 76vw, 1340px), max(560px, calc(100svh - 120px)));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 180px;

  @include below($bp-md) {
    min-height: 580px;
    padding: 80px 24px 100px;
  }
}

.hero-inner {
  position: relative;
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.hero-title {
  width: 100%;
  font-size: clamp(36px, 4.42vw, 85px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: var(--text-white);
  text-align: center;

  @include below($bp-sm) {
    font-size: 32px;
  }
}

// inline-block para que la animación (translate) funcione en cada palabra
.hero-word {
  display: inline-block;
}

.hero-subtitle {
  width: 100%;
  max-width: 1120px;
  margin-top: 28px;
  font-size: clamp(17px, 1.72vw, 33px);
  font-weight: 400;
  line-height: 1.32;
  color: var(--text-muted-light);
}

.hero-actions {
  margin-top: 72px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 36px;

  @include below($bp-md) {
    margin-top: 48px;
    gap: 24px;
  }
}
</style>
