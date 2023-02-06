export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiBase: process.env.DIRECTUS_ENDPOINT
    }
  },
  loading: false,
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  app: {
    layoutTransition: { name: "layout", mode: "default" },
    pageTransition: { name: "page", mode: "out-in" }
  },
  router: {
    scrollBehavior: () => false
  }
})
