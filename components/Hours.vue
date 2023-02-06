<template>
  <VHours :days="days" />
</template>

<script setup lang="ts">
import { useHoursStore } from '@/store/hours'

const hoursStore = useHoursStore()
const days = hoursStore.display
</script>
