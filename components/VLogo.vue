<template>
  <div :class="{ shrink }">
    <nuxt-link to="/">
      <h1>Great Taste</h1>
      <span class="tagline">Chinese Restaurant</span>
    </nuxt-link>
    <span class="characters">
      <span class="character">揚</span>
      <span class="character">子</span>
      <span class="character">江</span>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    shrink: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
div {
  display: flex;
  position: relative;
  transition: transform 600ms;
}

.shrink {
  transform: translateX(-5%) scale(0.8);
}

:deep(a) {
  color: inherit;
  text-decoration: none;
}

h1 {
  font-size: 3.5em;
  margin: 0;
  font-family: "Libre Baskerville";
  color: var(--primary-color);
}

.tagline {
  display: inline-block;
  color: var(--secondary-color);
  font-size: 1.65em;
  font-family: "Libre Baskerville";
  margin-top: 0.75em;
}

.characters {
  font-size: 1.5em;
  line-height: 1.25;
  padding: 0 1.25em;

  /* Use absolute positioning to take the Yangtze River characters
   * out of the document flow. This allows the title and subtitle
   * stay centered. */
  position: absolute;
  left: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character {
  animation: character-appear 0.75s backwards;
  display: block;
}

.character:nth-child(1) {
  animation-delay: 0.25s;
}
.character:nth-child(2) {
  animation-delay: 0.5s;
}
.character:nth-child(3) {
  animation-delay: 0.75s;
}

@keyframes character-appear {
  from {
    opacity: 0;
    transform: translateX(-0.5em);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 35em) {
  .characters {
    display: none;
  }
}
</style>
