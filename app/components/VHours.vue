<template>
  <div>
    <dl>
      <template v-for="day in condensedDays" :key="day.days">
        <dt>{{ day.days }}</dt>
        <dd>
          {{ day.hours.length === 0
            ? 'Closed'
            : day.hours.map(hours => `${hours.openTime}–${hours.closeTime}`).join(', ')
          }}
        </dd>
      </template>
    </dl>
    <p>Open 364 days. Closed on Thanksgiving.</p>
  </div>
</template>

<script setup lang="ts">
import type { DayOfWeek } from '~/types/Hours'
import { condenseDays } from '~/util/condense-days'

interface Day {
  dayOfWeek: DayOfWeek
  openTime: string
  closeTime: string
}

const props = defineProps<{
  days: readonly Day[]
}>()

const condensedDays = computed(() => condenseDays(props.days))
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
