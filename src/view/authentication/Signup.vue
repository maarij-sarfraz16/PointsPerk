<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">

      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign Up Points Perk</h2>
        </div>

        <div class="ninjadash-authentication-content">
          <a-form @submit.prevent="handleSubmit" layout="vertical">
            
            <a-form-item label="Name" name="name">
              <a-input v-model:value="credentials.name" placeholder="Full name" required/>
            </a-form-item>
          
            <a-form-item name="email" label="Email Address">
              <a-input type="email" v-model:value="credentials.email" placeholder="name@example.com" required/>
            </a-form-item>

            <a-form-item label="Password" name="password">
              <a-input type="password" v-model:value="credentials.password" placeholder="Password" required/>
            </a-form-item>

            <div class="ninjadash-auth-extra-links">
              <a-checkbox required>
                Creating an account means you’re okay with our Terms of Service and Privacy Policy
              </a-checkbox>
            </div>

            <a-form-item>
              <sdButton class="btn-create" htmlType="submit" type="primary" size="lg">
                Create Account
              </sdButton>
            </a-form-item>

            <p class="ninjadash-form-divider"><span>Or</span></p>
            
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
            </ul>

          </a-form>
        </div>

        <div class="ninjadash-authentication-bottom">
          <p>Already have an account?<router-link to="/auth/login">Sign In</router-link></p>
        </div>
      </AuthWrapper>

    </a-col>
  </a-row>
</template>

<script>

  import { AuthWrapper } from "./style";
  import { ref, defineComponent } from "vue";
  import { useRouter } from 'vue-router';
  import InlineSvg from "vue-inline-svg";

  const SignUp = defineComponent({
    name: "SignUp",
    components: { AuthWrapper, InlineSvg },
    setup() {
      const host = 'http://localhost:5000';
      const credentials = ref({ name: '', email: '', password: '' });
      const router = useRouter();

      const handleSubmit = async () => {
        try {
          const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials.value)
          });

          const json = await response.json();
          if (json.success) {
            localStorage.setItem('token', json.authToken);
            console.log("User created successfully");
            router.push('/');
          } else {
            console.log("Invalid Details");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const onChange = (e) => {
        credentials.value = { ...credentials.value, [e.target.name]: e.target.value };
      };

      return {
        credentials,
        handleSubmit,
        onChange
      };
    }
  });

  export default SignUp;

</script>