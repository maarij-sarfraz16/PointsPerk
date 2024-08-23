<template>
  <div>

    <sdPageHeader title="Dashboard" class="ninjadash-page-header-main" :routes="pageRoutes"></sdPageHeader>

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

        <!-- Sales Sheet Upload -->
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
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <SalesSheet :data="salesData"/>
            </template>
          </Suspense>
        </a-col>

        <!-- Points Earning Report Graph -->
        <a-col v-if="widgetsVisibility.pointsEarningReport" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <PointsEarning />
            </template>
          </Suspense>
        </a-col>

        <!-- Latest Redemptions -->
        <a-col v-if="widgetsVisibility.latestRedemptions" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <LatestRedemptions />
            </template>
          </Suspense>
        </a-col>

        <!-- Sales By Location -->
        <a-col v-if="widgetsVisibility.salesByLocation" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <SalesByLocation />
            </template>
          </Suspense>
        </a-col>

        <!-- Top Selling Products -->
        <a-col v-if="widgetsVisibility.topSellingProducts" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <TopSellingProduct />
            </template>
          </Suspense>
        </a-col>

        <!-- Kanban Boards -->
        <a-col v-if="widgetsVisibility.kanbanBoards" :lg="24" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <Index />
            </template>
          </Suspense>
        </a-col>

        <!-- Task To Do -->
        <a-col v-if="widgetsVisibility.taskToDo" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <ToDo />
            </template>
          </Suspense>
        </a-col>

        <!-- Upcoming Events -->
        <a-col v-if="widgetsVisibility.upcomingEvents" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <UpcomingEvents />
            </template>
          </Suspense>
        </a-col>

        <!-- My Profile Card -->
        <a-col v-if="widgetsVisibility.myProfile" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <ProfileCard />
            </template>
          </Suspense>
        </a-col>

        <!-- Agency Members List -->
        <a-col v-if="widgetsVisibility.agencyMembers" :lg="12" :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <TeamList />
            </template>
          </Suspense>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Main } from '../styled';
import { defineComponent, defineAsyncComponent } from 'vue';
import { PageHeaderBanner } from '@/components/banners/Banners.vue';
import DashboardTools from './overview/DashboardTools.vue';
import LatestRedemptions from './overview/LatestRedemptions.vue';
import PointsEarning from './overview/PointsEarning.vue';
import Index from './overview/kanban/Index.vue';
import UpcomingEvents from './overview/UpcomingEvents.vue';
import ToDo from '@/view/apps/todo/Todo.vue';
import ProfileCard from '@/components/cards/ProfileCard.vue';
import TeamList from './overview/TeamList.vue';
import SalesSheet from './overview/SalesSheet.vue';

const SalesByLocation = defineAsyncComponent(() => import('./overview/SalesByLocation.vue'));
const TopSellingProduct = defineAsyncComponent(() => import('./overview/TopSellingProduct.vue'));
const OverviewDataList = defineAsyncComponent(() => import('./overview/OverviewDataList.vue'));

const pageRoutes = [
  {
    path: '/',
    breadcrumbName: 'Dashboard',
  },
];

export default defineComponent({
  name: 'Dashboard',
  components: {
    Main,
    OverviewDataList,
    SalesByLocation,
    TopSellingProduct,
    SalesSheet,
    DashboardTools,
    PageHeaderBanner,
    LatestRedemptions,
    PointsEarning,
    Index,
    UpcomingEvents,
    ToDo,
    ProfileCard,
    TeamList,
  },
  setup() {
    const host = 'http://localhost:5000';
    const userData = ref({ firstName: '', lastName: '' });
    const salesData = ref([]);

    const store = useStore();
    const widgetsVisibility = computed(() => store.getters['dashboard/widgetsVisibility']);

    onMounted(async () => {
      try {
        const response = await fetch(`${host}/api/get-data/user/user-data/fetchData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        const json = await response.json();
        if (response.ok) {
          userData.value = json.user;
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

    return {
      pageRoutes,
      userData,
      salesData,
      handleCSVUpload,
      widgetsVisibility,
    };
  },
});
</script>
