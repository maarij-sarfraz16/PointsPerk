<template>
  <sdCards headless>
    <div class="author-info">

      <figure>
        <img :src="profilePicture" alt="Profile Picture" />
        <a-upload type="file" @change="handleFileChange" style="display: none;" ref="fileInput">
          <a @click="triggerFileInput">
            <unicon name="camera" width="16"></unicon>
          </a>
        </a-upload>
      </figure>

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
  import { onMounted, ref } from 'vue';
  const host = 'http://localhost:5000';
  const userData = ref({ firstName: '', lastName: '' });
  const profilePicture = ref(require('../../../../static/img/users/1.png'));
  const fileInput = ref(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${host}/api/get-data/user/user-data/fetchData`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });

      if (response.status === 200) {
        userData.value = response.data;
        profilePicture.value = response.data.profilePicture || profilePicture.value;
      } else {
        console.error('Failed to fetch user data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const triggerFileInput = () => {
    fileInput.value.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1048576) { // Ensure file size is less than 1MB
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await axios.post(`${host}/api/get-data/user/user-profile-data/uploadProfilePicture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': localStorage.getItem('token'),
          }
        });

        if (response.data.success) {
          profilePicture.value = response.data.profilePictureUrl;
          console.log('Profile picture uploaded successfully:', response.data.profilePictureUrl);
        } else {
          console.error('Failed to upload profile picture:', response.data.error);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    } else {
      console.error('File is too large or not selected');
    }
  };

  onMounted(fetchUserData);
  
</script>