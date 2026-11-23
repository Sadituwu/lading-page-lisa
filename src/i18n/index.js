/**
 * i18n ligero (RU / EN).
 * Los textos son objetos JS normales, así que listas y párrafos se usan
 * directamente en las plantillas: t.about.directions, t.footer.essay…
 */
import { ref, computed, watchEffect } from 'vue'
import ru from './ru'
import en from './en'

const messages = { ru, en }
const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'ru'

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in messages) return stored
  } catch {
    /* almacenamiento bloqueado: se usa el idioma por defecto */
  }
  return DEFAULT_LOCALE
}

const locale = ref(readStoredLocale())
const t = computed(() => messages[locale.value])
const otherLocale = computed(() => (locale.value === 'ru' ? 'en' : 'ru'))

// Sincroniza <html lang>, el título, la meta descripción y la preferencia guardada
watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t.value.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.value.meta.description)
  try {
    localStorage.setItem(STORAGE_KEY, locale.value)
  } catch {
    /* sin almacenamiento: el idioma no se recuerda entre visitas */
  }
})

const toggleLocale = () => (locale.value = otherLocale.value)

/** Devuelve el valor del idioma actual de un objeto { ru, en } */
const localized = (value) =>
  value && typeof value === 'object' ? (value[locale.value] ?? value[DEFAULT_LOCALE]) : value

export function useI18n() {
  return { locale, t, otherLocale, toggleLocale, localized }
}
