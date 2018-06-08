<template>
  <VHeader :class="{ mainContentShown }" />
</template>

<script>
import { mapGetters } from "vuex"
import VHeader from "@/components/VHeader"
export default {
  components: { VHeader },
  computed: mapGetters(["mainContentShown"])
}
</script>

<style scoped>
header {
  position: fixed;
  transform: translateX(calc(-1 / 2 * var(--vertical-carousel-width)));
}
.mainContentShown {
  transform: translateX(calc(-1 / 2 * var(--main-content-width)));
}
@media (max-width: 62em) {
  header {
    position: static;
    transform: none;
  }
  .mainContentShown {
    transform: none;
  }
}
</style>
