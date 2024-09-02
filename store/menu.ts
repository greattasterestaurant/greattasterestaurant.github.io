import lodash from 'lodash'
import { defineStore } from 'pinia'
import type { Food } from '~~/types/Food'
import type { Menu } from '~~/types/Menus'

const { keyBy } = lodash

const urlForResource = (resource: string) =>
  '/api/1.1/tables/' + resource + '/rows'

const menusUrl = urlForResource('menus')
const foodUrl = urlForResource('food')

interface State {
  fetching: boolean
  failed: boolean
  lastReceived: null | Date
  menus: readonly Menu[]
  food: readonly Food[]
}

interface TreeMenu extends Menu {
  menus: TreeMenu[]
  food: Food[]
}

export const useMenuStore = defineStore('menu', {
  state: (): State => ({
    menus: [],
    food: [],
    fetching: false,
    lastReceived: null,
    failed: false
  }),
  getters: {
    full: ({ menus, food }) => {
      const construct = (menu: Menu): TreeMenu => ({
        ...menu,
        menus: menus
          .filter(x => x.parent && x.parent.data.id === menu.id)
          .map(construct)
          .sort((a, b) => (a.sort < b.sort ? -1 : 1)),
        food: food
          .filter(x => x.menu?.data.id === menu.id)
          .sort((a, b) => (a.sort < b.sort ? -1 : 1))
      })
      return menus
        .filter(x => x.parent === null)
        .map(construct)
        .sort((a, b) => (a.sort < b.sort ? -1 : 1))
    },
    foodById: ({ food }) => keyBy(food, 'id')
  },
  actions: {
    request () {
      this.fetching = true
      this.failed = false
    },
    receive (payload: { menus: Menu[]; food: Food[] }) {
      this.menus = payload.menus
      this.food = payload.food
      this.fetching = false
      this.lastReceived = new Date()
    },
    fail () {
      this.failed = true
      this.fetching = false
    },
    async fetch ({ apiBase }: { apiBase: string }) {
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
