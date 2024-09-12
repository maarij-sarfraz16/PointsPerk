<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :multiple="false"
    :before-upload="beforeUpload"
    :headers="headers"
    @change="handleChange"
  >
    <sdButton class="btn-outlined" type="light" size="lg" :outlined="true">
      <upload-outlined></upload-outlined>
      <span>Click to Upload</span>
    </sdButton>
  </a-upload>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import Papa from 'papaparse';

export default defineComponent({
  name: 'BasicUpload',
  components: {
    UploadOutlined,
  },
  setup(props, { emit }) {
    const handleChange = (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    const headers = {
      authorization: 'authorization-text',
    };

    const beforeUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = Papa.parse(e.target.result, { header: true, skipEmptyLines: true }).data;
        emit('csv-uploaded', csvData);
      };
      reader.readAsText(file);
      return false; 
    };

    return {
      fileList,
      headers,
      handleChange,
      beforeUpload,
    };
  },
});
</script>
