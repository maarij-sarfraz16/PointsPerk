<template>
  <!-- parent listens to toggleDrawer and executes a func "toggleDrawer" -->
  <v-app-bar> <NavBar @toggleDrawer="toggleDrawer" /> </v-app-bar>

  <v-main>
    <SideBar :drawer="drawer" />
    <v-container>
       <redemptionPoints/> 
      </v-container>
  </v-main>
</template>

<script>

  import NavBar from "../Global/NavBar.vue";
  import SideBar from "../Global/SideBar.vue";
  import redemptionPoints from "./userDashBoard/redemptionPoints.vue";

  export default {
    
    name: "HomePage",
    components: {
      NavBar,
      SideBar,
      redemptionPoints,
     
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