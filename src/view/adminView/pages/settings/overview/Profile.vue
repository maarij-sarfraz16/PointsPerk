<template>
  <sdCards>
    <template v-slot:title>
      <div class="setting-card-title">
        <sdHeading as="h4">Edit Profile</sdHeading>
        <span>Edit Your Personal Information</span>
      </div>

      <sdAlerts
        :outlined="false"
        :closable="false"
        :showIcon="true"
        message="Reminder"
        description="Please contact Admin if you wish to change your Email Address."
        type="warning"
      />
    </template>

    <a-row type="flex" justify="center">
      <a-col :xxl="12" :lg="24" :xs="24">
        <BasicFormWrapper>
          <!-- Display Success Message After New User Creation -->
          <MessageDisplay v-if="successMessage" :message="successMessage" type="success" />

          <!-- Display Errors -->
          <MessageDisplay v-if="errors" :message="errors" type="error" />
          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <a-form-item label="Email Address">
              <a-input :placeholder="userData.email" disabled>
                <template #prefix>
                  <unicon name="envelope" width="18"></unicon>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item label="Contact Number">
              <a-input
                v-model:value="credentials.contactNumber"
                :placeholder="userData.contactNumber"
                required
                minlength="10"
                maxlength="15"
              >
                <template #prefix>
                  <unicon name="phone" width="18"></unicon>
                </template>
              </a-input>
            </a-form-item>

            <div class="setting-form-actions">
              <sdButton :disabled="isLoading" size="default" htmlType="submit" type="primary">
                  {{ isLoading ? 'Loading...' : 'Update Profile' }}
              </sdButton>
            </div>
          </a-form>
        </BasicFormWrapper>
      </a-col>
    </a-row>
  </sdCards>
</template>

<script>
import { useStore } from 'vuex';
import { BasicFormWrapper } from '@/view/styled';
import { defineComponent, onMounted, ref, computed } from 'vue';
import MessageDisplay from '@/view/adminView/authentication/overview/MessageDisplay.vue';

const Profile = defineComponent({
  name: 'Admin Profile',
  components: { BasicFormWrapper, MessageDisplay },

  setup() {
    const host = 'http://localhost:5000';
    const userData = ref({ email: '', contactNumber: '' });
    const credentials = ref({ contactNumber: '' });
    const successMessage = ref('');
    const errors = ref('');
    const { state } = useStore();
    const isLoading = computed(() => state.auth.loading);

    onMounted(async () => {
      state.auth.loading = false;

      try {
        const response = await fetch(`${host}/api/get-data/user/user-data/fetchData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        const json = await response.json();
        if (response.ok) {
          userData.value = json.user;
        } else {
          // console.error("Failed to fetch user data:", json);
          errors.value = 'Failed to fetch user data';
        }
      } catch (error) {
        // console.error("Error fetching user data:", error);
        errors.value = error;
      }
    });

    const handleSubmit = async () => {
      successMessage.value = '';
      errors.value = '';
      state.auth.loading = true;

      if (credentials.value.contactNumber === userData.value.contactNumber) {
        errors.value = 'Contact number is the same as before. No changes made.';
        state.auth.loading = false;
        return;
      }

      try {
        const response = await fetch(`${host}/api/auth/user/update-user/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(credentials.value),
        });

        const json = await response.json();
        if (json.success) {
          successMessage.value = 'Updated!';
          state.auth.loading = false;
          userData.value.contactNumber = credentials.value.contactNumber;
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
      userData,
      credentials,
      successMessage,
      errors,
      handleSubmit,
      onChange,
      isLoading
    };
  },
});

export default Profile;
</script>
