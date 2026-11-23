<script setup>
import { images } from '@/data/content'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <section class="path-section">
    <div class="path-arc-stage">
      <!-- El arco se dibuja de izquierda a derecha; punto, estrella y nube
           aparecen cuando el trazo pasa por ellos -->
      <svg
        v-reveal.group
        class="path-arc-svg"
        viewBox="0 0 1920 380"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M -40 40 Q 960 360 1960 40"
          data-reveal="draw"
          pathLength="1"
          stroke="#FFFFFF"
          stroke-width="2"
        />
        <circle
          data-reveal="pop"
          style="--reveal-delay: 350ms"
          cx="240"
          cy="108"
          r="12"
          fill="#FFFFFF"
        />
        <path
          data-reveal="pop"
          style="--reveal-delay: 950ms"
          d="M 960 175 L 969 196 L 992 198 L 974 213 L 979 235 L 960 223 L 941 235 L 946 213 L 928 198 L 951 196 Z"
          fill="#FFFFFF"
        />
        <path
          data-reveal="pop"
          style="--reveal-delay: 1550ms"
          d="M 1676 138 C 1662 138, 1650 127, 1650 113 C 1650 100, 1660 89, 1673 88 C 1679 68, 1698 54, 1720 54 C 1743 54, 1762 70, 1767 92 C 1782 93, 1794 106, 1794 121 C 1794 137, 1781 150, 1765 150 C 1754 150, 1744 145, 1738 137 C 1730 146, 1719 151, 1706 151 C 1694 151, 1683 146, 1676 138 Z"
          fill="#FFFFFF"
        />
      </svg>

      <!-- Capa exterior: posición + aparición + parallax · imagen: flota -->
      <div v-reveal="400" v-parallax="0.06" class="path-figure-child">
        <img class="float" :src="images.pathChild" alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div v-reveal="650" v-parallax="0.12" class="path-figure-woman">
        <img
          class="float"
          style="--float-delay: -3s"
          :src="images.pathWoman"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
    </div>

    <h2 v-reveal class="path-title">{{ t.path.title }}</h2>

    <div v-reveal="150" class="path-photo-wrap">
      <img :src="images.pathPhoto" :alt="t.path.photoAlt" loading="lazy" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.path-section {
  position: relative;
  background: var(--bg-dark);
  padding: 40px 0 140px;
  overflow: hidden;
}

.path-arc-stage {
  position: relative;
  width: 100%;
  height: clamp(220px, 20vw, 380px);
}

.path-arc-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.path-figure-child {
  position: absolute;
  left: 32%;
  top: 28%;
  width: clamp(120px, 12vw, 230px);
  z-index: 2;

  img {
    width: 100%;
  }

  @include below($bp-md) {
    left: 14%;
  }
}

.path-figure-woman {
  position: absolute;
  left: 55%;
  top: 10%;
  width: clamp(140px, 14vw, 270px);
  z-index: 2;

  img {
    width: 100%;
  }

  @include below($bp-md) {
    left: 56%;
  }
}

.path-title {
  margin-top: 28px;
  font-size: clamp(36px, 4.42vw, 85px);
  font-weight: 400;
  text-align: center;
  color: var(--text-white);
  padding: 0 24px;
}

.path-photo-wrap {
  max-width: var(--container-max);
  margin: 64px auto 0;
  padding: 0 24px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style>
