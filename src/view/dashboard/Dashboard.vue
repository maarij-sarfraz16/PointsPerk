<template>
  <div>
    <sdPageHeader title="Dashboard" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>
    <Main>
      <a-row justify="center" :gutter="25">
        <a-col :lg="16" :md="12">
          <OverviewDataList />
        </a-col>
        <a-col :lg="8" :md="12">
          <sdCards title="CSV File"> 
            <basic-upload />
           

            </sdCards>
        </a-col>
        <a-col :lg="8" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <SalesOverview />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :lg="16" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <SalesByLocation />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <TopSellingProduct />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <BrowsersState />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import cardData from "../../demoData/overviewCard.json";
import { defineComponent, defineAsyncComponent } from "vue";
import BasicUpload from "@/view/uiElements/upload/Basic.vue"



const SalesOverview = defineAsyncComponent(() =>
  import("./overview/dashboard/SalesOverview.vue")
);
const SalesByLocation = defineAsyncComponent(() =>
  import("./overview/dashboard/SalesByLocation.vue")
);
const TopSellingProduct = defineAsyncComponent(() =>
  import("./overview/dashboard/TopSellingProduct.vue")
);
const OverviewDataList = defineAsyncComponent(() =>
  import("./overview/dashboard/OverviewDataList.vue")
);

const pageRoutes = [
  {
    path: "/",
    breadcrumbName: "dashboard",
  },
];

export default defineComponent({
  name: "Dashboard",
  components: {
    Main,
    BasicUpload,
    OverviewDataList,
    SalesOverview,
    SalesByLocation,
    TopSellingProduct,
  },
  setup() {
    return { cardData, pageRoutes };
  },
});
</script>
