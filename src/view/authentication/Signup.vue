<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper class="basic-form-inner theme-light">
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign Up Points Perk</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <!-- Display Success Message After New User Creation -->
          <MessageDisplay v-if="successMessage" type="success" :message="successMessage" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" type="error" :message="errors" />

          <div v-if="tokenValid">
            <a-form @submit.prevent="handleSubmit" layout="vertical">
              <a-form-item label="Name of the Agency" name="nameOfAgency">
                <a-input v-model:value="credentials.nameOfAgency" placeholder="ABC Travels" required />
              </a-form-item>

              <a-form-item label="Agency Address" name="agencyAddress">
                <a-input v-model:value="credentials.agencyAddress" placeholder="123 Main Street" required />
              </a-form-item>

              <a-form-item label="First Name" name="firstName">
                <a-input v-model:value="credentials.firstName" placeholder="John" required />
              </a-form-item>

              <a-form-item label="Last Name" name="lastName">
                <a-input v-model:value="credentials.lastName" placeholder="Doe" required />
              </a-form-item>

              <a-form-item label="Email Address" name="email">
                <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required />
              </a-form-item>

              <a-form-item label="Contact Number" name="contactNumber">
                <a-input
                  v-model:value="credentials.contactNumber"
                  placeholder="+1"
                  required
                  minlength="10"
                  maxlength="15"
                />
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

              <a-form-item label="Country/Region" name="country">
                <a-select v-model:value="credentials.country" :style="{ width: '100%' }">
                  <a-select-option value="">Please Select</a-select-option>
                  <a-select-option value="USA">USA</a-select-option>
                  <a-select-option value="UK">UK</a-select-option>
                </a-select>
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
        </div>

        <div class="ninjadash-authentication-bottom">
          <p>Already have an account?<router-link to="/auth/login">Sign In</router-link></p>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { AuthWrapper } from './style';
import { ref, defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import MessageDisplay from './overview/MessageDisplay.vue';

const SignUp = defineComponent({
  name: 'SignUp',
  components: { AuthWrapper, MessageDisplay },
  setup() {
    const host = 'http://localhost:5000';
    const credentials = ref({
      nameOfAgency: '',
      agencyAddress: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      country: '',
    });

    const errors = ref('');
    const router = useRouter();
    const route = useRoute();
    const tokenValid = ref(false);
    const { state } = useStore();
    const isLoading = computed(() => state.auth.loading);

    onMounted(async () => {
      errors.value = '';
      const token = route.query.token;
      state.auth.loading = false;

      if (!token) {
        errors.value = 'No token provided';
        return;
      }

      try {
        const response = await fetch(`${host}/api/auth/user/signup/verifySignupToken/${token}`, {
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
        errors.value = error;
      }
    });

    const handleSubmit = async () => {
      errors.value = '';
      state.auth.loading = true;

      try {
        const token = credentials.value.token;

        if (!token) {
          errors.value = 'Token is required';
          return;
        }

        const response = await fetch(`${host}/api/auth/user/createUser`, {
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
            query: { successMessage: 'User created successfully. Please log in.' },
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
      tokenValid,
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
