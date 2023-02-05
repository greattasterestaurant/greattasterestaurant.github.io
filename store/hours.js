import fetch from "isomorphic-fetch"

const hoursUrl = "/api/1.1/tables/hours/rows"

export const state = () => ({
  fetching: false,
  failed: false,
  lastReceived: null,
  items: []
})

function formatHourString(str) {
  let [hour, minutes] = /(\d{2}):(\d{2})/.exec(str).slice(1)
  const meridian = hour >= 12 ? "pm" : "am"
  hour = hour === 0 ? 12 : hour
  hour = hour > 12 ? hour - 12 : hour

  return minutes === "00"
    ? `${hour}${meridian}`
    : `${hour}:${minutes}${meridian}`
}

export const getters = {
  display: state =>
    state.items.map(day => ({
      dayOfWeek: day.day_of_week,
      openTime: formatHourString(day.open_time),
      closeTime: formatHourString(day.close_time)
    })),
  mapDayOfWeekToOpenCloseTimes: state =>
    state.items.reduce(
      (acc, el) => ({
        ...acc,
        [el.day_of_week]: { openTime: el.open_time, closeTime: el.close_time }
      }),
      {}
    )
}

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
  async fetch({ commit, state }, { apiBase }) {
    if (state.lastReceived || state.fetching) {
      return
    }

    commit("request")
    try {
      const res = await fetch(`${apiBase}${hoursUrl}`)
      var json = await res.json()
    } catch (err) {
      commit("failed")
      throw err
    }
    commit("receive", json.data)
  }
}
