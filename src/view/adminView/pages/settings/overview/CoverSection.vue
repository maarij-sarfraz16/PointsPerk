<template>
  <div class="cover-image">

    <img style="width: 100%" :src="require('../../../../../static/img/profile/cover-img.png')" alt="Banner" />
  
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  const CoverSection = defineComponent({
    name: "CoverSection",
    components: {},
    
    setup() {
      return {};
    },
  });

  export default CoverSection;
</script>