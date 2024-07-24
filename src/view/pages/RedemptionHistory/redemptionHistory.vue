<template>

    <div>
      <sdPageHeader title="Redemption History" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>
      <Main>
        <DataTable
      :filterOption="true"
      :filterOnchange="true"
      :tableData="tableData"
      :columns="dataTableColumn"
      :rowSelection="true"
    />
      </Main>
    </div>

</template>


<script>
import { Main } from "../../styled";
import { defineComponent, ref } from "vue";
import DataTable from "@/components/table/DataTable";
import tableData from "@/view/pages/RedemptionHistory/table-data.json"; 

  const pageRoutes = [
      {
        path: "/",
        breadcrumbName: "Dashboard",
      },
      {
        path: "",
        breadcrumbName: "Redemption History",
      },
    ];
  
  const tableDataScource = [];


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
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];


  export default defineComponent({
    name: "RedemptionHistory",
    components: {
      Main,
      DataTable,
    },
    setup() {
    const tableDataSource = ref(tableData);
      return {
        pageRoutes,
        tableDataScource,
        dataTableColumn
      }
    }
  });
  </script>
