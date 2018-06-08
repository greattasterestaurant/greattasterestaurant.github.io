import fetch from "isomorphic-fetch"

const galleryUrl =
  process.env.DIRECTUS_ENDPOINT + "/api/1.1/tables/gallery/rows"

const thumbnailUrl = name =>
  process.env.DIRECTUS_ENDPOINT + "/thumbnail/600/400/crop/best/" + name

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
  async fetch({ commit, state }) {
    if (state.lastReceived || state.fetching) {
      return
    }

    commit("request")
    const res = await fetch(galleryUrl)
    const json = await res.json()
    commit("receive", json.data)
  }
}
