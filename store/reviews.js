import fetch from "isomorphic-fetch"

const reviewsUrl =
  process.env.DIRECTUS_ENDPOINT + "/api/1.1/tables/reviews/rows"

export const state = () => ({
  fetching: false,
  failed: false,
  lastReceived: null,
  items: []
})

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
    try {
      const res = await fetch(reviewsUrl)
      var json = await res.json()
    } catch (err) {
      commit("failed")
      throw err
    }
    commit("receive", json.data)
  }
}
