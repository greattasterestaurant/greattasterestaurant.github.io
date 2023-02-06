<template>
  <div class="menu-container">
    <article v-for="menu in menus" :key="menu.id">
      <h1>{{ menu.name }}</h1>
      <VPlateList :food="menu.food" />
      <section v-for="submenu in menu.menus" :key="submenu.id">
        <h2 :id="submenu.name">{{ submenu.name }}</h2>
        <VPlateList :food="submenu.food" />
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu"

const menuStore = useMenuStore()
const menus = menuStore.full
</script>

<style scoped>
.menu-container {
  font-family: "Libre Baskerville";
}
h1 {
  text-decoration: underline;
  text-align: center;
}
h2 {
  font-weight: lighter;
  font-size: 1.2em;
  margin: 1.5em 0;
  text-align: center;
}
ul {
  margin: 0;
  padding: 0 1em;
  list-style-type: none;

  display: grid;
  grid-template-columns:
    max-content 1fr
    max-content 1fr;
  grid-column-gap: 1em;
}
:deep(li) {
  display: contents;
}

@media (max-width: 85em) {
  ul {
    font-size: 0.9em;
  }
}
@media (max-width: 70em) {
  ul {
    font-size: 0.8em;
  }
}
@media (max-width: 62em) {
  .menu-container {
    padding-left: calc((100% - 55em) / 2);
    padding-right: calc((100% - 55em) / 2);
  }
  ul {
    font-size: 1em;
  }
}
@media (max-width: 55em) {
  ul {
    font-size: 0.9em;
  }
}
@media (max-width: 47em) {
  ul {
    font-size: 1em;
    grid-template-columns: 1fr 3fr;
  }
}
@media (max-width: 30em) {
  ul {
    font-size: 0.8em;
  }
}
</style>
