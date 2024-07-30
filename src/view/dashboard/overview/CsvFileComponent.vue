<template>
  <div>
    <!-- Hidden file input -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept=".csv"
      style="display: none;"
    />
  </div>
</template>

<script>
export default {
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const data = this.parseCSV(text);
          this.$emit('csv-uploaded', data);
        };
        reader.readAsText(file);
      }
    },
    parseCSV(text) {
      const rows = text.trim().split('\n');
      return rows.map(row => row.split(','));
    },
  },
};
</script>
