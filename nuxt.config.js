module.exports = {
  plugins: ["@/plugins/vuex-router-sync.js"],
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
    pageTransition: {
      name: "page",
      mode: "in-out"
    }
  },
  router: {
    scrollBehavior: () => false
  }
}
