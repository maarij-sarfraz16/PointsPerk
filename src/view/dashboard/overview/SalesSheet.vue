<template>
<div>
    <Main>
      <a-row :gutter="15">
        <a-col :lg="24" :md="24" :xs="24">
          <BorderLessHeading>
            <sdCards title="Your Sales Sheet">
              <DataTables
                :filterOption="true"
                :filterOnchange="true"
                :tableData="tableDataScource"
                :columns="dataTableColumn"
                :rowSelection="false"
              />
            </sdCards>
          </BorderLessHeading>
        </a-col>
    </a-row>
    </Main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DataTables from "@/view/table/DataTable.vue"

export default defineComponent({
  name: "SalesSheet",
  components: {
    DataTables
},
    });
</script>

