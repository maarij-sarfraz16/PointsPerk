<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign In Points Perk</h2>
        </div>

        <div v-if="showAlert">
          <Alerts :type="alertType" :message="alertMessage" />
        </div>
        
        <div class="ninjadash-authentication-content">

          <!-- Display Success Message After New Admin Creation -->
          <MessageDisplay v-if="successMessage" :message="successMessage" type="success" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" :message="errors" type="error" />

          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <a-form-item name="email" label="Email">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required />
            </a-form-item>
            <a-form-item name="password" label="Password">
              <a-input-password type="password" v-model:value="credentials.password" placeholder="Password" required />
            </a-form-item>

            <div class="ninjadash-auth-extra-links">
              <a-checkbox>Keep me logged in</a-checkbox>
            </div>

            <a-form-item>
              <sdButton :disabled="isLoading" class="btn-signin" htmlType="submit" type="primary">
                {{ isLoading ? 'Loading...' : 'Sign In' }}
              </sdButton>
            </a-form-item>

            <!-- <p class="ninjadash-form-divider"><span>Or</span></p>

            <ul class="ninjadash-social-login">
              <li>
                <a class="google-social" href="#">
                  <InlineSvg :src="require('@/static/img/icon/google-plus.svg')"></InlineSvg>
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

        <!-- <div class="ninjadash-authentication-bottom">
          <p>Don't have an account?<router-link to="/admin/signup">Sign up</router-link></p>
        </div> -->
      </AuthWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { computed, ref, defineComponent, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { AuthWrapper } from './style';
import { useRouter, useRoute } from 'vue-router';
import MessageDisplay from './overview/MessageDisplay.vue';
import Alerts from '@/components/alerts/Alerts.vue';

const SignIn = defineComponent({
  name: 'SignIn',
  components: { AuthWrapper, MessageDisplay, Alerts },
  setup() {
    const { state, dispatch } = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoading = computed(() => state.auth.loading);

    const host = 'http://localhost:5000';
    const credentials = ref({ email: '', password: '' });
    const successMessage = ref('');
    const errors = ref('');

    const alertMessage = ref('');
    const showAlert = ref(false);
    const alertType = ref('error');
    const isOnline = ref(navigator.onLine);

    window.addEventListener('online', () => {
      isOnline.value = navigator.onLine;
    });
    window.addEventListener('offline', () => {
      isOnline.value = navigator.onLine;
    });

    watch(isOnline, (onlineStatus) => {
      if (onlineStatus) {
        showAlertMessage('Internet Connection Active', 'success');
      } else {
        showAlertMessage('Internet Connection Lost', 'error');
      }
    });

    const handleSubmit = async () => {
      successMessage.value = '';
      errors.value = '';
      state.auth.loading = true;

      try {
        const response = await fetch(`${host}/api/auth/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();

        if (json.success) {
          localStorage.setItem('token', json.authToken);
          router.push('/admin/dashboard');
          dispatch('login');
          state.auth.loading = true;
        } else {
          errors.value = json.error || '';
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

    onMounted(() => {
      state.auth.loading = false;
      if (route.query && route.query.successMessage) {
        successMessage.value = route.query.successMessage;
      }
    });

    const showAlertMessage = (message, type = 'error', duration = 2000) => {
      alertMessage.value = message;
      alertType.value = type;
      showAlert.value = true;

      if (duration) {
        setTimeout(() => {
          showAlert.value = false;
        }, duration);
      }
    };

    return {
      showAlertMessage,
      isLoading,
      credentials,
      alertMessage,
      showAlert,
      alertType,
      successMessage,
      errors,
      handleSubmit,
      onChange,
      isOnline,
    };
  },
});

export default SignIn;
</script>