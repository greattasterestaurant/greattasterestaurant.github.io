<template>
  <footer>
    <OpenCloseSign />
    <VContact />
  </footer>
</template>

<script>
import OpenCloseSign from "@/components/OpenCloseSign"
import VContact from "@/components/VContact"
export default {
  components: { OpenCloseSign, VContact },
}
</script>

<style>
footer {
  color: rgb(110, 110, 110);
  padding: 0 0 2em;
}
</style>
