<template>
  <main>
    <h1>Reviews</h1>
    <section v-for="review in reviews" :key="review.id">
      {{ "⭐️".repeat(review.rating) }}
      <strong>{{ review.author }}</strong>
      {{ format(review.date, "MMMM Mo, GGGG") }}
      <p>{{ review.body }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex"
import { format } from "date-fns"
export default {
  fetch({ store }) {
    return store.dispatch("reviews/fetch")
  },
  transition(to, from) {
    if (from && from.path !== "/") return "fade"
  },
  computed: mapState({ reviews: state => state.reviews.items }),
  methods: { format }
}
</script>

<style>
section {
  margin: 2.5em 0;
}
</style>
