<script setup>
// Estrella de 4 puntas usada en botones, portafolio y contactos
defineProps({
  color: { type: String, default: '#FFFFFF' },
})
</script>

<template>
  <svg viewBox="0 0 125 125" fill="none" aria-hidden="true">
    <path
      d="M62.5 0L73 52L125 62.5L73 73L62.5 125L52 73L0 62.5L52 52L62.5 0Z"
      :fill="color"
    />
  </svg>
</template>
