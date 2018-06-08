<template>
  <div class="root">
    <Header />
    <VerticalCarousel />
    <nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header"
import VerticalCarousel from "@/components/VerticalCarousel"
export default {
  components: { Header, VerticalCarousel }
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
  --main-content-width: 55em;
  --vertical-carousel-width: 30vw;
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
  width: var(--main-content-width);
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

@media (max-width: 62em) {
  main {
    position: static;
    width: 100%;
  }

  main.page-enter,
  main.page-enter-to,
  main.page-leave,
  main.page-leave-to {
    transform: none;
  }

  main.page-enter-active,
  main.page-leave-active {
    transition-duration: 0s;
    display: none;
  }
}
</style>
