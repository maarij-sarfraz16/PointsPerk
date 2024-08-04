<template>
  <div class="cover-image">

    <img style="width: 100%" :src="require('../../../../static/img/profile/cover-img.png')" alt="banner" />
    
    <a-upload>
      <a to="#"> <unicon name="camera" width="16"></unicon> Change Cover </a>
    </a-upload>
    
  </div>
</template>

<script>
  import axios from 'axios';
  import { defineComponent, onMounted, ref } from 'vue';

  const CoverSection = defineComponent({
    name: "CoverSection",
    components: {},
    
    setup() {
      const host = 'http://localhost:5000';
      const coverPicture = ref('');
      const fileInput = ref(null);
      const successMessage = ref('');
      const errors = ref('');



      return {
        coverPicture,
        fileInput,
        successMessage,
        errors
      };
    },
  });

  export default CoverSection;
</script>
