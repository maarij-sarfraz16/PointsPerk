<template>
  <div>
    <Main>
      <a-row :gutter="15">
        <a-col :lg="24" :md="12" :sm="12" :xs="12">
          <!-- Customize Dashboard -->
          <DashboardSideDrawer />
        </a-col>

        <a-col :lg="24" :md="24" :sm="24" :xs="24">
          <!-- CSV file upload -->
          <sdCards title="CSV File">
            <basic-upload />
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BasicUpload from "@/view/uiElements/upload/Basic.vue";
import DashboardSideDrawer from "./DashboardSideDrawer.vue";

export default defineComponent({
  name: "DashboardTools",
  components: {
    BasicUpload,
    DashboardSideDrawer,
  },
});
</script>
