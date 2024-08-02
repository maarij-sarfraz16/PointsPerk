<template>
  <AccountWrapper>
    <sdCards>

      <template v-slot:title>
        <div class="setting-card-title">
          <sdHeading as="h4">Account Settings</sdHeading>
          <span>Manage Your Account</span>
        </div>
      </template>

      <a-row>
        <a-col :xs="24">

          <BasicFormWrapper>

            <!-- Display Success Message -->
            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>

            <!-- Display Errors -->
            <div v-if="errors" class="error-message">
              {{ errors }}
            </div>

            <a-form @submit.prevent="handleSubmit" layout="vertical">

                <a-row type="flex" justify="center">
                  <a-col :xxl="10" :lg="16" :md="18" :xs="24">
                    <div class="account-closing">
                      <a-row>
                        <a-col :lg="18" :md="24" :sm="18" :xs="24">
                          <sdHeading class="account-closing__title" as="h4">
                            Close Account
                          </sdHeading>
                          <p>Delete Your Account and Account data</p>
                        </a-col>
                        <a-col :lg="6" :md="24" :sm="6" :xs="24">
                          <sdButton htmlType="submit" size="sm" type="danger">
                            Close Account
                          </sdButton>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>

            </a-form>
          </BasicFormWrapper>

        </a-col>
      </a-row>

    </sdCards>
  </AccountWrapper>
</template>

<script>
import { AccountWrapper } from "./style";
import { BasicFormWrapper } from "../../../styled";
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';

const Account = defineComponent({
  name: "Account",
  components: { AccountWrapper, BasicFormWrapper },

  setup() {
    const host = 'http://localhost:5000';
    const router = useRouter();
    const successMessage = ref('');
    const errors = ref('');

    const handleSubmit = async () => {
        successMessage.value = '';
        errors.value = '';

        try {
          const response = await fetch(`${host}/api/auth/user/delete-user/delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            }
          });

          const json = await response.json();
          if (json.success) {
            successMessage.value = 'User deleted successfully!';
            localStorage.removeItem("token");
            router.push({
              path: '/auth/login',
              query: { successMessage: 'User deleted successfully!' }
            });
          } else {
            errors.value = json.error;
            if (json.errors) {
              json.errors.forEach(error => {
                errors.value[error.param] = error.msg;
              });
            }
          }
        } catch (error) {
          errors.value = error;
        }
      };

      return {
        handleSubmit,
        successMessage,
        errors
      }
  },
});

export default Account;
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