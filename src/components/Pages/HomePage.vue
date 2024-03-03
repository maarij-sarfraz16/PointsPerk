<template>
  <!-- parent listens to toggleDrawer and executes a func "toggleDrawer" -->
  <v-app-bar> <NavBar @toggleDrawer="toggleDrawer" /> </v-app-bar>

  <v-main>
    <SideBar :drawer="drawer" />

    <v-container>
      <v-row justify="start">

        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card width="400" title="Redemption Points" text="" variant="elevated" color="#F37973"></v-card>
        </v-col>

      </v-row>
    </v-container>
    
  </v-main>
</template>

<script>

  import NavBar from "../Global/NavBar.vue";
  import SideBar from "../Global/SideBar.vue";

  export default {
    
    name: "HomePage",
    components: {
      NavBar,
      SideBar,
    },

    data() {
      return {
        drawer: false,
      };
    },

    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
      },
    },

  };

</script>