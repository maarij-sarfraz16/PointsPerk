<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Request Signup</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <!-- Display Success Message After New User Creation -->
          <MessageDisplay v-if="successMessage" type="success" :message="successMessage" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" type="error" :message="errors" />

          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <p class="forgot-text">Enter your email address and we'll send you a signup link.</p>

            <a-form-item label="Email Address" name="email">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required />
            </a-form-item>

            <a-form-item>
              <sdButton :disabled="isLoading" class="btn-reset" htmlType="submit" type="primary" size="lg">
                {{ isLoading ? 'Loading...' : 'Request Signup Link' }}
              </sdButton>
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
import { ref, defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const RequestSignup = defineComponent({
  name: 'RequestSignup',
  components: { AuthWrapper, MessageDisplay },
  setup() {
    const { state } = useStore();
    const isLoading = computed(() => state.auth.loading);

    const host = 'http://localhost:5000';
    const credentials = ref({ email: '' });
    const successMessage = ref('');
    const errors = ref('');

    const handleSubmit = async () => {
      successMessage.value = '';
      errors.value = '';
      state.auth.loading = true;

      try {
        const response = await fetch(`${host}/api/auth/user/signup/requestSignup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();
        if (response.ok) {
          successMessage.value = json.message;
          state.auth.loading = false;
        } else {
          errors.value = json.error;
          state.auth.loading = false;

          if (json.errors) {
            json.errors.forEach((error) => {
              errors.value[error.param] = error.msg;
            });
          }
        }
      } catch (error) {
        errors.value = error || '';
        state.auth.loading = false;
      }
    };

    const onChange = (e) => {
      credentials.value = {
        ...credentials.value,
        [e.target.name]: e.target.value,
      };
    };

    onMounted(() => {
      state.auth.loading = false;
    });

    return {
      isLoading,
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
