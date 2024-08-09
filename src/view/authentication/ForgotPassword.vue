<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Forgot Password?</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <!-- Display Success Message After New User Creation -->
          <MessageDisplay v-if="successMessage" type="success" :message="successMessage" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" type="error" :message="errors" />

          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <p class="forgot-text">
              Enter the email address you used when you joined and we’ll help you reset your password.
            </p>

            <a-form-item label="Email Address" name="email">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" />
            </a-form-item>
            <a-form-item>
              <sdButton class="btn-forget" htmlType="submit" type="primary" size="lg"> Reset Password </sdButton>
            </a-form-item>

            <p class="return-text">Return to <router-link to="/auth/login">Sign In</router-link></p>
          </a-form>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import MessageDisplay from './overview/MessageDisplay.vue';
import { AuthWrapper } from './style';
import { ref, defineComponent } from 'vue';

const ForgotPassword = defineComponent({
  name: 'ForgotPassword',
  components: { AuthWrapper, MessageDisplay },
  setup() {
    const host = 'http://localhost:5000';
    const credentials = ref({ email: '' });
    const successMessage = ref('');
    const errors = ref('');

    const handleSubmit = async () => {
      errors.value = '';
      successMessage.value = '';

      try {
        const response = await fetch(`${host}/api/auth/user/password-reset/requestReset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();
        if (response.ok) {
          errors.value = '';
          successMessage.value = json.message || '';
        } else {
          successMessage.value = '';
          errors.value = json.error || '';

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
      credentials.value = { ...credentials.value, [e.target.name]: e.target.value };
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

export default ForgotPassword;
</script>
