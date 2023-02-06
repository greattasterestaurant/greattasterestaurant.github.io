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

<script setup lang="ts">
interface Day {
  dayOfWeek: string
  openTime: string
  closeTime: string
}

const props = defineProps<{
  noCondense?: boolean
  days: readonly Day[]
}>()

const possiblyCondensedDays = computed(() => {
  if (props.noCondense) {
    return props.days
  }

  return props.days.reduce((acc: Day[], current: Day): Day[] => {
    const last = acc.pop()
    const continuous =
      last?.openTime === current.openTime &&
      last.closeTime === current.closeTime
    const continuousDaysOfWeek = continuous
      ? last.dayOfWeek.includes('–')
        ? last.dayOfWeek.replace(/–.*/, '–' + current.dayOfWeek)
        : last.dayOfWeek + '–' + current.dayOfWeek
      : null
    const includeLast = !continuous && last
    return [
      ...acc,
      ...(includeLast ? [last] : []),
      {
        dayOfWeek: continuousDaysOfWeek ?? current.dayOfWeek,
        openTime: current.openTime,
        closeTime: current.closeTime
      }
    ]
  }, [])
})
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
