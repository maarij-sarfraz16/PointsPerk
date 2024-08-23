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

            <!-- Display Success Message After New User Creation -->
            <MessageDisplay v-if="successMessage" :message="successMessage" type="success" />

            <!-- Display Errors -->
            <MessageDisplay v-if="errors" :message="errors" type="error" />

            <a-form @submit.prevent="handleSubmit" layout="vertical">
              <a-row type="flex" justify="center">
                <a-col :xxl="10" :lg="16" :md="18" :xs="24">
                  <div class="account-closing">
                    <a-row>
                      <a-col :lg="18" :md="24" :sm="18" :xs="24">
                        <sdHeading class="account-closing__title" as="h4"> Close Account </sdHeading>
                        <p>Delete Your Account and Account data</p>
                      </a-col>
                      <a-col :lg="6" :md="24" :sm="6" :xs="24">
                        <sdButton :disabled="isLoading" htmlType="submit" size="sm" type="danger">
                          {{ isLoading ? 'Loading...' : 'Close Account' }}
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MessageDisplay from '@/view/authentication/overview/MessageDisplay.vue';

const Account = defineComponent({
  name: 'Account',
  components: { AccountWrapper, BasicFormWrapper, MessageDisplay },

  setup() {
    const host = 'http://localhost:5000';
    const successMessage = ref('');
    const errors = ref('');
    const store = useStore();
    const { push } = useRouter();
    const { state } = useStore();
    const isLoading = computed(() => state.auth.loading);

    const handleSubmit = async () => {
      successMessage.value = '';
      errors.value = '';
      state.auth.loading = true;

      try {
        const response = await fetch(`${host}/api/auth/user/delete-user/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

          const json = await response.json();
          if (json.success) {
            successMessage.value = 'User deleted successfully!';
            state.auth.loading = false;
            await new Promise(resolve => setTimeout(resolve, 2000));
            localStorage.removeItem('token');
            push('/auth/login');
            store.dispatch('logOut');
            localStorage.removeItem('token');
          } else {
            errors.value = json.error;
            state.auth.loading = false;
            if (json.errors) {
              json.errors.forEach(error => {
                errors.value[error.param] = error.msg;
              });
            }
          }
        } catch (error) {
          errors.value = error;
          state.auth.loading = false;
        }
      };

      onMounted(() => {
      state.auth.loading = false;
    });

    return {
      handleSubmit,
      successMessage,
      errors,
      isLoading
    };
  },
});

export default Account;
</script>