<template>
  <header>
    <div class="logo-nav-container">
      <VLogo />
      <VNav />
    </div>
    <VFooter />
  </header>
</template>

<script>
import VFooter from "@/components/VFooter"
import VLogo from "@/components/VLogo"
import VNav from "@/components/VNav"
export default {
  components: { VFooter, VLogo, VNav },
}
</script>

<style scoped>
header {
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
}

.logo-nav-container {
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 25rem) {
  header {
    font-size: 0.8em;
    max-height: 40em;
  }
}
</style>
