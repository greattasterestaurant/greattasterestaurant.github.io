<template>
  <div class="vertical-carousel">
    <div v-for="image in images" :key="image.src" class="img-container">
      <img :alt="image.alt" :src="image.src">
      <span class="explanation" aria-hidden="true">{{ image.alt }}</span>
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
  position: relative;
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
.explanation {
  display: block;
  font-size: 1rem;

  position: absolute;
  bottom: calc(1.5 * var(--vertical-carousel-gap));
  right: var(--vertical-carousel-gap);

  padding: 0.4em 0.8em;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 3px;

  opacity: 0;
  transition-duration: 0.3s;
  font-family: "Libre Baskerville";
}
.img-container:hover .explanation {
  opacity: 1;
}
</style>
