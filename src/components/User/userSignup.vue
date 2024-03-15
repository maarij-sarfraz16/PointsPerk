<template>
  <v-container>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="credentials.name" label="Name" name="name" required></v-text-field>
      <v-text-field v-model="credentials.email" label="Email" name="email" required></v-text-field>
      <v-text-field v-model="credentials.password" label="Password" name="password" required type="password"></v-text-field>
      <v-btn type="submit" color="primary">Sign Up</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
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
            console.log("Logged in successfully");
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
  };
</script>