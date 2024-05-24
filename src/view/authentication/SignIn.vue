<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign in HexaDash</h2>
        </div>
        
        <div class="ninjadash-authentication-content">
          <a-form @submit.prevent="handleSubmit" layout="vertical">
            
            <a-form-item name="email" label="Email">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required/>
            </a-form-item>
            <a-form-item name="password" label="Password">
              <a-input type="password" v-model:value="credentials.password" placeholder="Password" required/>
            </a-form-item>
            
            <div class="ninjadash-auth-extra-links">
              <a-checkbox>Keep me logged in</a-checkbox> <!-- TODO: Keep me logged in function -->
              <router-link class="forgot-pass-link" to="/auth/forgotPassword">
                Forgot password?
              </router-link>
            </div>

            <a-form-item>
              <sdButton class="btn-signin" htmlType="submit" type="primary">
                {{ isLoading ? "Loading..." : "Sign In" }}
              </sdButton>
            </a-form-item>

            <p class="ninjadash-form-divider"><span>Or</span></p>

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
            </ul>
          </a-form>
        </div>

        <div class="ninjadash-authentication-bottom">
          <p>Don't have an account?<router-link to="/auth/register">Sign up</router-link></p>
        </div>
      </AuthWrapper>

    </a-col>
  </a-row>
</template>

<script>

  import { computed, ref, defineComponent } from "vue";
  import { useStore } from "vuex";
  import { AuthWrapper } from "./style";
  import { useRouter } from "vue-router";
  import InlineSvg from "vue-inline-svg";

  const SignIn = defineComponent({
    name: "SignIn",
    components: { AuthWrapper, InlineSvg },
    setup() {
      const { state, dispatch } = useStore();
      const isLoading = computed(() => state.auth.loading);
      const checked = ref(null);

      const host = 'http://localhost:5000';
      const credentials = ref({ email: '', password: '' });
      const router = useRouter();

      const handleSubmit = async () => {
        try {
          const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials.value)
          });

          const json = await response.json();
          if (json.success) {
            localStorage.setItem('token', json.authToken);
            console.log("Logged in successfully");
            router.push('/');
            dispatch("login");
          } else {
            console.log("Invalid Credentials");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const onChange = (e) => {
        credentials.value = { ...credentials.value, [e.target.name]: e.target.value };
      };

      return {
        isLoading,
        checked,
        credentials,
        handleSubmit,
        onChange
      };
    },
  });

  export default SignIn;

</script>