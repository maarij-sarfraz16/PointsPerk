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
import DataTables from '@/components/view-table/DataTable.vue';

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
      if (!Array.isArray(data.value) || data.value.length === 0) return [];
      const header = Object.keys(data.value[0]);

      return header.map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
      }));
    });

    
    const tableDataSource = computed(() => {
      if (!Array.isArray(data.value) || data.value.length === 0) return [];
      return data.value;
    });

    return { dataTableColumn, tableDataSource };
  },
});
</script>


