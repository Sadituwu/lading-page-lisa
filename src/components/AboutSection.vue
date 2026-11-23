<script setup>
import { images } from '@/data/content'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="about-section">
    <!-- Curvas orbitales y estrellas de fondo: las líneas se dibujan al aparecer -->
    <svg
      class="about-curves-svg"
      viewBox="0 0 1920 1750"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        v-reveal.draw
        d="M 1180 0 C 780 260, 260 640, -60 1050"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <path
        v-reveal.pop="900"
        d="M 176 765 L 185 786 L 208 788 L 190 803 L 195 825 L 176 813 L 157 825 L 162 803 L 144 788 L 167 786 Z"
        fill="#FFFFFF"
      />
      <path
        v-reveal.draw
        d="M -80 1480 C 420 1640, 1240 1200, 1960 280"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <circle v-reveal.pop="1200" cx="1792" cy="482" r="18" fill="#FFFFFF" />
      <g transform="translate(0, 14)">
        <path
          v-reveal.pop="700"
          d="M 1148 1048 C 1138 1048, 1130 1040, 1130 1030 C 1130 1021, 1137 1013, 1146 1012 C 1150 997, 1164 986, 1180 986 C 1197 986, 1212 998, 1215 1015 C 1226 1016, 1235 1025, 1235 1036 C 1235 1048, 1225 1057, 1213 1057 C 1205 1057, 1198 1053, 1194 1048 C 1188 1054, 1179 1058, 1169 1058 C 1160 1058, 1153 1054, 1148 1048 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>

    <div class="about-grid">
      <div v-reveal class="about-avatar-wrap">
        <img :src="images.avatar" :alt="t.about.avatarAlt" loading="lazy" />
      </div>

      <div class="about-content">
        <h2 v-reveal="100" class="section-heading-sm">{{ t.about.heading }}</h2>
        <p v-reveal="200" class="about-bio">{{ t.about.bio }}</p>

        <h2 v-reveal class="section-heading-sm about-directions-title">
          {{ t.about.directionsTitle }}
        </h2>
        <ul class="directions-list">
          <li v-for="(item, i) in t.about.directions" :key="i" v-reveal="100 + i * 80">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="about-quote-stage">
      <!-- Capa exterior: posición + aparición + parallax · imagen: flota -->
      <div v-reveal v-parallax="0.08" class="walker-figure">
        <img class="float" :src="images.walker" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <blockquote v-reveal="250" class="about-quote">
        <template v-for="(line, i) in t.about.quote" :key="i">
          {{ line }}<br v-if="i < t.about.quote.length - 1" />
        </template>
      </blockquote>
    </div>

    <!-- Nube blanca de transición (abajo a la derecha) -->
    <svg class="about-bottom-cloud" viewBox="0 0 443 180" fill="none" aria-hidden="true">
      <path
        d="M 40 180 C 40 132, 78 96, 124 96 C 134 96, 144 98, 152 101 C 169 44, 222 4, 284 4 C 350 4, 405 49, 419 112 C 427 110, 435 110, 443 111 L 443 180 Z"
        fill="#FFFFFF"
      />
    </svg>
  </section>
</template>

<style scoped lang="scss">
.about-section {
  position: relative;
  background: var(--bg-dark);
  padding: 40px 0 220px;
  overflow: hidden;
}

.about-curves-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.about-grid {
  position: relative;
  z-index: 2;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 120px 24px 0;
  display: grid;
  grid-template-columns: 440px 1fr;
  gap: 88px;
  align-items: start;

  @include below($bp-lg) {
    grid-template-columns: 320px 1fr;
    gap: 48px;
  }
  @include below($bp-md) {
    grid-template-columns: 1fr;
    padding-top: 48px;
  }
}

.about-avatar-wrap {
  position: relative;
  width: 438px;
  height: 438px;
  border-radius: 50%;
  overflow: hidden;
  background: #b80f0f;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include below($bp-lg) {
    width: 320px;
    height: 320px;
  }
  @include below($bp-md) {
    margin: 0 auto;
    width: 280px;
    height: 280px;
  }
}

.about-content {
  padding-top: 32px;
}

.section-heading-sm {
  font-size: clamp(26px, 2.08vw, 40px);
  font-weight: 400;
  line-height: 1.15;
  color: var(--text-white);
  margin-bottom: 24px;
}

.about-bio {
  font-size: clamp(16px, 1.25vw, 24px);
  font-weight: 400;
  line-height: 1.42;
  color: var(--text-muted);
  max-width: 590px;
}

.about-directions-title {
  margin-top: 56px;
}

.directions-list {
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    position: relative;
    padding-left: 24px;
    font-size: clamp(16px, 1.25vw, 24px);
    line-height: 1.42;
    color: var(--text-muted);

    &::before {
      content: '•';
      position: absolute;
      left: 4px;
      top: 0;
      color: var(--text-muted);
    }
  }
}

.about-quote-stage {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 120px auto 0;
  padding: 0 24px;
  min-height: 520px;

  @include below($bp-md) {
    margin-top: 64px;
    min-height: 380px;
  }
}

.walker-figure {
  position: absolute;
  left: 31%;
  top: -10px;
  width: clamp(130px, 11.4vw, 219px);
  z-index: 3;

  img {
    width: 100%;
  }

  @include below($bp-lg) {
    left: 18%;
  }
  @include below($bp-md) {
    left: 6%;
    top: 0;
  }
}

.about-quote {
  position: relative;
  margin-left: 42%;
  padding-top: 230px;
  font-family: var(--font-script);
  font-size: clamp(26px, 2.6vw, 50px);
  line-height: 1.18;
  color: var(--text-white);
  transform: rotate(-7deg);
  transform-origin: left center;

  @include below($bp-lg) {
    margin-left: 34%;
    padding-top: 190px;
  }
  @include below($bp-md) {
    margin-left: 24%;
    padding-top: 170px;
  }
  @include below($bp-sm) {
    margin-left: 0;
    padding-top: 220px;
  }
}

.about-bottom-cloud {
  position: absolute;
  right: 0;
  bottom: -4px;
  width: clamp(220px, 23vw, 443px);
  z-index: 3;
  pointer-events: none;
}
</style>
