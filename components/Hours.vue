<template>
  <VHours :days="days" />
</template>

<script>
import { mapGetters } from "vuex"
import VHours from "@/components/VHours"
export default {
  components: { VHours },
  computed: mapGetters({ days: "hours/display" })
}
</script>
