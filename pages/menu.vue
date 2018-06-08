<template>
  <main class="menu-container">
    <article v-for="menu in menus" :key="menu.id">
      <h1>{{ menu.name }}</h1>
      <section v-for="mc in menu.menuCategories" :key="mc.id">
        <h2 :id="mc.name">{{ mc.name }}</h2>
        <ul>
          <li v-for="plate in mc.food" :key="plate.id">
            <span class="price">{{ plate.price }}</span>
            <span>{{ plate.name }}</span>
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  fetch({ store }) {
    return store.dispatch("menu/fetch")
  },
  computed: mapGetters({ menus: "menu/full" })
}
</script>

<style scoped>
.menu-container {
  padding: 0 1em 5em;
  box-sizing: border-box;
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
li {
  font-size: 1em;
  display: contents;
}
.price {
  text-align: right;
  color: #711d1d;
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
