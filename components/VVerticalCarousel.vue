<template>
  <div class="vertical-carousel">
    <div v-for="image in images" :key="image.src" class="img-container">
      <img :alt="image.alt" :src="image.src">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, default: () => [] }
  }
}
</script>

<style scoped>
.vertical-carousel {
  /* Prevent newlines in markup from creating space in layout */
  font-size: 0;
  overflow: hidden;

  /* Negative margin collapsing isn't consistent across browsers. Disabling it
   * by creating a flexbox as a workaround. */
  display: flex;
  flex-direction: column;

  /* The width of this component is currently a vw unit. So we'll keep our gap
   * that way to stay proportional. */
  --vertical-carousel-gap: 2vw;
}
img {
  width: 100%;
}
.img-container {
  transition-duration: 0.5s;
  box-shadow: 0 0 calc(10 * var(--vertical-carousel-gap)) 3px rgba(0, 0, 0, 0.8);
  margin: calc(-1 * var(--vertical-carousel-gap)) 0;
}
.img-container:first-child {
  margin-top: 0;
}
.img-container:hover {
  margin: 0 0 var(--vertical-carousel-gap);
}
.img-container:last-child:hover {
  margin: 0;
}
</style>
