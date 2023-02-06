import { defineStore } from 'pinia'
import { useMenuStore } from '@/store/menu'
import { GalleryItem } from '@/types/Gallery'

const galleryUrl = '/api/1.1/tables/gallery/rows'
const thumbnailUrl = (name: string) => '/thumbnail/600/400/crop/best/' + name

interface State {
  fetching: boolean
  failed: boolean
  lastReceived: null | Date
  items: readonly GalleryItem[]
}

export const useGalleryStore = defineStore('gallery', {
  state: (): State => ({
    fetching: false,
    failed: false,
    lastReceived: null,
    items: []
  }),
  getters: {
    images: (state) => {
      return state.items.map((item) => {
        const menuStore = useMenuStore()
        const food = item.food && menuStore.foodById[item.food.data.id]

        const image = food?.image ?? item.image
        const imageFileName = image?.data.name
        const src = imageFileName ? thumbnailUrl(imageFileName) : null
        return { alt: item.name, src }
      })
    }
  },
  actions: {
    request () {
      this.fetching = true
      this.failed = false
    },
    receive (payload: GalleryItem[]) {
      this.fetching = false
      this.failed = false
      this.lastReceived = new Date()
      this.items = payload
    },
    fail () {
      this.fetching = false
      this.failed = true
    },
    async fetch ({ apiBase }: { apiBase: string }) {
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
    }
  }
})
