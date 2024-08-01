<template>
  <sdDrawer
    title="Close"
    placement="right"
    type="submit"
    btnSize="sm"
    btnText="Customize"
    btnType="secondary"
    btnShape="round"
    btnMode="transparent"
    IconName="palette"
    BottomBtnText="Done"
  >
    <Main>
      <a-row justify="center">
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
    </Main>
  </sdDrawer>
</template>

<script>
import { defineComponent, h, computed } from "vue";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";
import cardsData from "@/demoData/sampleCards.json";
import SampleCardThree from "@/components/cards/sampleCard/SampleCardThree";
import DataTable from "@/components/table/DataTable.vue";
import Main from "../../styled";
import { Switch } from "ant-design-vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "DashboardSideDrawer",
  components: {
    SampleCardThree,
    DataTable,
    Main,
  },
  setup() {
    // applying vuex for toggle functionlaity
    const store = useStore();
    const widgetsVisibility = computed(
      () => store.getters["dashboard/widgetsVisibility"]
    );

    const { cardThree } = cardsData;

    const tableDataSource = computed(() => [
      {
        key: "pointsEarningReport",
        Widget: "Points Earning Report",
        Display: widgetsVisibility.value.pointsEarningReport,
        Description: "Displays different types of graphs",
      },
      {
        key: "latestRedemptions",
        Widget: "Latest Redemptions",
        Display: widgetsVisibility.value.latestRedemptions,
        Description: "Displays various charts",
      },
      {
        key: "salesByLocation",
        Widget: "Sales by Location",
        Display: widgetsVisibility.value.salesByLocation,
        Description: "Displays tabular data",
      },
      {
        key: "topSellingProducts",
        Widget: "Top Selling Products",
        Display: widgetsVisibility.value.topSellingProducts,
        Description: "Displays different types of graphs",
      },
      {
        key: "kanbanBoards",
        Widget: "Task Manager Board",
        Display: widgetsVisibility.value.kanbanBoards,
        Description: "Task organization tool",
      },
      {
        key: "taskToDo",
        Widget: "Todo List",
        Display: widgetsVisibility.value.taskToDo,
        Description: "Displays tasks to be done",
      },
      {
        key: "upcomingEvents",
        Widget: "Upcoming Events",
        Display: widgetsVisibility.value.upcomingEvents,
        Description: "Displays tabular data",
      },
      {
        key: "myProfile",
        Widget: "My Profile",
        Display: widgetsVisibility.value.myProfile,
        Description: "Displays different types of graphs",
      },
      {
        key: "agencyMembers",
        Widget: "Agency Members",
        Display: widgetsVisibility.value.agencyMembers,
        Description: "Displays various charts",
      },
    ]);

    const handleSwitchChange = (key, checked) => {
      store.dispatch("dashboard/toggleWidget", key);
      const item = tableDataSource.value.find((item) => item.key === key);
      if (item) {
        item.Display = checked;
      }
    };

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
      widgetsVisibility,
    };
  },
});
</script>
