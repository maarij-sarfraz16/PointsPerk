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

  import NavBar from "../global_components/NavBar.vue";
  import SideBar from "../global_components/SideBar.vue";
  import redemptionPoints from "./redemptionPoints.vue";

  import { useRoute, useRouter } from 'vue-router';

  export default {
    
    name: "HomePage",
    components: {
      NavBar,
      SideBar,
      redemptionPoints,
     
    },

    setup() {
      const router = useRouter();
      const route = useRoute();

      const checkAuthentication = () => {
        if (!localStorage.getItem('token')) {
          router.push('/login');
        }
      };

      checkAuthentication();

      return {
        route
      };
    },

    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
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