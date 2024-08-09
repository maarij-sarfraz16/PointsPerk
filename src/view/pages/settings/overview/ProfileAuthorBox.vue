<template>
  <sdCards headless>
    <div class="author-info">
      <figure>
        <img :src="profilePicture" alt="Profile Picture" />
        <input type="file" @change="handleFileChange" style="display: none" ref="fileInput" />
        <a @click="triggerPictureUpload">
          <unicon name="camera" width="18" style="margin: 5px 5px 0 0"></unicon>
        </a>
        <a @click="handlePictureDelete" :class="{ disabled: isDefaultProfilePicture }">
          <unicon name="trash" width="18" style="margin: 5px 0 0 5px"></unicon>
        </a>
      </figure>

      <!-- Display Success Message After New User Creation -->
      <MessageDisplay v-if="successMessage" :message="successMessage" type="success" />

      <!-- Display Errors -->
      <MessageDisplay v-if="errors" :message="errors" type="error" />

      <figcaption>
        <div class="info">
          <sdHeading as="h4">{{ userData.firstName }} {{ userData.lastName }}</sdHeading>
          <p>Agent</p>
        </div>
      </figcaption>
    </div>

    <nav class="settings-menmulist">
      <ul>
        <li>
          <router-link :to="{ name: 'set-profile' }">
            <unicon name="user" width="14"></unicon>
            Edit Profile
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'set-account' }">
            <unicon name="setting" width="14"></unicon>
            Account Settings
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'set-password' }">
            <unicon name="key-skeleton" width="14"></unicon>
            Change Password
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'set-notification' }">
            <unicon name="list-ul" width="14"></unicon> Notification
          </router-link>
        </li>
      </ul>
    </nav>
  </sdCards>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import MessageDisplay from '@/view/authentication/overview/MessageDisplay.vue';

const host = 'http://localhost:5000';
const userData = ref({ firstName: '', lastName: '' });
const profilePicture = ref('');
const fileInput = ref(null);
const successMessage = ref('');
const errors = ref('');

const DEFAULT_PROFILE_PICTURE_URL =
  'https://res.cloudinary.com/drlb3eani/image/upload/v1722537563/tnf5ax4za2k3cslb2zvq.png';
const isDefaultProfilePicture = computed(() => profilePicture.value === DEFAULT_PROFILE_PICTURE_URL);

onMounted(async () => {
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
      profilePicture.value = json.userProfileData
        ? json.userProfileData.profilePictureUrl
        : DEFAULT_PROFILE_PICTURE_URL;
    } else {
      // console.error("Failed to fetch user data:", json);
      errors.value = 'Failed to fetch user data';
    }
  } catch (error) {
    // console.error("Error fetching user data:", error);
    errors.value = error;
  }
});

const triggerPictureUpload = () => {
  successMessage.value = '';
  errors.value = '';
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const supportedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (file && !supportedFileTypes.includes(file.type)) {
    errors.value = 'Unsupported file format';
    return;
  }

  if (file && file.size <= 1048576) {
    // Ensure file size is less than 1MB
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(`${host}/api/get-data/user/user-profile-data/uploadProfilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token'),
        },
      });

      if (response.data.success) {
        profilePicture.value = response.data.profilePictureUrl;
        successMessage.value = 'Profile picture uploaded successfully';
        window.location.reload();
      } else {
        // console.error(response.data.error);
        errors.value = 'Failed to upload profile picture';
      }
    } catch (error) {
      errors.value = error;
    }
  } else {
    errors.value = 'File is larger than 1 MB or not selected';
  }
};

const handlePictureDelete = async () => {
  // Prevent delete action if profile picture is the default one
  if (isDefaultProfilePicture.value) {
    return;
  }

  successMessage.value = '';
  errors.value = '';

  try {
    const response = await fetch(`${host}/api/get-data/user/user-profile-data/deleteProfilePicture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    if (response.ok) {
      profilePicture.value = json.profilePictureUrl;
      successMessage.value = 'Profile picture deleted successfully';
      window.location.reload();
    } else {
      errors.value = 'Failed to delete profile picture';
    }
  } catch (error) {
    errors.value = error;
  }
};
</script>

<style scoped>
a.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
