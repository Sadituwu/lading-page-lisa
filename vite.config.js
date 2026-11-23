import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Breakpoints y mixins disponibles en todos los <style lang="scss">
        additionalData: `@use "@/styles/breakpoints" as *;\n`,
      },
    },
  },
})
