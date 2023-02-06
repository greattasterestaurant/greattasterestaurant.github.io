import fetch from "isomorphic-fetch"
import { defineStore } from "pinia"
import { useMenuStore } from "@/store/menu"

const galleryUrl = "/api/1.1/tables/gallery/rows"
const thumbnailUrl = (name) => "/thumbnail/600/400/crop/best/" + name

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    fetching: false,
    failed: false,
    lastReceived: null,
    items: [],
  }),
  getters: {
    images: (state) => {
      return state.items.map((item) => {
        const menuStore = useMenuStore()
        const food = item.food && menuStore.foodById[item.food.data.id]

        const imageFileName = food
          ? food.image.data.name
          : item.image && item.image.data.name
        const src = imageFileName ? thumbnailUrl(imageFileName) : null
        return { alt: item.name, src }
      })
    },
  },
  actions: {
    request() {
      this.fetching = true
      this.failed = false
    },
    receive(payload) {
      this.fetching = false
      this.failed = false
      this.lastReceived = new Date()
      this.items = payload
    },
    fail() {
      this.fetching = false
      this.failed = true
    },
    async fetch({ apiBase }) {
      if (this.lastReceived || this.fetching) {
        return
      }

      this.request()
      try {
        const res = await fetch(`${apiBase}${galleryUrl}`)
        var json = await res.json()
      } catch (err) {
        this.fail()
        throw err
      }
      this.receive(json.data)
    },
  },
})
