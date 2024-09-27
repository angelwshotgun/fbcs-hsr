// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from '@primevue/themes/lara';
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@primevue/nuxt-module',
  ],
  unocss: {
    configFile: '../uno.config.ts',
  },
  primevue: {
    options: {
      theme:{
        preset: Aura
      }
    }
  },
  runtimeConfig: {
    // Server-side environment variables
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    public: {
      // Client-side environment variables
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    }
  }
})