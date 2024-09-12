<template>
  <div>
    <Main>
      <a-row :gutter="15">
        <a-col :lg="24" :md="24" :sm="24" :xs="24">
          <sdCards title="Upload Your Sales Sheet">
            <basic-upload @csv-uploaded="handleCSVUpload" />
          </sdCards>
        </a-col>

        <a-col :lg="24" :md="24" :sm="24" :xs="24">
          <sdCards title="Download Updated CSV">
            <a-button type="primary" @click="downloadCSV"> <download-outlined /> Click to Download</a-button>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BasicUpload from '@/components/upload/Basic.vue';
import { DownloadOutlined } from "@ant-design/icons-vue";
import { Button } from 'ant-design-vue';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default defineComponent({
  name: "DashboardTools",
  components: {
    BasicUpload,
    AButton: Button,
    DownloadOutlined,
  },
  data() {
    return {
      fileName: 'updated sales sheet', 
      usersTableData: [], 
    };
  },
  methods: {
    handleCSVUpload(data) {

      this.usersTableData = data;
      this.$emit('csv-uploaded', data);
    },
    
    async exportToXLSX(inputData, fileName) {
      try {
        
        const ws = XLSX.utils.json_to_sheet(inputData);

        
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

        FileSaver.saveAs(data, fileName + ".xlsx");

      } catch (error) {
        console.error("Error exporting to XLSX:", error);
      }
    },
    downloadCSV() {
      const data = this.usersTableData; 
      if (data.length > 0) {
        this.exportToXLSX(data, this.fileName); 
      } else {
        alert('No data available, upload CSV First.');
      }
    },
  },
});
</script>
