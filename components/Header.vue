<template>
  <VHeader :class="{ mainContentShown }" />
</template>

<script setup lang="ts">
const route = useRoute()
const mainContentShown = computed(() => route.path !== '/')
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
  .mainContentShown {
    position: static;
    transform: translateX(calc(-1 / 2 * var(--vertical-carousel-width)));
  }
}
@media (max-width: 45em) {
  header,
  .mainContentShown {
    position: static;
    transform: none;
  }
}
</style>
