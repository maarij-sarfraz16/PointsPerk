<template>
  <div class="modals-btn-group">
    <sdButton type="primary" size="sm" @click="showAddUserModal" transparented> Add Agent</sdButton>

    <!-- Add User Modal -->
    <a-modal
      centered
      v-model:visible="addUserModalVisible"
      title="Add New Agent"
      @ok="handleAddUser"
      @cancel="closeAddUserModal"
    >
      <a-form ref="formRef" :model="newAgent" :rules="rules" layout="vertical">
        <a-form-item label="First Name" name="first_name">
          <a-input v-model:value="newAgent.first_name" placeholder="Enter First Name" />
        </a-form-item>

        <a-form-item label="Last Name" name="last_name">
          <a-input v-model:value="newAgent.last_name" placeholder="Enter Last Name" />
        </a-form-item>

        <a-form-item label="Agency Name" name="agency_name">
          <a-input v-model:value="newAgent.agency_name" placeholder="Enter Agency Name" />
        </a-form-item>

        <a-form-item label="Agency Region" name="agency_region">
          <a-input v-model:value="newAgent.agency_region" placeholder="Enter Agency Region" />
        </a-form-item>

        <a-form-item label="Agency City" name="agency_city">
          <a-input v-model:value="newAgent.agency_city" placeholder="Enter Agency City" />
        </a-form-item>

        <a-form-item label="Email" name="email">
          <a-input v-model:value="newAgent.email" placeholder="Enter Email" />
        </a-form-item>

        <a-form-item label="Contact" name="phone_number">
          <a-input v-model:value="newAgent.phone_number" placeholder="Enter Contact Number" />
        </a-form-item>

        <a-form-item label="Status" name="status">
          <a-select v-model:value="newAgent.status" placeholder="Select Status">
            <a-select-option value="active">Active</a-select-option>
            <a-select-option value="inactive">Inactive</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Edit User Modal -->
    <a-modal
      centered
      v-model:visible="editUserModalVisible"
      title="Edit Agent"
      @ok="handleEditUser"
      @cancel="closeEditUserModal"
    >
      <a-form ref="formRef" :model="selectedAgent" :rules="rules" layout="vertical">
        <a-form-item label="First Name" name="first_name">
          <a-input v-model:value="selectedAgent.first_name" placeholder="Enter First Name" />
        </a-form-item>

        <a-form-item label="Last Name" name="last_name">
          <a-input v-model:value="selectedAgent.last_name" placeholder="Enter Last Name" />
        </a-form-item>

        <a-form-item label="Agency Name" name="agency_name">
          <a-input v-model:value="selectedAgent.agency_name" placeholder="Enter Agency Name" />
        </a-form-item>

        <a-form-item label="Agency Region" name="agency_region">
          <a-input v-model:value="selectedAgent.agency_region" placeholder="Enter Agency Region" />
        </a-form-item>

        <a-form-item label="Agency City" name="agency_city">
          <a-input v-model:value="selectedAgent.agency_city" placeholder="Enter Agency City" />
        </a-form-item>

        <a-form-item label="Email" name="email">
          <a-input v-model:value="selectedAgent.email" placeholder="Enter Email" />
        </a-form-item>

        <a-form-item label="Contact" name="phone_number">
          <a-input v-model:value="selectedAgent.phone_number" placeholder="Enter Contact Number" />
        </a-form-item>

        <a-form-item label="Status" name="status">
          <a-select v-model:value="selectedAgent.status" placeholder="Select Status">
            <a-select-option value="active">Active</a-select-option>
            <a-select-option value="inactive">Inactive</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'AgencyAgentsModals',

  data() {
    return {
      addUserModalVisible: false,
      editUserModalVisible: false,
      originalAgent: '',
      newAgent: {
        agency_name: '',
        agency_city: '',
        agency_region: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
      },
      selectedAgent: {
        id: null,
        agency_name: '',
        agency_city: '',
        agency_region: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
      },
      rules: {
        first_name: [
          { required: true, message: 'First name is required', trigger: 'blur' },
          { pattern: /^[A-Za-z\s]+$/, message: 'First name must contain only alphabets', trigger: 'blur' },
        ],
        last_name: [
          { required: true, message: 'Last name is required', trigger: 'blur' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Last name must contain only alphabets', trigger: 'blur' },
        ],
        agency_name: [
          { required: true, message: 'Agency name is required', trigger: 'blur' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Agency name must contain only alphabets', trigger: 'blur' },
        ],
        agency_region: [
          { required: true, message: 'Agency region is required', trigger: 'blur' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Agency region must contain only alphabets', trigger: 'blur' },
        ],
        agency_city: [
          { required: true, message: 'Agency city is required', trigger: 'blur' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Agency city must contain only alphabets', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Invalid email format', trigger: 'blur' },
        ],
        phone_number: [
          { required: true, message: 'Phone number is required', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: 'Phone number must contain only numbers', trigger: 'blur' },
        ],
        status: [{ required: true, message: 'Status is required', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapGetters('agencyAgents', ['getAgencyAgentsData']),
  },
  methods: {
    ...mapActions('agencyAgents', ['addNewAgent', 'editUser']),
    showAddUserModal() {
      this.addUserModalVisible = true;
    },
    closeAddUserModal() {
      this.addUserModalVisible = false;
      this.resetForm();
    },
    showEditUserModal(agent) {
      this.originalAgent = agent;
      this.selectedAgent = {
        id: agent.id,
        agency_name: agent.agency.name,
        agency_region: agent.agency.region,
        agency_city: agent.agency.city,
        first_name: agent.first_name,
        last_name: agent.last_name,
        email: agent.email,
        phone_number: agent.phone_number,
        status: agent.status,
      };

      this.editUserModalVisible = true;
    },
    closeEditUserModal() {
      this.editUserModalVisible = false;
      this.resetForm();
    },
    async handleAddUser() {
      try {
        await this.$refs.formRef.validate();

        const newId = this.getAgencyAgentsData.length + 1;

        const newAgentData = {
          id: newId,
          agency: {
            name: this.newAgent.agency_name,
            region: this.newAgent.agency_region,
            city: this.newAgent.agency_city,
          },
          first_name: this.newAgent.first_name,
          last_name: this.newAgent.last_name,
          email: this.newAgent.email,
          phone_number: this.newAgent.phone_number,
          status: this.newAgent.status,
        };

        await this.addNewAgent(newAgentData);
        this.$message.success('New agent added successfully!');
        this.resetForm();
        this.closeAddUserModal();
      } catch (error) {
        if (error === 'Agent with this email already exists.') {
          this.$message.error(error);
        } else {
          this.$message.error('Please fill out all required fields.');
        }
      }
    },
    async handleEditUser() {
      try {
        await this.$refs.formRef.validate();

        const updatedAgent = {
          id: this.selectedAgent.id,
          agency: {
            name: this.selectedAgent.agency_name,
            region: this.selectedAgent.agency_region,
            city: this.selectedAgent.agency_city,
          },
          first_name: this.selectedAgent.first_name,
          last_name: this.selectedAgent.last_name,
          email: this.selectedAgent.email,
          phone_number: this.selectedAgent.phone_number,
          status: this.selectedAgent.status,
        };

        const isDataUnchanged = JSON.stringify(this.originalAgent) === JSON.stringify(updatedAgent);

        if (isDataUnchanged) {
          this.$message.info('Record was not changed.');
          return;
        }

        await this.editUser(updatedAgent);
        this.$message.success('Agent updated successfully!');
        this.resetForm();
        this.closeEditUserModal();
      } catch (error) {
        if (error === 'Agent with this email already exists.') {
          this.$message.error(error);
        } else if (error === 'Agent not found.') {
          this.$message.error(error);
        } else {
          this.$message.error('Please fill out all required fields.');
        }
      }
    },
    resetForm() {
      this.newAgent = {
        first_name: '',
        last_name: '',
        agency_name: '',
        agency_city: '',
        agency_region: '',
        email: '',
        phone_number: '',
        status: '',
      };
      this.$refs.formRef.resetFields();
    },
  },
});
</script>

<style scoped>
.modals-btn-group {
  display: flex;
  gap: 20px;
}
</style>
