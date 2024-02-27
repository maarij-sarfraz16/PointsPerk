<template>
  <v-app>
    <v-main>
      <NavBar />
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  components: {
    HomePage,
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>