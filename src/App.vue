<template>
  <v-app>
    <v-main>
      <NavBar />
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./components/Pages/HomePage.vue";
import NavBar from "./components/Global/NavBar.vue";

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
