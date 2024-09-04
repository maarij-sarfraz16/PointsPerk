<template>
  <sdPageHeader title="My Performance" class="ninjadash-page-header-main" :routes="pageRoutes"> </sdPageHeader>
  <Main>
    <ChartStyle>
      <a-row :gutter="15">
        <a-col :lg="16" :md="24" :sm="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <MonthlyEarning />
            </template>
          </Suspense>
        </a-col>

        <a-col :lg="8" :md="24" :sm="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <PerformanceOverview /> </template>
          </Suspense>
        </a-col>
      </a-row>
    </ChartStyle>
  </Main>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue';
import { ChartStyle } from './overview/style';
import { Main } from '@/view/styled';

const PerformanceOverview = defineAsyncComponent(() => import('./overview/PerformanceOverview.vue'));
import MonthlyEarning from './overview/MonthlyEarning.vue';

export default defineComponent({
  name: 'MyPerformance',
  components: {
    PerformanceOverview,
    MonthlyEarning,
    ChartStyle,
    Main,
  },
  setup() {
    const pageRoutes = [
      {
        path: '/user/dashboard',
        breadcrumbName: 'Dashboard',
      },
      {
        path: '',
        breadcrumbName: 'My Performance',
      },
    ];

    return {
      pageRoutes,
    };
  },
});
</script>
