<template>
  <div>
    <dl>
      <template v-for="day in possiblyCondensedDays" :key="day.dayOfWeek">
        <dt>{{ day.dayOfWeek }}</dt>
        <dd>{{ day.openTime }}–{{ day.closeTime }}</dd>
      </template>
    </dl>
    <p>Open 364 days. Closed on Thanksgiving.</p>
  </div>
</template>

<script setup lang="ts">
import { condenseDays } from '~/util/condense-days'

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

  return condenseDays(props.days)
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
