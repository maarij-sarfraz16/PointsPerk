<template>
  <Main>
    <sdDrawer
      title="Close"
      placement="right"
      type="submit"
      btnText="Customize"
      btnType="secondary"
      btnShape="round"
      btnMode="transparent"
      IconName="palette"
      BottomBtnText="Done"
    >
      <a-row justify="center" gutter="35">
        <a-col :lg="24" :md="24" :sm="24">
          <div>
            <SampleCardThree :item="cardThree[0]" />
          </div>
        </a-col>

        <a-col :lg="24" :md="24" :sm="24">
          <DataTable
            :filterOption="false"
            :filterOnchange="false"
            :rowSelection="false"
            :tableData="tableDataSource"
            :columns="dataTableColumn"
          />
        </a-col>
      </a-row>
    </sdDrawer>
  </Main>
</template>

<script>
import { defineComponent, reactive, h } from "vue";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";
import cardsData from "@/demoData/sampleCards.json";
import SampleCardThree from "@/components/cards/sampleCard/SampleCardThree";
import DataTable from "@/components/table/DataTable.vue";
import Main from "../../styled";
import { Switch } from "ant-design-vue";

export default defineComponent({
  name: "DashboardSideDrawer",
  components: {
    SampleCardThree,
    DataTable,
    Main,
  },
  setup() {
    const { cardThree } = cardsData;

    const tableDataSource = reactive([
      {
        key: "1",
        Widget: "Welcome Banner",
        Display: true,
        Description: "Displays various charts",
      },
      {
        key: "2",
        Widget: "CSV Data Table",
        Display: false,
        Description: "Displays tabular data",
      },
      {
        key: "3",
        Widget: "Sales By Location",
        Display: true,
        Description: "Displays different types of graphs",
      },
      {
        key: "4",
        Widget: "Top Selling Products",
        Display: true,
        Description: "Displays various charts",
      },
      {
        key: "5",
        Widget: "Latest Transaction",
        Display: false,
        Description: "Displays tabular data",
      },
      {
        key: "6",
        Widget: "Points Earning Report",
        Display: true,
        Description: "Displays different types of graphs",
      },
      {
        key: "7",
        Widget: "Todo List",
        Display: true,
        Description: "Displays various charts",
      },
      {
        key: "8",
        Widget: "Notes",
        Display: false,
        Description: "Displays tabular data",
      },
      {
        key: "9",
        Widget: "Upcoming Events",
        Display: true,
        Description: "Displays different types of graphs",
      },
      {
        key: "10",
        Widget: "Kanban Board",
        Display: true,
        Description: "Displays various charts",
      },
      {
        key: "11",
        Widget: "My Profile",
        Display: false,
        Description: "Displays tabular data",
      },
      {
        key: "12",
        Widget: "Team Members",
        Display: true,
        Description: "Displays different types of graphs",
      },
    ]);

    // Handle switch change
    const handleSwitchChange = (key, checked) => {
      const item = tableDataSource.find((item) => item.key === key);
      if (item) {
        item.Display = checked;
      }
    };

    // Define columns with custom render
    const dataTableColumn = [
      {
        title: "Widget",
        dataIndex: "Widget",
        key: "Widget",
      },
      {
        title: "Display",
        dataIndex: "Display",
        key: "Display",
        // Using Vue's `h` to create VNodes
        customRender: ({ record }) => {
          return h(
            Switch,
            {
              checked: record.Display,
              "checked-children": h(CheckOutlined),
              "un-checked-children": h(CloseOutlined),
              onChange: (checked) => handleSwitchChange(record.key, checked),
            },
            {}
          );
        },
      },
      {
        title: "Description",
        dataIndex: "Description",
        key: "Description",
      },
    ];

    return {
      cardThree,
      tableDataSource,
      dataTableColumn,
    };
  },
});
</script>
