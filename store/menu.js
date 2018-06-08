import fetch from "isomorphic-fetch"
import { keyBy } from "lodash"

const urlForResource = resource =>
  process.env.DIRECTUS_ENDPOINT + "/api/1.1/tables/" + resource + "/rows"

const menusUrl = urlForResource("menus")
const foodUrl = urlForResource("food")

export const state = () => ({
  menus: [],
  food: [],
  fetching: false,
  lastReceived: null,
  failed: false
})

export const getters = {
  full: ({ menus, food }) => {
    const construct = menu => ({
      ...menu,
      menus: menus
        .filter(x => x.parent && x.parent.data.id === menu.id)
        .map(construct)
        .sort((a, b) => (a.sort < b.sort ? -1 : 1)),
      food: food
        .filter(x => x.menu.data.id === menu.id)
        .sort((a, b) => (a.sort < b.sort ? -1 : 1))
    })
    return menus
      .filter(x => x.parent === null)
      .map(construct)
      .sort((a, b) => (a.sort < b.sort ? -1 : 1))
  },
  foodById: ({ food }) => keyBy(food, "id")
}

export const mutations = {
  request(state) {
    state.fetching = true
    state.failed = false
  },
  receive(state, payload) {
    state.menus = payload.menus
    state.food = payload.food
    state.fetching = false
    state.lastReceived = new Date()
  },
  failed(state) {
    state.failed = true
    state.fetching = false
  }
}

export const actions = {
  async fetch({ commit, state }) {
    if (state.lastReceived) {
      return
    }

    commit("request")
    const [menus, food] = await Promise.all([
      await fetch(menusUrl).then(res => res.json()),
      await fetch(foodUrl).then(res => res.json())
    ])
    commit("receive", {
      menus: menus.data,
      food: food.data
    })
  }
}
