<template>
 <div>
    <v-toolbar
      color="coral"
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-img src="../assets/Emblem.png" alt="Logo"/>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
