import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import { vParallax } from './directives/parallax'
import './styles/main.scss'

createApp(App).directive('reveal', vReveal).directive('parallax', vParallax).mount('#app')
