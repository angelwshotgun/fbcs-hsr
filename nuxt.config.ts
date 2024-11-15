// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from '@primevue/themes/lara';
import Aura from '@primevue/themes/aura';
import path from 'path';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@hypernym/nuxt-anime',
  ],
  unocss: {
    configFile: '../uno.config.ts',
  },
  css: [path.resolve(__dirname, 'assets/global.scss'), 'primeicons/primeicons.css'],
  primevue: {
    options: {
      theme:{
        preset: Aura
      }
    }
  },
  googleFonts: {
    families: {
      Exo: true,
      'Tilt Neon': true,
    },
    preload: true,
  },
  runtimeConfig: {
    // Server-side environment variables
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    public: {
      // Client-side environment variables
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    }
  },
  anime: {
    provide: true
  },
  plugins: [
    '~/plugins/loadData.js'
  ]
})