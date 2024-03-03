<template>
<<<<<<< HEAD
  <v-toolbar color="coral" dark prominent app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <v-img
        src="../assets/Emblem.png"
        alt="Logo"
        width="120px"
        class="pl-0 ml-0"
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="NavigateToLogin">mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer"); //event names toggleDrawer is emmited to parent
    },

    NavigateToLogin() {
      this.$router.push("login");
    },
  },
};
</script>
=======
  <div>
     <v-toolbar
       color="#7DA0FA"
       dark
       prominent
     >
       <v-img src="../assets/Emblem.png" alt="Logo"  class="mr-0 pr-0"/>

       <v-app-bar-nav-icon  class="ml-0 pl-0"></v-app-bar-nav-icon>
 <v-spacer></v-spacer>
 <v-spacer></v-spacer>
 


       <v-btn icon>
         <v-icon> <v-img src="../assets/pfp.png" alt="pfp" /></v-icon>
         
       </v-btn>
     </v-toolbar>
   </div>
 </template>
 
 <script>
 export default {
   name: "NavBar",
 };
 </script>
 
 <style>
 
 </style>
>>>>>>> 9ec66fa19d3f66a39b73dd7ccf94b07bc17d5afb
