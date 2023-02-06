<template>
  <div>
    <dl>
      <template v-for="day in possiblyCondensedDays" :key="day.id">
        <dt>{{ day.dayOfWeek }}</dt>
        <dd>{{ day.openTime }}–{{ day.closeTime }}</dd>
      </template>
    </dl>
    <p>Open 364 days. Closed on Thanksgiving.</p>
  </div>
</template>

<script>
export default {
  props: {
    condensed: { type: Boolean, default: true },
    days: { type: Array, default: () => [] },
  },
  computed: {
    possiblyCondensedDays() {
      if (!this.condensed) {
        return this.days
      }

      return this.days.reduce((acc, current) => {
        const last = acc.pop()
        const continuous =
          last &&
          last.openTime === current.openTime &&
          last.closeTime === current.closeTime
        const continuousDaysOfWeek =
          continuous &&
          (last.dayOfWeek.includes("–")
            ? last.dayOfWeek.replace(/–.*/, "–" + current.dayOfWeek)
            : last.dayOfWeek + "–" + current.dayOfWeek)
        const includeLast = !continuous && last
        return [
          ...acc,
          ...(includeLast ? [last] : []),
          {
            dayOfWeek: continuous ? continuousDaysOfWeek : current.dayOfWeek,
            openTime: current.openTime,
            closeTime: current.closeTime,
          },
        ]
      }, [])
    },
  },
}
</script>

<style scoped>
dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 1em;
}
dd {
  margin: 0;
}
</style>
