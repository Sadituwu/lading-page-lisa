<script setup>
import StarIcon from './StarIcon.vue'

defineProps({
  href: { type: String, default: '#' },
  variant: {
    type: String,
    default: 'dark',
    validator: (v) => ['dark', 'white'].includes(v),
  },
  star: { type: Boolean, default: false },
})
</script>

<template>
  <a :href="href" class="pill-btn" :class="`pill-btn--${variant}`">
    <StarIcon v-if="star" class="pill-btn__star" />
    <span><slot /></span>
  </a>
</template>

<style scoped lang="scss">
.pill-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 92px;
  padding: 0 52px;
  border-radius: 999px;
  font-size: clamp(20px, 2.08vw, 40px);
  font-weight: 400;
  transition:
    transform 0.22s var(--ease-out),
    box-shadow 0.22s ease,
    background-color 0.22s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &--dark {
    background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.14) 0%, rgba(0, 0, 0, 0.95) 68%);
    color: var(--text-white);
    border: 1.5px solid rgba(255, 255, 255, 0.85);
    box-shadow: inset 0 2px 14px rgba(255, 255, 255, 0.16);

    &:hover {
      border-color: var(--text-white);
      box-shadow:
        inset 0 2px 18px rgba(255, 255, 255, 0.28),
        0 0 20px rgba(255, 255, 255, 0.12);
    }
  }

  &--white {
    background: var(--text-white);
    color: var(--text-black);
    padding: 0 56px;

    &:hover {
      box-shadow: 0 8px 28px rgba(255, 255, 255, 0.22);
    }
  }

  &__star {
    position: absolute;
    top: -15px;
    // Centrado sin transform para poder girarla con `rotate` en hover
    left: calc(50% - 14px);
    width: 28px;
    height: 28px;
    pointer-events: none;
    transition: rotate 0.6s var(--ease-out), scale 0.6s var(--ease-out);
  }

  &:hover &__star,
  &:focus-visible &__star {
    rotate: 90deg;
    scale: 1.15;
  }

  @include below($bp-md) {
    height: 68px;
    padding: 0 36px;
  }

  @include below($bp-sm) {
    width: 100%;
    height: 62px;
  }
}
</style>
