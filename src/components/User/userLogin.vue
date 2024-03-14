<template>
  <v-main color="grey lighten-3" class="background-color h-100 d-flex align-center justify-center">
    <v-container fluid>
      <v-row>
        
        <v-col cols="12" lg="6" class="d-none d-lg-flex rounded-lg ma-5">
          <div class="overflow-hidden d-flex align-center justify-center w-100 h-100 pa-8">
          <v-img src="../../../assets/illustration.jpg" class="auth-illustration rounded-xl"/></div>
        </v-col>

        <v-col cols="12" lg="5" class="col" align-self="center">
          <div>

            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
              <v-card-title class="font-weight-bold">You've Successfully Landed to Points Perk</v-card-title>
              <div class="text-subtitle-1 text-medium-emphasis">Username</div>

              <v-text-field density="compact" placeholder="Username" prepend-inner-icon="mdi-account-outline" variant="outlined"></v-text-field>

              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password
                <a class="text-caption text-decoration-none text-indigo" href="#" rel="noopener noreferrer" target="_blank">Forgot password?</a>
              </div>

              <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

              <v-card class="mb-12"></v-card>

              <v-btn class="mb-8" color="indigo" size="large" variant="tonal" block @click="NavigateToHome">Log In</v-btn>

              <v-card-text class="text-center">
                <a class="text-indigo text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                  Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
              </v-card-text>

            </v-card>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  export default {

    name: "LoginPage",

    data() {
      return {
        visible: false,
      };
    },

    methods: {
      NavigateToHome() {
        this.$router.push("/");
      },
    },
    
  };
</script>

<style scoped>
  .background-color {
    background-color: #2f3349;
  }
  .col {
    color: #25293c;
  }
</style>