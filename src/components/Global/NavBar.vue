<template>
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
