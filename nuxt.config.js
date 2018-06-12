module.exports = {
  plugins: ["@/plugins/vuex-router-sync.js"],
  modules: ["@nuxtjs/dotenv"],
  loading: false,
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  transition: {
    mode: "in-out"
  },
  router: {
    scrollBehavior: () => false
  }
}
