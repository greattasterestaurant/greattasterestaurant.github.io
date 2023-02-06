<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link.to">
        <nuxt-link :to="link.to" @click.native="click">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  data: () => ({
    links: [
      { to: "/menu", text: "Menu" },
      { to: "/hours", text: "Hours" },
      { to: "/reviews", text: "Reviews" },
    ],
  }),
  methods: {
    click() {
      const styles = window.getComputedStyle(document.body)
      const emToPx = styles["font-size"].slice(0, -2)
      // TODO: Don't hard code this.
      const wrapBreakpoint = 62 * emToPx
      if (document.documentElement.clientWidth < wrapBreakpoint) {
        const $main = document.querySelector("main")
        $main.scrollIntoView({ behavior: "smooth" })
      }
    },
  },
}
</script>

<style scoped>
nav {
  font-family: "Bad Script";
  margin-top: 5em;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

li {
  animation: appear 1s backwards;
}

li:nth-child(1) {
  animation-delay: 0.25;
}
li:nth-child(2) {
  animation-delay: 0.35s;
}
li:nth-child(3) {
  animation-delay: 0.45s;
}

li a {
  padding: 0 0.5em;
  text-decoration: none;
  color: black;
  font-size: 1.4em;
}

li + li {
  margin-left: 1.5em;
}

.nuxt-link-active {
  text-decoration: underline;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(1em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
