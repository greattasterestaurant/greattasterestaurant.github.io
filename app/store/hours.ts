import { defineStore } from 'pinia'
import type { Hours } from '@/types/Hours'

const hoursUrl = '/api/1.1/tables/hours/rows'

interface State {
  fetching: boolean
  failed: boolean
  lastReceived: null | Date
  items: readonly Hours[]
}

export const useHoursStore = defineStore('hours', {
  state: (): State => ({
    fetching: false,
    failed: false,
    lastReceived: null,
    items: []
  }),
  getters: {
    display: state =>
      state.items.map(day => ({
        dayOfWeek: day.day_of_week,
        openTime: formatHourString(day.open_time),
        closeTime: formatHourString(day.close_time)
      })),
    mapDayOfWeekToOpenCloseTimes: (
      state
    ): Record<string, { openTime: string; closeTime: string }> =>
      state.items.reduce(
        (acc, el) => ({
          ...acc,
          [el.day_of_week]: {
            openTime: el.open_time,
            closeTime: el.close_time
          }
        }),
        {}
      )
  },
  actions: {
    request () {
      this.fetching = true
      this.failed = false
    },
    receive (payload: readonly Hours[]) {
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
        const res = await fetch(`${apiBase}${hoursUrl}`)
        var json = await res.json()
      } catch (err) {
        this.fail()
        throw err
      }
      this.receive(json.data)
    }
  }
})

function formatHourString (str: string) {
  const exec = /(\d{2}):(\d{2})/.exec(str)
  if (exec === null) {
    throw new Error(`Failed to format hour string: ${str}`)
  }

  const [hourStr, minutes] = exec.slice(1)
  let hour = Number(hourStr)
  const meridian = hour >= 12 ? 'pm' : 'am'
  hour = hour === 0 ? 12 : hour
  hour = hour > 12 ? hour - 12 : hour

  return minutes === '00'
    ? `${hour}${meridian}`
    : `${hour}:${minutes}${meridian}`
}
