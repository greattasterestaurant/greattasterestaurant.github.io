import fetch from "isomorphic-fetch"
import { keyBy } from "lodash"

const urlForResource = resource =>
  process.env.DIRECTUS_ENDPOINT + "/api/1.1/tables/" + resource + "/rows"

const menusUrl = urlForResource("menus")
const menuCategoriesUrl = urlForResource("menu_categories")
const foodUrl = urlForResource("food")

export const state = () => ({
  menus: [],
  menuCategories: [],
  food: [],
  fetching: false,
  lastReceived: null,
  failed: false
})

export const getters = {
  full: ({ menus, menuCategories, food }) =>
    menus.map(menu => ({
      ...menu,
      menuCategories: menuCategories
        .filter(mc => mc.menu.data.id === menu.id)
        .map(mc => ({
          ...mc,
          food: food.filter(f => f.menu_category.data.id === mc.id)
        }))
    })),
  foodById: ({ food }) => keyBy(food, "id")
}

export const mutations = {
  request(state) {
    state.fetching = true
    state.failed = false
  },
  receive(state, payload) {
    state.menus = payload.menus
    state.menuCategories = payload.menuCategories
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
    const [menus, menuCategories, food] = await Promise.all([
      await fetch(menusUrl).then(res => res.json()),
      await fetch(menuCategoriesUrl).then(res => res.json()),
      await fetch(foodUrl).then(res => res.json())
    ])
    commit("receive", {
      menus: menus.data,
      menuCategories: menuCategories.data,
      food: food.data
    })
  }
}
