module.exports = {
  plugins: ["@/plugins/vuex-router-sync.js"],
  modules: ["@nuxtjs/dotenv"],
  loading: false,
  transition: {
    mode: "in-out"
  },
  router: {
    scrollBehavior: () => false
  }
}
