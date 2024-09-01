export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  // Recommended to be set when running nuxt dev.
  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: '2024-09-01',

  runtimeConfig: {
    public: {
      apiBase: process.env.DIRECTUS_ENDPOINT
    }
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'default' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Great Taste',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  typescript: {
    typeCheck: true
  }
})
