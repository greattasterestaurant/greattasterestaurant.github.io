<template>
  <div class="open-close-sign">
    <transition name="hours">
      <Hours v-if="showHours" class="hours" />
    </transition>
    <p @mouseenter="showHours = true" @mouseleave="showHours = false">
      {{ message }}
    </p>
  </div>
</template>

<script>
// The time functions below are not time zone aware. Someone in California
// may see the restaurant as open when it's closed. We'll circle back to
// this when date-fns 2.0 is released with time zone support.
import { addDays, distanceInWords, format } from "date-fns"
import { mapValues } from "lodash"
import isDateThanksgiving from "@/util/is-date-thanksgiving"
import { useHoursStore } from "@/store/hours"

export default {
  setup() {
    const hoursStore = useHoursStore()
    return { hoursStore }
  },
  data: () => ({
    timeUntilSwitch: "",
    showHours: false,
    now: new Date(),
  }),
  computed: {
    open() {
      const { openTime, closeTime } = this.scheduleForToday
      return (
        !this.isThanksgiving && openTime <= this.now && this.now <= closeTime
      )
    },
    scheduleForToday() {
      return this.getScheduleForDate(this.now)
    },
    isThanksgiving() {
      return isDateThanksgiving(this.now)
    },
    isThanksgivingTomorrow() {
      return isDateThanksgiving(addDays(this.now, 1))
    },
    nextOpenTime() {
      const { openTime } = this.scheduleForToday
      const nextOpenDay = addDays(this.now, this.isThanksgivingTomorrow ? 2 : 1)
      return this.now < openTime
        ? openTime
        : this.getScheduleForDate(nextOpenDay).openTime
    },
    timeUntilNextEvent() {
      const { closeTime } = this.scheduleForToday
      const nextEvent = this.open ? closeTime : this.nextOpenTime
      return distanceInWords(this.now, nextEvent, { includeSeconds: false })
    },
    message() {
      if (this.open) {
        return `Open now. Closing in ${this.timeUntilNextEvent}`
      } else if (!this.open && !this.isThanksgiving) {
        return `Closed now. Opening in ${this.timeUntilNextEvent}`
      } else if (!this.open && this.isThanksgiving) {
        return "Closed for Thanksgiving"
      }
    },
  },
  mounted() {
    this.timer = this.tick()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    getDateWithHourMinuteOffset(now, hour, minutes = 0) {
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minutes
      )
    },
    getScheduleForDate(now) {
      const dayOfWeek = format(now, "dddd")
      const map = this.hoursStore.mapDayOfWeekToOpenCloseTimes
      return mapValues(map[dayOfWeek], (hourString) => {
        const [hour, minutes] = hourString.match(/(\d{2}):(\d{2})/).slice(1)
        return this.getDateWithHourMinuteOffset(now, hour, minutes)
      })
    },
    tick: function () {
      this.now = new Date()
      this.timer = setTimeout(this.tick, 1000)
    },
  },
}
</script>

<style scoped>
.open-close-sign {
  line-height: 1.5;
  position: relative;
}
.open-close-sign > p {
  /* Substitute padding for margin so mouseover/mouseout are captured in a
   * larger surface area. */
  margin: 0;
  padding: 1em 0;
}
.hours {
  position: absolute;
  bottom: 3.25em;
  /* While appearing, this indicator overlaps with the trigger area. If the
   * mouse is in this area, this causes the indicator to disappear. Leaving
   * the trigger area then causes it to reappear. Disabling pointer-events
   * on this indicator prevents this thrashing. */
  pointer-events: none;

  padding: 0 0.75em;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  line-height: 1.2;
  border-radius: 3px;
}
.hours::after {
  border-top: 0.75em solid rgba(0, 0, 0, 0.75);
  border-left: 0.75em solid transparent;
  border-right: 0.75em solid transparent;
  display: block;
  content: "";
  margin: auto;
  position: absolute;
  box-sizing: border-box;
  left: calc(50% - 0.75em);
}

@keyframes hours-appear {
  from {
    opacity: 0;
    transform: translateY(1em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hours-enter-active {
  animation: hours-appear 0.2s;
}
.hours-leave-active {
  animation: hours-appear 0.2s reverse;
}
</style>
