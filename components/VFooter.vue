<template>
  <footer>
    <VOpenCloseSign />
    <VContact />
  </footer>
</template>

<script>
import VOpenCloseSign from "@/components/VOpenCloseSign"
import VContact from "@/components/VContact"
export default {
  components: { VOpenCloseSign, VContact }
}
</script>

<style>
footer {
  color: rgb(110, 110, 110);
  padding: 0 0 2em;
}
</style>
