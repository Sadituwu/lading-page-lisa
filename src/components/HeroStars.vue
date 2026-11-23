<script setup>
// Cielo decorativo del hero: estrellas de 4 puntas y puntos que parpadean.
// Posiciones fijas (en %) alrededor del texto para no restarle legibilidad.
const stars = [
  { x: 8, y: 18, size: 22, delay: 0 },
  { x: 18, y: 62, size: 10, delay: 1.6, dot: true },
  { x: 6, y: 82, size: 14, delay: 2.4 },
  { x: 27, y: 10, size: 8, delay: 0.8, dot: true },
  { x: 44, y: 6, size: 12, delay: 3.1 },
  { x: 63, y: 12, size: 7, delay: 1.2, dot: true },
  { x: 79, y: 8, size: 26, delay: 2.1 },
  { x: 92, y: 30, size: 9, delay: 0.4, dot: true },
  { x: 88, y: 66, size: 16, delay: 2.8 },
  { x: 72, y: 88, size: 8, delay: 1.9, dot: true },
  { x: 52, y: 92, size: 11, delay: 0.2 },
  { x: 33, y: 86, size: 6, delay: 3.4, dot: true },
]
</script>

<template>
  <div class="hero-stars" aria-hidden="true">
    <span
      v-for="(s, i) in stars"
      :key="i"
      class="hero-star"
      :class="{ 'hero-star--dot': s.dot }"
      :style="{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        animationDelay: `${s.delay}s`,
      }"
    >
      <svg v-if="!s.dot" viewBox="0 0 125 125">
        <path
          d="M62.5 0L73 52L125 62.5L73 73L62.5 125L52 73L0 62.5L52 52L62.5 0Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </div>
</template>

<style scoped lang="scss">
.hero-stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-star {
  position: absolute;
  display: block;
  color: var(--text-white);
  opacity: 0.2;
  animation: twinkle 4.2s ease-in-out infinite;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  &--dot {
    border-radius: 50%;
    background: currentColor;
  }

  @include below($bp-sm) {
    // En móvil, menos ruido: solo la mitad de las estrellas
    &:nth-child(even) {
      display: none;
    }
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.15;
    scale: 0.6;
    rotate: 0deg;
  }
  50% {
    opacity: 0.9;
    scale: 1;
    rotate: 45deg;
  }
}
</style>
