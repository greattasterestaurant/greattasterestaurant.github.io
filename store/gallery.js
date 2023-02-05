import fetch from "isomorphic-fetch"

const galleryUrl = "/api/1.1/tables/gallery/rows"

const thumbnailUrl = name => "/thumbnail/600/400/crop/best/" + name

export const state = () => ({
  fetching: false,
  failed: false,
  lastReceived: null,
  items: []
})

export const getters = {
  images: (state, getters, rootState, rootGetters) =>
    state.items.map(item => {
      const food = item.food && rootGetters["menu/foodById"][item.food.data.id]
      const imageFileName = food
        ? food.image.data.name
        : item.image && item.image.data.name
      const src = imageFileName ? thumbnailUrl(imageFileName) : null
      return { alt: item.name, src }
    })
}

export const mutations = {
  request(state) {
    state.fetching = true
    state.failed = false
  },
  receive(state, payload) {
    state.fetching = false
    state.failed = false
    state.lastReceived = new Date()
    state.items = payload
  },
  failed(state) {
    state.fetching = false
    state.failed = true
  }
}

export const actions = {
  async fetch({ commit, state }, { apiBase }) {
    if (state.lastReceived || state.fetching) {
      return
    }

    commit("request")
    try {
      const res = await fetch(`${apiBase}${galleryUrl}`)
      var json = await res.json()
    } catch (err) {
      commit("failed")
      throw err
    }
    commit("receive", json.data)
  }
}
