<template>
  <div>
    <sdPageHeader
      title="Dashboard"
      class="ninjadash-page-header-main"
      :routes="pageRoutes"
    ></sdPageHeader>

    <Main>
      <a-row justify="center" :gutter="25">
        <!-- Welcome Banner -->
        <a-col :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <PageHeaderBanner :firstName="userData.firstName" />
            </template>
          </Suspense>
        </a-col>

        <!-- Overview Data List -->
        <a-col :lg="18" :md="12">
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

        <!-- Customize Dashboard -->
        <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <DashboardTools @csv-uploaded="handleCSVUpload" />
            </template>
          </Suspense>
        </a-col>

        <!-- Sales Sheet Data Table -->
        <a-col :lg="24" :xs="24" :md="24">
          <Suspense>
            <template #default>
              <SalesSheet :data="salesData" />
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
// import CsvFileComponent from "./overview/CsvFileComponent.vue";
import { onMounted, ref } from "vue";
import { Main } from "../styled";
import { defineComponent, defineAsyncComponent } from "vue";
import { PageHeaderBanner } from "@/components/banners/Banners.vue";
import SalesSheet from "@/view/dashboard/overview/SalesSheet.vue";
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
    SalesSheet,
    DashboardTools,
    // CsvFileComponent,
    PageHeaderBanner,
  },
  setup() {
    const host = 'http://localhost:5000';
    const userData = ref({ firstName: '', lastName: '' });
    const salesData = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch(`${host}/api/get-data/user/user-data/fetchData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          }
        });

        const json = await response.json();
        if (response.ok) {
          userData.value = json;
        } else {
          console.error('Failed to fetch user data:', json);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    const handleCSVUpload = (data) => {
      salesData.value = data;
    };

    return { pageRoutes, userData, salesData, handleCSVUpload };
  },
});
</script>
