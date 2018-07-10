export const getters = {
  mainContentShown: state => state.route.path !== "/"
}

export const actions = {
  async nuxtServerInit(store) {
    await Promise.all([
      store.dispatch("gallery/fetch"),
      store.dispatch("menu/fetch"),
      store.dispatch("hours/fetch")
    ])
  }
}
