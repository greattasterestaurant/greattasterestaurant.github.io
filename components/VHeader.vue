<template>
  <header :class="{ shrink }">
    <div class="logo-nav-container">
      <VLogo />
      <VNav />
    </div>
    <VContact />
  </header>
</template>

<script>
import VContact from "@/components/VContact"
import VLogo from "@/components/VLogo"
import VNav from "@/components/VNav"
export default {
  components: { VContact, VLogo, VNav },
  props: {
    shrink: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
header {
  position: fixed;

  background-size: cover;
  background-position: top center;
  text-align: center;

  height: 100vh;
  min-height: 25em;
  max-height: 80em;
  padding: 1em;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  line-height: 1;

  width: 100vw;
  flex-shrink: 0;
  transition: transform var(--main-content-reveal-timeout);
  transform: translateX(calc(-1 / 2 * var(--main-content-width)));
}

.logo-nav-container {
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.shrink {
  width: 23rem;
}

@media (max-width: 25rem) {
  header {
    font-size: 0.8em;
    max-height: 40em;
  }
}
</style>
