<template>
  <div class="root">
    <Header />
    <VerticalCarousel />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useGalleryStore } from "@/store/gallery"
import { useHoursStore } from "@/store/hours"
import { useMenuStore } from "@/store/menu"

const { apiBase } = useRuntimeConfig()

await Promise.all([
  useGalleryStore().fetch({ apiBase }),
  useHoursStore().fetch({ apiBase }),
  useMenuStore().fetch({ apiBase }),
])
</script>

<style scoped>
.root {
  --primary-color: rgb(138, 14, 14);
  --secondary-color: rgb(7, 134, 100);
  --main-content-reveal-timeout: 600ms;
  --main-content-width: 55em;
  --vertical-carousel-width: 30vw;
}

@media (max-width: 85em) {
  .root {
    --main-content-width: calc(100vw - 30em);
  }
}

@media (max-width: 75em) {
  .root {
    --main-content-width: calc(100vw - 24em);
  }
}
</style>

<style>
@import url("https://fonts.googleapis.com/css?family=Bad+Script|Libre+Baskerville:400,700|Open+Sans:400,700");

body {
  margin: 0;
  padding: 0;

  background-color: #f7f8fb;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

header {
  z-index: 1;
}

.vertical-carousel-container {
  z-index: 1;
}

main {
  background-color: rgb(255, 249, 235);
  height: 100vh;
  padding: 0 1em;
  box-sizing: border-box;
  width: var(--main-content-width);
  overflow: hidden;

  position: fixed;
  top: 0;
  right: 0;
  overflow: auto;

  z-index: 2;
}
/* Firefox doesn't scroll the bottom padding of an overflow: auto container.
 * This is a workaround */
main::after {
  content: "";
  display: block;
  height: 5em;
}

.layout-enter-from {
  transform: translateX(100%);
}
.layout-enter-active,
.layout-leave-active {
  transition-duration: var(--main-content-reveal-timeout);
}
.layout-leave-from {
  transform: translateX(0);
}
.layout-leave-to {
  transform: translateX(100%);
}

.page-enter-from {
  opacity: 0;
}
.page-enter-active {
  transition-duration: 100ms;
}
.page-enter-to {
  opacity: 1;
}

@media (max-width: 62em) {
  main {
    position: static;
    width: 100%;
    height: auto;
  }

  .page-enter,
  .page-enter-to,
  .page-leave,
  .page-leave-to {
    transform: none;
  }

  .page-enter-active,
  .page-leave-active {
    transition-duration: 0s;
    display: none;
  }
}
</style>
