<template>
  <main>
    <h1>Restaurant Hours</h1>
    <Hours />
  </main>
</template>

<script>
import Hours from "@/components/Hours"
export default {
  transition(to, from) {
    if (from && from.path !== "/") return "fade"
  },
  components: { Hours }
}
</script>
