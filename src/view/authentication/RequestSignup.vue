<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Request Signup</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <!-- Display Success Message -->
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <!-- Display Errors -->
          <div v-if="errors" class="error-message">
            {{ errors }}
          </div>

          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <p class="forgot-text">
              Enter your email address and we'll send you a signup link.
            </p>

            <a-form-item label="Email Address" name="email">
              <a-input
                type="email"
                v-model:value="credentials.email"
                placeholder="name@example.com"
                required
              />
            </a-form-item>

            <a-form-item>
              <sdButton
                class="btn-reset"
                htmlType="submit"
                type="primary"
                size="lg"
              >
                Request Signup Link
              </sdButton>
            </a-form-item>

            <p class="return-text">
              Return to <router-link to="/auth/login">Sign In</router-link>
            </p>
          </a-form>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { AuthWrapper } from "./style";
import { ref, defineComponent } from "vue";

const RequestSignup = defineComponent({
  name: "RequestSignup",
  components: { AuthWrapper },
  setup() {
    const host = "http://localhost:5000";
    const credentials = ref({ email: "" });
    const successMessage = ref("");
    const errors = ref("");

    const handleSubmit = async () => {
      successMessage.value = "";
      errors.value = "";

      try {
        const response = await fetch(`${host}/api/auth/user/signup/requestSignup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();
        if (response.ok) {
          successMessage.value = json.message;
        } else {
          errors.value = json.error;

          if (json.errors) {
            json.errors.forEach((error) => {
              errors.value[error.param] = error.msg;
            });
          }
        }
      } catch (error) {
        // console.error("Error:", error);
        errors.value = error;
      }
    };

    const onChange = (e) => {
      credentials.value = {
        ...credentials.value,
        [e.target.name]: e.target.value,
      };
    };

    return {
      credentials,
      successMessage,
      errors,
      handleSubmit,
      onChange,
    };
  },
});

export default RequestSignup;
</script>

<style scoped>
.success-message {
  color: green;
  margin-bottom: 16px;
}
.error-message {
  color: red;
  margin-bottom: 16px;
}
</style>
