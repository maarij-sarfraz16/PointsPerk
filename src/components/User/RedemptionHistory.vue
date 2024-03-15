
<template>
    <v-app>
        <v-app-bar> <NavBar @toggleDrawer="toggleDrawer" /> </v-app-bar>
      <SideBar :drawer="localDrawer" />

      <v-main class="main">
        <v-container class="container">
          <v-row>
            <v-col cols="12">
              <h1 class="text-style">Redemption History</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import SideBar from '@/components/global_components/SideBar.vue';
  import NavBar from '@/components/global_components/NavBar.vue';
  
  export default {
    components: {
      SideBar,
      NavBar
    },
    data() {
      return {
        localDrawer: false
      };
    },
    methods: {
      toggleDrawer() {
        this.localDrawer = !this.localDrawer;
      }
    }
  };
  </script>
  
  <style scoped>
  .text-style{
    color:#4b49ac;
    font-size:30px;
  }
  .container{
  border-radius: 16px; /* Adjust the border-radius as per your preference */
  background-color: white; /* Background color of the container */
  /* Adjust padding as needed */
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  height: 100%;
  max: width 100%; ;
  }
  .main{
    background-color: lightgray;
  }
  </style>