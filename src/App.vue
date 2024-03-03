<template>
  <v-app>
    <v-main>
      <RouterLink to="/"></RouterLink>
      <RouterLink to="/Login"></RouterLink>

      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
