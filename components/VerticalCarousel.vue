<template>
  <div :class="{ limitHeight }" class="vertical-carousel-container">
    <VVerticalCarousel :images="images" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import VVerticalCarousel from "@/components/VVerticalCarousel"

export default {
  components: { VVerticalCarousel },
  computed: mapGetters({
    limitHeight: "mainContentShown",
    images: "gallery/images"
  })
}
</script>

<style>
.vertical-carousel-container {
  width: var(--vertical-carousel-width);
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
}

.limitHeight {
  max-height: 100vh;
  overflow: auto;
}
</style>
