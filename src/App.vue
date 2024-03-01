<template>
  <v-app>
    <v-main>
      <NavBar />
      <SideBar/>
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./components/Pages/HomePage.vue";
import NavBar from "./components/Global/NavBar.vue";
import SideBar from  "./components/Global/SideBar.vue";

export default {
  name: "App",

  components: {
    HomePage,
    NavBar,
    SideBar,
  },

  data: () => ({
    //
  }),
};
</script>
