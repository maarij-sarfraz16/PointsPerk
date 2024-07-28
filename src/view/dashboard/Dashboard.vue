<template>
  <div>
    <sdPageHeader
      title="Dashboard"
      class="ninjadash-page-header-main"
      :routes="pageRoutes"
    ></sdPageHeader>
    <Main>
      <a-row justify="center" :gutter="25">
        <!-- welcome banner -->
        <a-col :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <PageHeaderBanner /> </template>
          </Suspense>
        </a-col>

        <!-- Overview Data List -->

        <a-col :lg="20" :md="12">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <OverviewDataList />
            </template>
          </Suspense>
        </a-col>

        <!-- Customize Dashboard & CSV Upload -->
        <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <DashboardTools />
            </template>
          </Suspense>
        </a-col>

        <!-- CSV File Data Table-->

        <a-col :lg="24" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <csvFile />
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
import { PageHeaderBanner } from "@/components/banners/Banners.vue";
import csvFile from "@/view/dashboard/overview/csvFile";
import DashboardTools from "./overview/DashboardTools.vue";

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
    breadcrumbName: "Dashboard",
  },
];

export default defineComponent({
  name: "Dashboard",
  components: {
    Main,
    OverviewDataList,
    SalesByLocation,
    TopSellingProduct,
    csvFile,
    DashboardTools,
    PageHeaderBanner,
  },
  setup() {
    return { cardData, pageRoutes };
  },
});
</script>
