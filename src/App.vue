<script setup>
import { useI18n } from './i18n'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ApproachSection from './components/ApproachSection.vue'
import AiSection from './components/AiSection.vue'
import PathSection from './components/PathSection.vue'
import ContactsSection from './components/ContactsSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { t } = useI18n()
</script>

<template>
  <a href="#main" class="skip-link">{{ t.a11y.skip }}</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <AboutSection />
    <PortfolioSection />
    <ApproachSection />
    <AiSection />
    <PathSection />
    <ContactsSection />
  </main>
  <SiteFooter />
</template>
