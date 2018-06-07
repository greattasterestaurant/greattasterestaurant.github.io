<template>
  <div class="vertical-carousel-container">
    <VerticalCarousel />
  </div>
</template>

<script>
import VerticalCarousel from "@/components/VerticalCarousel"
export default {
  async fetch({ store }) {
    await store.dispatch("gallery/fetch")
    await store.dispatch("menu/fetch")
  },
  components: { VerticalCarousel }
}
</script>

<style scoped>
.vertical-carousel-container {
  width: 30vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
}
.page-enter-active {
  transform: none;
}
</style>
