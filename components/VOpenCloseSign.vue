<template>
  <div
    class="open-close-sign"
    @mouseover="showHours = true"
    @mouseout="showHours = false">
    <transition name="hours">
      <div v-if="showHours" class="hours">
        <p>
          Monday to Thursday: 11am-10pm<br>
          Friday to Saturday: 11am-11pm<br>
          Sunday: 12pm-10pm
        </p>
        <p>Open 364 days. Closed on Thanksgiving</p>
      </div>
    </transition>
    <p v-if="open">Open now. Closing in {{ timeUntilSwitch }}.</p>
    <p v-if="!open && !isThanksgiving">Closed now. Opening in {{ timeUntilSwitch }}.</p>
    <p v-if="!open && isThanksgiving">Closed for Thanksgiving.</p>
  </div>
</template>

<script>
import { addDays, distanceInWords, startOfTomorrow } from "date-fns"
export default {
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
    getDateWithHourOffset(now, hour) {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
    },
    getOpenTimeForDate(now) {
      const isSunday = now.getDay() === 0
      return isSunday
        ? this.getDateWithHourOffset(now, 12)
        : this.getDateWithHourOffset(now, 11)
    },
    getCloseTimeForDate(now) {
      const isFridayOrSaturday = now.getDay() === 5
      return isFridayOrSaturday
        ? this.getDateWithHourOffset(now, 23)
        : this.getDateWithHourOffset(now, 22)
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

      this.timeUntilSwitch = distanceInWords(
        now,
        this.open ? closeTime : nextOpenTime,
        { includeSeconds: false }
      )
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
