<template>
    <v-container>
        <v-row class="h-50px">
    <v-col cols="4">
        <v-card >

            <v-card-title>Redemption Points</v-card-title>
            <v-icon>mdi-coin</v-icon>
        </v-card>
    </v-col>
<v-spacer/>

          <v-col cols="4" class="w-50 h-50 ">
        <v-card class="w-50 h-50 d-flex align-center  justify-center">
            <v-card-title>Upload CSV file </v-card-title>
            <v-btn color="#f3797e">Upload</v-btn>
            
   </v-card>

    </v-col>
</v-row>
</v-container>
</template>

<script>
export default {
    name:"redemptionPoints",
}
</script>
