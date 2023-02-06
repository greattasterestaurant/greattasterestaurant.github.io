<template>
  <div :class="{ limitHeight }" class="vertical-carousel-container">
    <VVerticalCarousel :images="images" />
  </div>
</template>

<script setup>
import { useGalleryStore } from "@/store/gallery"

const { apiBase } = useRuntimeConfig()

const galleryStore = useGalleryStore()
const images = galleryStore.images.map((image) => ({
  ...image,
  src: `${apiBase}${image.src}`,
}))

const route = useRoute()
const limitHeight = computed(() => route.path !== "/")
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

@media (max-width: 45em) {
  .vertical-carousel-container {
    width: 100%;
    height: 12em;
    position: static;
    overflow: auto;
  }
}
</style>
