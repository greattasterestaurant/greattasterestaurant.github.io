<template>
  <div>
    <h1>Reviews</h1>
    <section v-for="review in reviews" :key="review.id">
      {{ "⭐️".repeat(review.rating) }}
      <strong>{{ review.author }}</strong>
      {{ format(parse(review.date, "yyyy-MM-dd HH:mm:ss", new Date()), "MMMM do, yyyy") }}
      <p>{{ review.body }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { format, parse } from "date-fns"
import { useReviewsStore } from "@/store/reviews"

const reviewsStore = useReviewsStore()
const reviews = computed(() => reviewsStore.items)

const { apiBase } = useRuntimeConfig()
await reviewsStore.fetch({ apiBase })
</script>

<style>
section {
  margin: 2.5em 0;
}
</style>
