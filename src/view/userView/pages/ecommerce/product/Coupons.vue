<template>
  <sdPageHeader title="Coupons" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>

  <Main>
    <a-row :gutter="30">
      <a-col class="coupons-sidebar-col" :xxl="5" :xl="7" :lg="7" :md="10" :xs="24">
        <Suspense>
          <template #default>
            <Filters />
          </template>
          <template #fallback>
            <sdCards headless>
              <a-skeleton :paragraph="{ rows: 22 }" active />
            </sdCards>
          </template>
        </Suspense>
      </a-col>
      <a-col class="coupons-content-col" :xxl="19" :lg="17" :md="14" :xs="24">
        <TopToolBox>
          <a-row :gutter="0">
            <a-col :xxl="7" :lg="12" :xs="24">
              <sdAutoComplete :dataSource="searchData" placeholder="Search" width="100%" patterns />
            </a-col>
            <a-col :xxl="7" :lg="12" :xs="24">
              <p class="search-result">Showing 1–8 of 86 results</p>
            </a-col>
            <a-col :xxl="10" :xs="24">
              <div class="coupons-list-action d-flex justify-content-between align-items-center">
                <div class="coupons-list-action__tab">
                  <span class="toolbox-menu-title"> Status:</span>
                  <a-radio-group @change="onSorting" v-model:value="sortDefault">
                    <a-radio-button value="all">All</a-radio-button>
                    <a-radio-button value="available">Available</a-radio-button>
                    <a-radio-button value="claimed">Claimed</a-radio-button>
                  </a-radio-group>
                </div>

                <div
                  v-if="(innerWidth <= 991 && innerWidth >= 768) || innerWidth > 575"
                  class="coupons-list-action__viewmode"
                >
                  <router-link to="/user/coupons">
                    <unicon name="apps" width="16"></unicon>
                  </router-link>
                  <router-link to="/user/couponList">
                    <unicon name="list-ul" width="16"></unicon>
                  </router-link>
                </div>
              </div>
            </a-col>
          </a-row>
        </TopToolBox>
        <router-view name="grid"></router-view>
      </a-col>
    </a-row>
  </Main>
</template>

<script>
import { computed, ref, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { Main } from '@/view/styled';
import { TopToolBox } from '../Style';

const Filters = defineAsyncComponent(() => import('./overview/Filters'));
const pageRoutes = [
  {
    path: '/',
    breadcrumbName: 'Dashboard',
  },
  {
    path: '',
    breadcrumbName: 'Coupons',
  },
];
const coupons = {
  name: 'Coupons',
  components: { TopToolBox, Main, Filters },
  setup() {
    const { state, dispatch } = useStore();
    const searchData = computed(() => state.headerSearchData.data);
    const active = ref('active');
    const onSorting = (e) => {
      if (e.target.value === 'all') {
        dispatch('filterByAll');
      } else if (e.target.value === 'available') {
        dispatch('filterByAvailable');
      } else if (e.target.value === 'claimed') {
        dispatch('filterByClaimed');
      }
    };
    const sortDefault = ref('rate');

    const innerWidth = ref(window.innerWidth);

    return {
      searchData,
      active,
      onSorting,
      innerWidth,
      pageRoutes,
      sortDefault,
    };
  },
};

export default coupons;
</script>
