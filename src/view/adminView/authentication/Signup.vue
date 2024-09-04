<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper class="basic-form-inner theme-light">
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign Up Points Perk</h2>
        </div>

        <div class="ninjadash-authentication-content">

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" type="error" :message="errors" />

          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <a-form-item label="Name" name="name">
              <a-input v-model:value="credentials.name" placeholder="John Doe" required />
            </a-form-item>

            <a-form-item label="Email Address" name="email">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required />
            </a-form-item>

            <a-form-item label="Password" name="password">
              <a-input-password
                type="password"
                v-model:value="credentials.password"
                placeholder="Password"
                required
                minlength="8"
              />
            </a-form-item>

            <div class="ninjadash-auth-extra-links">
              <a-checkbox required>
                Creating an account means you’re okay with our Terms of Service and Privacy Policy
              </a-checkbox>
            </div>

            <a-form-item>
              <sdButton :disabled="isLoading" class="btn-create" htmlType="submit" type="primary">
                {{ isLoading ? 'Loading...' : 'Create Account' }}
              </sdButton>
            </a-form-item>

            <!-- <p class="ninjadash-form-divider"><span>Or</span></p>
            
            <ul class="ninjadash-social-login">
              <li>
                <a class="google-social" href="#">
                  <InlineSvg
                    :src="require('@/static/img/icon/google-plus.svg')"
                  ></InlineSvg>
                </a>
              </li>
              <li>
                <a class="facebook-social" href="#">
                  <unicon name="facebook-f"></unicon>
                </a>
              </li>
            </ul> -->
          </a-form>
          
        </div>

        <div class="ninjadash-authentication-bottom">
          <p>Already have an account?<router-link to="/admin/login">Sign In</router-link></p>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { AuthWrapper } from './style';
import { ref, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MessageDisplay from './overview/MessageDisplay.vue';

const SignUp = defineComponent({
  name: 'SignUp',
  components: { AuthWrapper, MessageDisplay },
  setup() {
    const host = 'http://localhost:5000';
    const credentials = ref({
      name: '',
      email: '',
      password: '',
    });

    const errors = ref('');
    const router = useRouter();
    const { state } = useStore();
    const isLoading = computed(() => state.auth.loading);

    const handleSubmit = async () => {
      errors.value = '';
      state.auth.loading = true;

      try {

        const response = await fetch(`${host}/api/auth/admin/createAdmin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();
        if (json.success) {
          router.push({
            path: '/admin/login',
            query: { successMessage: 'Admin created successfully. Please log in.' },
          });
          state.auth.loading = true;
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
        errors.value = error;
        state.auth.loading = false;
      }
    };

    const onChange = (e) => {
      credentials.value = { ...credentials.value, [e.target.name]: e.target.value };
    };

    return {
      credentials,
      errors,
      handleSubmit,
      onChange,
      isLoading
    };
  },
});

export default SignUp;
</script>