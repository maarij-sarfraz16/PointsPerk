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
              <PageHeaderBanner :firstName="adminData.name" />
            </template>
          </Suspense>
        </a-col>
        <a-col :xs="24" :md="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <AgencyAgentsDataTable />
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
import { Main } from '../../styled';
import { defineComponent } from 'vue';
import { PageHeaderBanner } from '@/components/banners/Banners.vue';
import AgencyAgentsDataTable from './overview/dashboard/AgencyAgentsDataTable.vue';
const pageRoutes = [
  {
    path: '/admin/dashboard',
    breadcrumbName: 'Dashboard',
  },
];

export default defineComponent({
  name: 'Admin Dashboard',
  components: {
    Main,
    PageHeaderBanner,
    AgencyAgentsDataTable,
  },
  setup() {
    const host = 'http://localhost:5000';
    const adminData = ref({ name: '' });
    const salesData = ref([]);

    const store = useStore();
    const widgetsVisibility = computed(() => store.getters['dashboard/widgetsVisibility']);

    onMounted(async () => {
      try {
        const response = await fetch(`${host}/api/get-data/admin/admin-data/fetchData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        const json = await response.json();
        if (response.ok) {
          adminData.value.name = json.name;
        } else {
          console.error('Failed to fetch admin data:', json);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    });

    const handleCSVUpload = (data) => {
      salesData.value = data;
    };

    return {
      pageRoutes,
      adminData,
      salesData,
      handleCSVUpload,
      widgetsVisibility,
    };
  },
});
</script>
