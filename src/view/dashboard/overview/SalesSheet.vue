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
                :tableData="processedData.length ? processedData : tableDataSource"
                :columns="processedData.length ? Object.keys(processedData[0]).map(key => ({ title: key, dataIndex: key })) : dataTableColumn"
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
import { defineComponent, toRefs, ref, computed } from 'vue';
import DataTables from "@/view/table/DataTable.vue";

export default defineComponent({
  name: "SalesSheet",
  components: {
    DataTables,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const tableDataSource = ref([]);  // Placeholder for initial empty state
    const dataTableColumn = ref([]);  // Placeholder for initial empty state

    const processedData = computed(() => {
      return data.value.length ? data.value : tableDataSource.value;
    });

    return { processedData, tableDataSource, dataTableColumn };
  },
});
</script>

