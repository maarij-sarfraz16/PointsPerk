<template>
  <sdPageHeader title="Redemption History" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>
  <Main>
    <DataTable
      :filterOption="true"
      :filterOnchange="true"
      :tableData="tableDataSource"
      :columns="dataTableColumn"
      :rowSelection="true"
    />
  </Main>
</template>

<script>
import { Main } from '@/view/styled';
import { defineComponent, ref } from 'vue';
import DataTable from '@/components/table/DataTable';
import tableData from './table-data.json';

const pageRoutes = [
  {
    path: '/user/dashboard',
    breadcrumbName: 'Dashboard',
  },
  {
    path: '',
    breadcrumbName: 'Redemption History',
  },
];

const dataTableColumn = [
  {
    title: 'Redemption ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Points Redeemed',
    dataIndex: 'points',
    key: 'points',
  },
  {
    title: 'Coupon ID',
    dataIndex: 'Coupon id',
    key: 'Coupon id',
  },
  {
    title: 'Coupon',
    dataIndex: 'Coupon',
    key: 'Coupon',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

export default defineComponent({
  name: 'RedemptionHistory',
  components: {
    Main,
    DataTable,
  },
  setup() {
    const tableDataSource = ref(tableData);

    return {
      pageRoutes,
      tableDataSource,
      dataTableColumn,
    };
  },
});
</script>
