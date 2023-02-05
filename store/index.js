export const getters = {
  mainContentShown: state => state.route.path !== "/"
}

export const actions = {
  async nuxtServerInit(store, { $config }) {
    await Promise.all([
      store.dispatch("gallery/fetch", { apiBase: $config.apiBase }),
      store.dispatch("menu/fetch", { apiBase: $config.apiBase }),
      store.dispatch("hours/fetch", { apiBase: $config.apiBase })
    ])
  }
}
