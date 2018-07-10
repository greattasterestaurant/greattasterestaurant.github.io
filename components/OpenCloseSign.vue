<template>
  <div
    class="open-close-sign"
    @mouseover="showHours = true"
    @mouseout="showHours = false">
    <transition name="hours">
      <Hours v-if="showHours" class="hours" />
    </transition>
    <p v-if="open">Open now. Closing in {{ timeUntilSwitch }}.</p>
    <p v-if="!open && !isThanksgiving">Closed now. Opening in {{ timeUntilSwitch }}.</p>
    <p v-if="!open && isThanksgiving">Closed for Thanksgiving.</p>
  </div>
</template>

<script>
import { addDays, distanceInWords, format, startOfTomorrow } from "date-fns"
import { mapValues } from "lodash"
import Hours from "@/components/Hours"
export default {
  components: { Hours },
  data: () => ({
    open: false,
    timeUntilSwitch: "",
    isThanksgiving: false,
    showHours: false
  }),
  created() {
    this.updateData()
  },
  mounted() {
    this.timer = this.tick()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    // The time functions below are not time zone aware. Someone in California
    // may see the restaurant as open when it's closed. We'll circle back to
    // this when date-fns 2.0 is released with time zone support.
    isDateThanksgiving(date) {
      const isNovember = date.getMonth() === 10
      const isThursday = date.getDay() === 4
      const isWithinDayOfMonth = 22 <= date.getDate() && date.getDate() <= 28
      return isNovember && isThursday && isWithinDayOfMonth
    },
    getDateWithHourMinuteOffset(now, hour, minutes = 0) {
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minutes
      )
    },
    getTimesForDate(now) {
      const dayOfWeek = format(now, "dddd")
      const map = this.$store.getters["hours/mapDayOfWeekToOpenCloseTimes"]
      return mapValues(map[dayOfWeek], hourString => {
        const [hour, minutes, seconds] = hourString
          .match(/(\d{2}):(\d{2}):(\d{2})/)
          .slice(1)
        return { hour, minutes, seconds }
      })
    },
    getOpenTimeForDate(now) {
      const { hour, minutes } = this.getTimesForDate(now).openTime
      return this.getDateWithHourMinuteOffset(now, hour, minutes)
    },
    getCloseTimeForDate(now) {
      const { hour, minutes } = this.getTimesForDate(now).closeTime
      return this.getDateWithHourMinuteOffset(now, hour, minutes)
    },
    updateData() {
      const now = new Date()
      const openTime = this.getOpenTimeForDate(now)
      const closeTime = this.getCloseTimeForDate(now)
      const isThanksgiving = this.isDateThanksgiving(now)
      const isThanksgivingTomorrow = this.isDateThanksgiving(startOfTomorrow())

      this.open = !isThanksgiving && openTime <= now && now <= closeTime
      const nextOpenTime =
        now < openTime
          ? openTime
          : isThanksgivingTomorrow
            ? this.getOpenTimeForDate(addDays(startOfTomorrow(), 1))
            : this.getOpenTimeForDate(startOfTomorrow())

      const nextEvent = this.open ? closeTime : nextOpenTime
      this.timeUntilSwitch = distanceInWords(now, nextEvent, {
        includeSeconds: false
      })
      this.isThanksgiving = isThanksgiving
    },
    tick() {
      this.updateData()
      this.timer = setTimeout(() => this.tick(), 1000)
    }
  }
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
