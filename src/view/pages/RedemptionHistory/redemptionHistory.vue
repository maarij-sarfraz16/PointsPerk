<template>
    <div>
      <sdPageHeader title="Redemption History" class="ninjadash-page-header-main"></sdPageHeader>
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
  import { Main } from "../../styled"
  import { defineComponent } from "vue";
  import DataTable from "@/components/table/DataTable";

  const tableDataScource = [];

  const dataTableColumn = [
    {
      title: 'Redemption ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Points Redeemed',
      dataIndex: 'points redeemed',
      key: 'points redeemed',
    },
    {
      title: 'Coupon ID',
      dataIndex: 'Coupon id',
      key: 'Coupon id'
    },
    {
      title: 'Coupon',
      dataIndex: 'Coupon',
      key: 'Coupon'
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
    }
    ]

    

  export default defineComponent({
    name: "RedemptionHistory",
    components: {
      Main,
      DataTable,
    },
    setup() {
      return {
        tableDataScource,
        dataTableColumn
      }
    }
  });
  </script>