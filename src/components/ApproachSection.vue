<script setup>
import { orbitNodes, orbitEllipses } from '@/data/content'
import { useI18n } from '@/i18n'

const { t } = useI18n()

// Las elipses se dibujan como <path> (dos arcos) para poder animar el trazo
// con pathLength en todos los navegadores.
const ellipsePath = ({ rx, ry }) =>
  `M ${-rx} 0 A ${rx} ${ry} 0 1 0 ${rx} 0 A ${rx} ${ry} 0 1 0 ${-rx} 0`

// Tiempos de la animación del diagrama (ms)
const ELLIPSE_STAGGER = 150
const NODES_START = 900
const NODE_STAGGER = 140
const delay = (ms) => ({ '--reveal-delay': `${ms}ms` })
</script>

<template>
  <section id="approach" class="approach-section">
    <!-- Muesca en V centrada en el borde superior -->
    <svg class="approach-notch" viewBox="0 0 84 54" fill="none" aria-hidden="true">
      <path d="M0 0 H84 L42 52 Z" fill="#FFFFFF" />
      <path d="M12 0 L42 42 L72 0" stroke="#7A7A7A" stroke-width="3" fill="none" />
    </svg>

    <div class="approach-title-wrap">
      <h2 v-reveal class="approach-title">{{ t.approach.title }}</h2>
      <span v-reveal.pop="500" class="approach-title-dot" aria-hidden="true" />
    </div>

    <div v-reveal="150" class="approach-intro">
      <p>{{ t.approach.intro }}</p>
    </div>

    <!-- Diagrama orbital concéntrico -->
    <div class="orbit-diagram-wrap">
      <svg
        v-reveal.group
        class="orbit-diagram-svg"
        viewBox="0 0 1180 620"
        fill="none"
        role="img"
        :aria-label="t.approach.diagramLabel"
      >
        <defs>
          <radialGradient id="redSphereGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stop-color="#FF4747" />
            <stop offset="65%" stop-color="#E31818" />
            <stop offset="100%" stop-color="#9A0606" />
          </radialGradient>
          <filter id="sphereGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <!-- Elipses: se dibujan de la más interna a la más externa -->
        <g transform="translate(560, 340) rotate(-25)">
          <path
            v-for="(e, i) in orbitEllipses"
            :key="i"
            :d="ellipsePath(e)"
            data-reveal="draw"
            pathLength="1"
            :style="delay((orbitEllipses.length - 1 - i) * ELLIPSE_STAGGER)"
            stroke="#FFFFFF"
            stroke-width="1.5"
            opacity="0.92"
          />
        </g>

        <!-- Esfera central con halo que "respira" -->
        <g data-reveal="pop" :style="delay(200)">
          <circle
            class="orbit-glow"
            cx="560"
            cy="340"
            r="76"
            fill="#E31818"
            filter="url(#sphereGlow)"
          />
          <circle cx="560" cy="340" r="76" fill="url(#redSphereGrad)" />
          <text
          x="560"
          y="335"
          text-anchor="middle"
          fill="#000000"
          font-family="Inter, sans-serif"
          font-size="22"
          font-weight="400"
        >
          {{ t.approach.center[0] }}
        </text>
        <text
          x="560"
          y="362"
          text-anchor="middle"
          fill="#000000"
          font-family="Inter, sans-serif"
          font-size="22"
          font-weight="400"
        >
          {{ t.approach.center[1] }}
        </text>
        </g>

        <!-- Nodos: aparecen en secuencia del centro hacia fuera -->
        <g
          v-for="(node, i) in orbitNodes"
          :key="i"
          data-reveal="pop"
          :style="delay(NODES_START + node.order * NODE_STAGGER)"
        >
          <circle :cx="node.cx" :cy="node.cy" r="8" fill="#FFFFFF" />
          <text
            v-for="(line, j) in node.lines"
            :key="j"
            :x="line.x"
            :y="line.y"
            fill="#FFFFFF"
            font-family="Inter, sans-serif"
            font-size="22"
          >
            {{ t.approach.nodes[node.key][j] }}
          </text>
        </g>
      </svg>
    </div>

    <div class="approach-details">
      <div class="approach-details-col">
        <p v-for="(paragraph, i) in t.approach.details" :key="i" v-reveal="i * 120">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <div class="process-flow">
      <template v-for="(step, i) in t.approach.steps" :key="i">
        <svg
          v-if="i > 0"
          v-reveal="i * 300 - 150"
          class="process-arrow"
          viewBox="0 0 130 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 8H126M126 8L118 2M126 8L118 14"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span v-reveal="i * 300">{{ step }}</span>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
@mixin two-col-right {
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

@mixin body-text {
  font-size: clamp(16px, 1.25vw, 24px);
  line-height: 1.42;
  color: var(--text-muted);
}

.approach-section {
  position: relative;
  background: var(--bg-dark);
  color: var(--text-white);
  border-top-left-radius: 72px;
  border-top-right-radius: 72px;
  margin-top: -56px;
  padding: 160px 0 140px;
  z-index: 3;
}

.approach-notch {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 84px;
  height: 54px;
  pointer-events: none;
}

.approach-title-wrap {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.approach-title {
  font-family: var(--font-script);
  font-size: clamp(28px, 2.6vw, 50px);
  font-weight: 400;
  color: var(--text-white);
  text-align: center;
}

.approach-title-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--text-white);
  flex-shrink: 0;
}

.approach-intro {
  @include two-col-right;
  margin-top: 48px;

  p {
    @include body-text;
    grid-column: 2;
    max-width: 560px;

    @include below($bp-md) {
      grid-column: 1;
    }
  }
}

.orbit-diagram-wrap {
  position: relative;
  max-width: 1180px;
  margin: 24px auto 40px;
  padding: 0 24px;
}

.orbit-diagram-svg {
  width: 100%;
  height: auto;
  display: block;
}

.orbit-glow {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0.5;
  animation: orbit-breathe 4.5s ease-in-out infinite;
}

@keyframes orbit-breathe {
  0%,
  100% {
    opacity: 0.4;
    scale: 1;
  }
  50% {
    opacity: 0.75;
    scale: 1.14;
  }
}

.approach-details {
  @include two-col-right;
}

.approach-details-col {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 600px;

  p {
    @include body-text;
  }

  @include below($bp-md) {
    grid-column: 1;
  }
}

.process-flow {
  max-width: var(--container-max);
  margin: 56px auto 0;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 28px;
  font-family: var(--font-script);
  font-size: clamp(26px, 2.08vw, 40px);
  color: var(--text-white);
}

.process-arrow {
  width: clamp(64px, 7vw, 130px);
  height: 16px;
}
</style>
