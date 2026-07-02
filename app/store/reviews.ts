import { defineStore } from 'pinia'
import type { Review } from '@/types/Reviews'

const reviewsUrl = '/api/1.1/tables/reviews/rows'

interface State {
  fetching: boolean
  failed: boolean
  lastReceived: null | Date
  items: Review[]
}

export const useReviewsStore = defineStore('reviews', {
  state: (): State => ({
    fetching: false,
    failed: false,
    lastReceived: null,
    items: []
  }),
  actions: {
    request () {
      this.fetching = true
      this.failed = false
    },
    receive (payload: Review[]) {
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
        const res = await fetch(`${apiBase}${reviewsUrl}`)
        var json = await res.json()
      } catch (err) {
        this.fail()
        throw err
      }
      this.receive(json.data)
    }
  }
})
