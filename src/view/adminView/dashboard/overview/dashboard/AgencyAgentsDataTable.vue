<template>
  <BorderLessHeading>
    <sdCards title="Agency Agents ">
      <DataTableStyleWrap>
        <div class="ninjadash-datatable-filter">
          <div class="ninjadash-datatable-filter__left status-select">
            <div class="inputs-container">
              <div class="search-status">
                <div class="ninjadash-datatable-filter__right">
                  <a-input v-model:value="search" @change="handleSearch" size="default" placeholder="Search">
                    <template #prefix>
                      <unicon name="search"></unicon>
                    </template>
                  </a-input>
                </div>
                <a-select
                  v-model:value="statusSelect"
                  placeholder=""
                  :style="{ width: 200 }"
                  class="ninjadash-data-status"
                  @change="handleStatusSelect"
                >
                  <a-select-option value="active">Active</a-select-option>
                  <a-select-option value="inactive">Inactive</a-select-option>
                </a-select>
              </div>
              <div class="data-table-options-container">
                <sdButton type="danger" size="sm" @click="handleClearFilters" transparented>Clear Filters</sdButton>
                <AgencyAgentsModals ref="modals" />
              </div>
            </div>
          </div>
        </div>

        <div class="ninjadasj-datatable">
          <TableWrapper class="table-data-view table-responsive">
            <a-table
              :pagination="{ pageSize: 50, showSizeChanger: true }"
              :data-source="tableData"
              :columns="columns"
              :scroll="{ x: 1600, y: 500 }"
              style="cursor: default"
            />
          </TableWrapper>
        </div>
      </DataTableStyleWrap>
    </sdCards>
  </BorderLessHeading>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { DataTableStyleWrap, TableWrapper } from '../../../../../components/view-table/Style';
import { BorderLessHeading } from '../../../../../view/styled';
import AgencyAgentsModals from './AgencyAgentsModals.vue';

