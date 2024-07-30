<template>
  <div>
    <Main>
      <a-row :gutter="15">
        <a-col :lg="24" :md="12" :sm="12" :xs="12">
          <!-- Customize Dashboard -->
        </a-col>

        <a-col :lg="24" :md="24" :sm="24" :xs="24">
          <!-- Sales Sheet file upload -->
          <sdCards title="Upload Your Sales Sheet">
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
// import DashboardSideDrawer from "./DashboardSideDrawer.vue";

export default defineComponent({
  name: "DashboardTools",
  components: {
    BasicUpload,
    // DashboardSideDrawer,
  },
});
</script>
