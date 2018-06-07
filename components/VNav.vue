<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link.to">
        <nuxt-link :to="link.to">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [
      { to: "/menu", text: "Menu" },
      { to: "/hours", text: "Hours" },
      { to: "/reviews", text: "Reviews" }
    ]
  })
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
