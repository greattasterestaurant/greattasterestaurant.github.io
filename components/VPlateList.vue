<template>
  <ul v-if="food.length > 0">
    <li v-for="plate in food" :key="plate.id">
      <span class="price">{{ plate.price }}</span>
      <span>{{ plate.name }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Plate {
  readonly id: number
  readonly price: string
  readonly name: string
}

const props = defineProps<{
  readonly food: readonly Plate[]
}>()
</script>

<style>
.price {
  text-align: right;
  color: #711d1d;
}
</style>
