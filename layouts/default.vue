<template>
  <div class="root">
    <Header />
    <VerticalCarousel />
    <slot />
  </div>
</template>

<script>
import Header from "@/components/Header"
import VerticalCarousel from "@/components/VerticalCarousel"
export default {
  components: { Header, VerticalCarousel }
}
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

main.page-enter-from {
  transform: translateX(100%);
}
main.page-enter-active,
main.page-leave-active {
  transition-duration: var(--main-content-reveal-timeout);
}
main.page-leave-from {
  transform: translateX(0);
}
main.page-leave-to {
  transform: translateX(100%);
}

main.fade-enter-from {
  opacity: 0;
}
main.fade-enter-active {
  transition-duration: 100ms;
}
main.fade-enter-to {
  opacity: 1;
}

@media (max-width: 62em) {
  main {
    position: static;
    width: 100%;
    height: auto;
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
