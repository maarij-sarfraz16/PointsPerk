<template>
    <v-app>
        <v-app-bar> <NavBar @toggleDrawer="toggleDrawer" /> </v-app-bar>
      <SideBar :drawer="localDrawer" />

      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="text-style">Profile settings</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import SideBar from '@/components/Global/SideBar.vue';
  import NavBar from '@/components/Global/NavBar.vue';
  
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
  </style>
  