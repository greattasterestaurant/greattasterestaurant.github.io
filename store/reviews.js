import fetch from "isomorphic-fetch"
import { defineStore } from "pinia"

const reviewsUrl = "/api/1.1/tables/reviews/rows"

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    fetching: false,
    failed: false,
    lastReceived: null,
    items: []
  }),
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
