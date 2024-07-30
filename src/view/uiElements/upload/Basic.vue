<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :multiple="true"
    :before-upload="beforeUpload"
    :show-upload-list="false"
  >
    <sdButton class="btn-outlined" type="primary" size="lg">
      <upload-outlined />
      <span>Click to Upload</span>
    </sdButton>
  </a-upload>
</template>

<script>
import { ref, defineComponent } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "BasicUpload",
  components: {
    UploadOutlined,
  },
  setup(props, { emit }) {
    const fileList = ref([]);
    
    const parseCSV = (text) => {
      const rows = text.trim().split('\n');
      return rows.map(row => row.split(','));
    };

    const beforeUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const data = parseCSV(text);
        emit('csv-uploaded', data);
        message.success(`${file.name} file uploaded successfully`);
      };
      reader.readAsText(file);
      return false; // Prevent auto-upload
    };

    return {
      fileList,
      beforeUpload,
    };
  },
});
</script>
