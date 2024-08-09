<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper class="basic-form-inner theme-light">
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Reset Account Password</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <!-- Display Success Message After New User Creation -->
          <MessageDisplay v-if="successMessage" type="success" :message="successMessage" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" type="error" :message="errors" />
          <div v-if="tokenValid">
            <a-form @submit.prevent="handleSubmit" layout="vertical">
              <a-form-item label="New Password" name="new-password">
                <a-input-password
                  type="password"
                  v-model:value="credentials.newPassword"
                  placeholder="Password"
                  required
                  minlength="8"
                />
              </a-form-item>

              <a-form-item label="Confirm New Password" name="confirm-new-password">
                <a-input-password
                  type="password"
                  v-model:value="credentials.confirmNewPassword"
                  placeholder="Password"
                  required
                  minlength="8"
                />
              </a-form-item>

              <a-form-item>
                <sdButton class="btn-reset" htmlType="submit" type="primary" size="lg"> Reset Password </sdButton>
              </a-form-item>
            </a-form>
          </div>
        </div>

        <div class="ninjadash-authentication-bottom">
          <p>Return to<router-link to="/auth/login">Sign In</router-link></p>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { AuthWrapper } from './style';
import { ref, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MessageDisplay from './overview/MessageDisplay.vue';

const ResetPassword = defineComponent({
  name: 'ResetPassword',
  components: { AuthWrapper, MessageDisplay },
  setup() {
    const host = 'http://localhost:5000';
    const credentials = ref({ newPassword: '', confirmNewPassword: '' });
    const errors = ref('');
    const router = useRouter();
    const route = useRoute();
    const tokenValid = ref(false);

    onMounted(async () => {
      errors.value = '';
      const token = route.query.token;

      if (!token) {
        errors.value = 'No token provided';
        return;
      }

      try {
        const response = await fetch(`${host}/api/auth/user/password-reset/verifyResetToken/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        if (response.ok) {
          tokenValid.value = true;
          credentials.value.token = token;
        } else {
          errors.value = json.error || '';
        }
      } catch (error) {
        // console.error('Error:', error);
        errors.value = error;
      }
    });

    const handleSubmit = async () => {
      errors.value = '';

      try {
        const token = route.query.token;

        if (!token) {
          errors.value = 'Token is required';
          return;
        }

        const response = await fetch(`${host}/api/auth/user/password-reset/resetPass`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...credentials.value,
            token,
          }),
        });

        const json = await response.json();
        if (json.success) {
          router.push({
            path: '/auth/login',
            query: { successMessage: 'Password reset successfully. Please log in.' },
          });
        } else {
          errors.value = json.error;
          if (json.errors) {
            json.errors.forEach((error) => {
              errors.value[error.param] = error.msg;
            });
          }
        }
      } catch (error) {
        errors.value = error;
      }
    };

    const onChange = (e) => {
      credentials.value = { ...credentials.value, [e.target.name]: e.target.value };
    };

    return {
      tokenValid,
      credentials,
      errors,
      handleSubmit,
      onChange,
    };
  },
});

export default ResetPassword;
</script>
