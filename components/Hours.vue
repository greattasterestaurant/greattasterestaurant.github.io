<template>
  <VHours :days="days" />
</template>

<script setup>
import { useHoursStore } from "@/store/hours"

const hoursStore = useHoursStore()
const days = hoursStore.display
</script>
