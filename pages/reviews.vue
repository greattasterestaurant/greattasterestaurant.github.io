<template>
  <main>
    <p>Reviews</p>
  </main>
</template>

<script>
export default {
  transition(to, from) {
    if (from && from.path !== "/") return "fade"
  }
}
</script>
