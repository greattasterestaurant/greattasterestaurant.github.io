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

<script setup>
import { format } from "date-fns"
import { useReviewsStore } from "@/store/reviews"

const reviewsStore = useReviewsStore()
const reviews = computed(() => reviewsStore.items)

const { apiBase } = useRuntimeConfig()
await reviewsStore.fetch({ apiBase })

// TODO: Use fade transition if not navigating back to the index page.
</script>

<style>
section {
  margin: 2.5em 0;
}
</style>
