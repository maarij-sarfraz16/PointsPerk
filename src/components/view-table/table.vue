<template>
  <div>
    <sdPageHeader title="Tables" class="ninjadash-page-header-main">
    </sdPageHeader>
    <Main>
      <a-row :gutter="15">
        <a-col :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <sdCards title="Basic Usage">
                <BasicTable />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <DragAndDropTable /> </template>
          </Suspense>
        </a-col>

        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <top-selling-product /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <BrowserState /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <RevenueGenerated /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <new-product /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <best-seller /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <active-user /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <top-product /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <recent-deals /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <recent-seller /> </template>
          </Suspense>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <MemberProgress /> </template>
          </Suspense>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../../view/styled";
import { defineComponent, defineAsyncComponent } from "vue";

const DragAndDropTable = defineAsyncComponent(() => import("./DragTable"));
const BasicTable = defineAsyncComponent(() => import("./overview/BasicTable"));

const TopSellingProduct = defineAsyncComponent(() =>
  import("@/view/dashboard/overview/TopSellingProduct.vue")
);

export default defineComponent({
  name: "Tables",
  components: {
    Main,
    BasicTable,
    DragAndDropTable,
    TopSellingProduct,
  },
});
</script>
