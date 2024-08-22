F
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
                :tableData="tableDataSource"
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
import { defineComponent, toRefs, computed } from 'vue';
import DataTables from '@/view/table/DataTable.vue';

export default defineComponent({
  name: 'SalesSheet',
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
    const dataTableColumn = computed(() => {
      if (data.value.length === 0 || data.value.length === undefined) return [];
      const header = data.value[0];

      return header.map((key) => ({
        title: key,
        dataIndex: key,
      }));
    });

    const tableDataSource = computed(() => {
      if (data.value.length <= 1 || data.value.length === undefined) return [];
      const header = data.value[0];
      const rows = data.value.slice(1);

      return rows.map((row) => {
        const rowData = {};
        row.forEach((value, index) => {
          rowData[header[index]] = value;
        });
        return rowData;
      });
    });

    return { dataTableColumn, tableDataSource };
  },
});
</script>
