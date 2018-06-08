export const getters = {
  mainContentShown: state => state.route.path !== "/"
}

export const actions = {
  async nuxtServerInit(store) {
    await store.dispatch("gallery/fetch")
    await store.dispatch("menu/fetch")
  }
}