export default defineComponent({
  name: 'AgencyAgentsDataTable',

  components: { DataTableStyleWrap, TableWrapper, BorderLessHeading, AgencyAgentsModals },

  data() {
    return {
      checkFlag: false,
      search: '',
      statusSelect: 'Status',
      columns: [
        { title: 'Id', dataIndex: 'id', key: 'id', width: '80px', align: 'center' },
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
          width: '150px',
          align: 'center',
          ellipsis: true,
        },

        {
          title: 'Last Name',
          dataIndex: 'last_name',
          key: 'last_name',
          width: '150px',
          align: 'center',
          ellipsis: true,
        },
        {
          title: 'Agency Name',
          key: 'agency.name',
          customRender: ({ record }) => (record.agency ? record.agency.name : 'N/A'),
          width: '150px',
          align: 'center',

          ellipsis: true,
        },
        {
          title: 'Agency Region',
          key: 'agency.region',
          customRender: ({ record }) => (record.agency ? record.agency.region : 'N/A'),
          width: '150px',
          align: 'center',

          ellipsis: true,
        },
        {
          title: 'Agency City',
          key: 'agency.city',
          customRender: ({ record }) => (record.agency ? record.agency.city : 'N/A'),
          width: '150px',
          align: 'center',
          ellipsis: true,
        },

        { title: 'Email', dataIndex: 'email', key: 'email', width: '150px', align: 'center', ellipsis: true },
        {
          title: 'Contact',
          dataIndex: 'phone_number',
          key: 'phone_number',
          width: '150px',
          align: 'center',
          ellipsis: true,
        },
        { title: 'Status', dataIndex: 'status', key: 'status', width: '150px', align: 'center' },
        { title: 'Actions', dataIndex: 'action', key: 'action', width: '150px', align: 'center' },
      ],
    };
  },

  computed: {
    ...mapGetters('agencyAgents', ['getFilteredAgencyData', 'getAgencyAgentsData']),

    tableData() {
      return this.getFilteredAgencyData && this.checkFlag
        ? this.formatTable(this.getFilteredAgencyData)
        : this.getAgencyAgentsData && !this.checkFlag
        ? this.formatTable(this.getAgencyAgentsData)
        : [];
    },
  },

  methods: {
    ...mapActions('agencyAgents', ['fetchAgencyAgentsData', 'filterAgencyAgentsData', 'deleteUser']),

    handleDeleteUser(user) {
      this.deleteUser(user.id)
        .then(() => {
          this.$message.success('User Deleted successfully!');
        })
        .catch(() => {
          this.$message.error('Error Occured While Deleting User');
        });
    },

    handleEditUser(user) {
      this.$refs.modals.showEditUserModal(user);
    },

    formatTable(table) {
      return table.map((item) => {
        return {
          id: item.id,
          agency: {
            name: item.agency ? (
              <a-tooltip placement="bottom" title={`${item.agency.name}`}>
                <div class={'text-truncate'}>{item.agency.name}</div>
              </a-tooltip>
            ) : (
              'N/A'
            ),
            region: item.agency ? (
              <a-tooltip placement="bottom" title={`${item.agency.region}`}>
                <div class={'text-truncate'}>{item.agency.region}</div>
              </a-tooltip>
            ) : (
              'N/A'
            ),
            city: item.agency ? (
              <a-tooltip placement="bottom" title={`${item.agency.city}`}>
                <div class={'text-truncate'}>{item.agency.city}</div>
              </a-tooltip>
            ) : (
              'N/A'
            ),
          },
          first_name: (
            <a-tooltip placement="bottom" title={`${item.first_name}`}>
              <div class={'text-truncate'}>{item.first_name}</div>
            </a-tooltip>
          ),
          last_name: (
            <a-tooltip placement="bottom" title={`${item.last_name}`}>
              <div class={'text-truncate'}>{item.last_name}</div>
            </a-tooltip>
          ),
          email: (
            <a-tooltip placement="bottom" title={`${item.email}`}>
              <div class={'text-truncate'}>{item.email}</div>
            </a-tooltip>
          ),
          phone_number: (
            <a-tooltip placement="bottom" title={`${item.phone_number}`}>
              <div class={'text-truncate'}>{item.phone_number}</div>
            </a-tooltip>
          ),
          status: <span class={`ninjadash-status ninjadash-status-${item.status}`}>{item.status}</span>,
          action: (
            <div class={'table-actions-col'}>
              <a-tooltip placement="bottom" title="Delete User">
                <sdButton size="sm" transparented type="danger" onClick={() => this.handleDeleteUser(item)}>
                  <unicon name="trash-alt"></unicon>
                </sdButton>
              </a-tooltip>

              <a-tooltip placement="bottom" title="Edit User">
                <sdButton size="sm" transparented type="primary" onClick={() => this.handleEditUser(item)}>
                  <unicon name="edit"></unicon>
                </sdButton>
              </a-tooltip>
            </div>
          ),
        };
      });
    },
    handleSearch() {
      console.log('handleSearch Function', this.search);
      if (this.search) {
        this.checkFlag = true;
        this.filterAgencyAgentsData({ searchTerm: this.search, status: this.statusSelect });
      } else {
        this.checkFlag = false;
        this.filterAgencyAgentsData({ searchTerm: null, status: this.statusSelect });
      }
    },
    handleStatusSelect(status) {
      this.statusSelect = status;
      this.checkFlag = true;
      this.filterAgencyAgentsData({ searchTerm: this.search, status });
    },
    handleClearFilters() {
      this.checkFlag = false;
      this.statusSelect = 'Status';
      this.searchTerm = '';
    },
  },

  mounted() {
    this.fetchAgencyAgentsData();
  },
});
</script>

<style scoped>
.status-select {
  display: flex;
}
.search-status {
  display: flex;
  gap: 10px;
  align-items: center;
}
.inputs-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.data-table-options-container {
  display: flex;
  gap: 10px;
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-actions-col {
  display: flex;
  gap: 10px;
}
</style>
