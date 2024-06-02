<template>
    <div>
      <DataTable
        :filterOption="true"
        :filterOnchange="true"
        :tableData="tableData"
        :columns="dataTableColumn"
        :rowSelection="true"
      />
    </div>
  </template>
  
  <script>
    import { defineComponent } from "vue";

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
      components: {
      },
      setup() {
        return {
          tableDataScource,
          dataTableColumn
        }
      }
    });
  </script>
  