<template>
  <v-container>
    <v-row class="d-flex align-center justify-center">

      <v-col cols="4">
        <v-card class="d-flex align-center justify-center">
          <v-card-title>Redemption Points</v-card-title>
          <v-img src="../../../assets/coin.svg" width="5"></v-img>
        </v-card>
      </v-col>

      <v-spacer />

      <v-col cols="4">
        <v-card width="190" class="rounded-xl d-flex flex-column align-center justify-center">
          <v-card-title>Upload CSV file </v-card-title>
          <v-btn color="#f3797e" icon="mdi-cloud-upload" class="ma-4"></v-btn>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "redemptionPoints",
  };
</script>