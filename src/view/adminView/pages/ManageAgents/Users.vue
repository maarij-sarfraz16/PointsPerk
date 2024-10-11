<template>
  <CardToolbox>
    <UserCarrdTop>
      <sdPageHeader title="Agents" :routes="[]" class="ninjadash-page-header-main">
        <template #subTitle>
          <span class="title-counter">{{ totalAgents }} Agents</span>
          <sdAutoComplete
            v-model="searchQuery"
            :dataSource="agencyAgentsData"
            placeholder="Search by Name"
            :filterKey="['first_name', 'last_name']"
            width="100%"
            patterns
          />
        </template>
        <template #buttons>
          <sdButton class="btn-add_new" size="default" type="primary" key="1">
            <router-link to="/admin/addagent/details">
              <unicon name="plus" width="14"></unicon> Add New Agent
            </router-link>
          </sdButton>
        </template>
      </sdPageHeader>
    </UserCarrdTop>
  </CardToolbox>
  <Main>
    <UsercardWrapper>
      <a-row :gutter="25">
        <router-view name="descendant" :paginatedData="paginatedData"></router-view>
        <a-col :xs="24">
          <div class="user-card-pagination">
            <a-pagination
              @change="onChange"
              showSizeChanger
              @showSizeChange="onShowSizeChange"
              :defaultCurrent="1"
              :total="filteredData.length"
              :current="current"
              :pageSize="pageSize"
            />
          </div>
        </a-col>
      </a-row>
    </UsercardWrapper>
  </Main>
</template>

<script>
import { UsercardWrapper, UserCarrdTop } from './style';
import { Main, CardToolbox } from '@/view/styled';
import { ref, defineComponent, computed } from 'vue';
import agencyAgentsData from '@/demoData/agencyAgentsData.json';
import { useRoute } from 'vue-router';

const Users = defineComponent({
  name: 'Users',
  components: { UsercardWrapper, UserCarrdTop, Main, CardToolbox },
  setup() {
    const { path } = useRoute().matched[2];

    const current = ref(1); // Current page
    const pageSize = ref(12); // Page size
    const searchQuery = ref(''); // Search input

    // Filtered data based on search query
    const filteredData = computed(() => {
      if (!searchQuery.value) {
        return agencyAgentsData; // If no search query, return full data
      }
      return agencyAgentsData.filter((agent) => {
        const fullName = `${agent.first_name} ${agent.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.value.toLowerCase());
      });
    });

    // Paginated data based on current page and page size
    const paginatedData = computed(() => {
      const start = (current.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredData.value.slice(start, end); // Slice filtered data based on pagination
    });

    // Total agents count (filtered)
    const totalAgents = computed(() => filteredData.value.length);

    // Handle page size change
    const onShowSizeChange = (currentPage, newSize) => {
      current.value = currentPage;
      pageSize.value = newSize;
    };

    // Handle page change
    const onChange = (page) => {
      current.value = page;
    };

    return {
      agencyAgentsData,
      path,
      current,
      pageSize,
      searchQuery, // Bind searchQuery for v-model
      filteredData,
      paginatedData,
      totalAgents,
      onShowSizeChange,
      onChange,
    };
  },
});

export default Users;
</script>
