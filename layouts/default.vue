<template>
  <div :style="rootStyle" class="root">
    <VHeader :shrink="false" />
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import VHeader from "@/components/VHeader"
export default {
  components: { VHeader },
  computed: mapGetters({ rootStyle: "variables" })
}
</script>

<style>
body {
  margin: 0;
  padding: 0;

  background-color: #f7f8fb;
  overflow-x: hidden;
}
</style>

<style scoped>
.root {
  --primary-color: rgb(138, 14, 14);
  --secondary-color: rgb(7, 134, 100);
  --main-content-reveal-timeout: 600ms;
  --main-content-width: 0;
}

header {
  z-index: 1;
}

.vertical-carousel-container {
  z-index: 1;
}

main {
  background-color: rgb(255, 249, 235);
  min-height: 100vh;
  /* width: var(--main-content-width); */
  width: 55em;
  overflow: hidden;

  position: absolute;
  top: 0;
  right: 0;

  z-index: 2;
}

main.page-enter {
  transform: translateX(100%);
}
main.page-enter-active,
main.page-leave-active {
  transition-duration: var(--main-content-reveal-timeout);
}
main.page-leave {
  transform: translateX(0);
}
main.page-leave-to {
  transform: translateX(100%);
}
</style>
