<template>
  <main>
    <h1>Restaurant Hours</h1>
    <VHours />
  </main>
</template>

<script>
import VHours from "@/components/VHours"
export default {
  transition(to, from) {
    if (from && from.path !== "/") return "fade"
  },
  components: { VHours }
}
</script>
