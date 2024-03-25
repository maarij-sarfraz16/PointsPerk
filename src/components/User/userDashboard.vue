<template>
  <v-app>
    
    <v-app-bar> <NavBar @toggleDrawer="toggleDrawer" /> </v-app-bar>
    <SideBar :drawer="localDrawer" />

    <v-main class="main">
      <v-container class="container">
        <v-row>
          <v-col cols="12">
            <h1 class="text-style">Dashboard</h1>
            <redemptionPoints/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
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
        localDrawer: false,
      };
    },

    methods: {
      toggleDrawer() {
        this.localDrawer = !this.localDrawer;
      },
    },

  };

</script>

<style scoped>
  .text-style {
    color:#4b49ac;
    font-size:30px;
  }
  .container {
    border-radius: 16px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    height: 100%;
    max-width: 100%;
  }
  .main {
    background-color: lightgray;
  }
</style>