<template>
  <sdPageHeader title="Leader Board" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>

  <Main>
    <ChartStyle>
      <a-row :gutter="44">
        <a-col :lg="24">
          <Banner5
            title="Our Employee Of The Month For July Is John Dash"
            description="Completed his task earlier than other agents and earned 300 extra points"
            buttonText="View Profile"
          />
        </a-col>

        <a-col :lg="16" :md="24" :sm="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <BestSeller /> </template>
          </Suspense>
        </a-col>

        <a-col :lg="8" :md="24" :sm="24">
          <BannerCarousel></BannerCarousel>
        </a-col>
      </a-row>
    </ChartStyle>
  </Main>
</template>

<script>
import { defineComponent } from 'vue';
import { Banner5 } from '@/components/banners/Banners.vue';
import BestSeller from './overview/BestSeller.vue';
import ChartStyle from './overview/style';
import { Main } from '@/view/styled';
import { BannerCarousel } from '@/components/banners/Banners.vue';

export default defineComponent({
  name: 'LeaderBoard',
  components: {
    Banner5,
    BestSeller,
    ChartStyle,
    Main,
    BannerCarousel,
  },
  setup() {
    const pageRoutes = [
      {
        path: '/user/dashboard',
        breadcrumbName: 'Dashboard',
      },
      {
        path: '',
        breadcrumbName: 'Leader Board',
      },
    ];

    return {
      pageRoutes,
    };
  },
});
</script>
