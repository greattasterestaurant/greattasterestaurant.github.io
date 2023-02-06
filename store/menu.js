import fetch from "isomorphic-fetch"
import { keyBy } from "lodash"
import { defineStore } from "pinia"

const urlForResource = resource => "/api/1.1/tables/" + resource + "/rows"

const menusUrl = urlForResource("menus")
const foodUrl = urlForResource("food")

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
    food: [],
    fetching: false,
    lastReceived: null,
    failed: false
  }),
  getters: {
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
  },
  actions: {
    request() {
      this.fetching = true
      this.failed = false
    },
    receive(payload) {
      this.menus = payload.menus
      this.food = payload.food
      this.fetching = false
      this.lastReceived = new Date()
    },
    fail() {
      this.failed = true
      this.fetching = false
    },
    async fetch({ apiBase }) {
      if (this.lastReceived || this.fetching) {
        return
      }

      this.request()
      try {
        var [menus, food] = await Promise.all([
          await fetch(`${apiBase}${menusUrl}`).then(res => res.json()),
          await fetch(`${apiBase}${foodUrl}`).then(res => res.json())
        ])
      } catch (err) {
        this.fail()
        throw err
      }
      this.receive({
        menus: menus.data,
        food: food.data
      })
    }
  }
})
