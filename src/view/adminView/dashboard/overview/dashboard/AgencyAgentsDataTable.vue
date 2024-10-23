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
                <a-select v-model:value="statusSelect" class="ninjadash-data-status" @change="handleStatusSelect">
                  <a-select-option value="active">Active</a-select-option>
                  <a-select-option value="inactive">Inactive</a-select-option>
                </a-select>
              </div>
              <div class="data-table-options-container">
                <sdButton
                  v-if="statusSelect !== 'Status' || search"
                  type="danger"
                  size="sm"
                  @click="handleClearFilters"
                  transparented
                >
                  Clear Filters
                </sdButton>
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
    ...mapActions('agencyAgents', ['fetchAgencyAgentsData', 'filterAgencyAgentsData', 'deleteUser', 'updateUserStatus']),

    handleDeleteUser(user) {
      this.deleteUser(user.id)
        .then(() => {
          this.$message.success('User Deleted successfully!');
        })
        .catch(() => {
          this.$message.error('Error Occurred While Deleting User');
        });
    },

    handleEditUser(user) {
      this.$refs.modals.showEditUserModal(user);
    },

    handleChangeUserStatus(user) {
      const newStatus = user.status === 'inactive' ? 'active' : 'inactive';

      this.updateUserStatus({ userId: user.id, newStatus })
        .then(() => {
          this.$message.success(`User status changed to ${newStatus}`);
          this.fetchAgencyAgentsData(); 
        })
        .catch(() => {
          this.$message.error('Error occurred while updating user status');
        });
    },

    convertDataToCSV(obj) {
      const headers = [
        'Id',
        'First Name',
        'Last Name',
        'Email',
        'Phone Number',
        'Status',
        'Total Revenue',
        'Redemption Points',
        'Coupons Redeemed',
      ];

      const values = [
        obj.id,
        obj.first_name,
        obj.last_name,
        obj.email,
        obj.phone_number,
        obj.status,
        obj.total_revenue,
        obj.redemption_points,
        obj.coupons_redeemed,
      ];

      const csvContent = [headers.join(','), values.join(',')].join('\n');
      return csvContent;
    },

    handleDownloadCSV(user) {
      const csv = this.convertDataToCSV(user);
      console.log('handleDownloadCSV', csv);
      const blob = new Blob([csv], { type: 'text/csv' });

      const link = document.createElement('a');

      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = user.first_name + '_' + user.last_name + '_data';

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    formatTable(table) {
      return table.map((item) => {
        return {
          id: item.id,
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
              <a-tooltip placement="bottom" title="Export User Data">
                <sdButton size="sm" transparented type="success" onClick={() => this.handleDownloadCSV(item)}>
                  <unicon name="file-download-alt"></unicon>
                </sdButton>
              </a-tooltip>

              <a-tooltip
                placement="bottom"
                title={item.status === 'inactive' ? 'Activate User' : 'Deactivate User'}
              >
                <sdButton
                  size="sm"
                  transparented
                  type={item.status === 'inactive' ? 'success' : 'danger'}
                  onClick={() => this.handleChangeUserStatus(item)}
                >
                  {item.status === 'inactive' ? 'Activate User' : 'Deactivate User'}
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
      this.search = '';
      this.filterAgencyAgentsData({ searchTerm: null, status: 'Status' }); 
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