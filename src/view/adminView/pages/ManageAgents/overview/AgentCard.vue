<template>
  <div v-if="showAlert" class="alert-container">
    <sdAlerts
      :outlined="false"
      :closable="true"
      :showIcon="true"
      :message="alertMessage"
      type="success"
      @close="showAlert = false"
    />
  </div>
  <a-col
    v-for="{
      first_name,
      last_name,
      id,
      img,
      agency,
      email,
      phone_number,
      status,
      total_revenue,
      redemption_points,
      coupons_redeemed,
    } in paginatedData"
    :key="id"
    :xxl="6"
    :xl="8"
    :sm="12"
    :xs="24"
  >
    <router-link :to="{ name: 'agent-details', params: { id: id } }">
      <sdUserCard>
        <div class="card user-card">
          <sdCards headless>
            <figure>
              <img :src="require(`@/${img}`)" alt="" />
            </figure>
            <figcaption>
              <div class="card__content">
                <sdHeading class="card__name" as="h6">
                  <a to="#">{{ first_name }} &nbsp; {{ last_name }}</a>
                </sdHeading>
                <p class="card__designation">{{ agency.name }}</p>
              </div>
              <div class="card__actions">
                <sdButton size="default" outlined type="white" @click.stop.prevent="copyToClipboard(email)">
                  <unicon name="envelope" width="14"></unicon>
                  <span>{{ email }}</span>
                </sdButton>
                <sdButton size="default" outlined type="white" @click.stop.prevent="copyToClipboard(phone_number)">
                  <unicon name="user-plus" width="14"></unicon>
                  <span>{{ phone_number }}</span>
                </sdButton>
              </div>
              <span :class="`status-text ${status}`">{{ status }}</span>

              <div class="card__info">
                <a-row :gutter="15">
                  <a-col :xs="8">
                    <div class="info-single">
                      <sdHeading class="info-single__title" as="h2"> {{ total_revenue }} </sdHeading>
                      <p>Total Revenue</p>
                    </div>
                  </a-col>
                  <a-col :xs="8">
                    <div class="info-single">
                      <sdHeading class="info-single__title" as="h2"> {{ redemption_points }}</sdHeading>
                      <p>Redemption Points</p>
                    </div>
                  </a-col>
                  <a-col :xs="8">
                    <div class="info-single">
                      <sdHeading class="info-single__title" as="h2"> {{ coupons_redeemed }} </sdHeading>
                      <p>Coupons Redeemed</p>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </figcaption>
          </sdCards>
        </div>
      </sdUserCard>
    </router-link>
  </a-col>
</template>

<script>
import { ref } from 'vue';
import users from '@/demoData/usersData.json';
import agencyAgents from '@/demoData/agencyAgentsData.json';
import { defineComponent } from 'vue';

const UserCards = defineComponent({
  name: 'UserCards',
  props: {
    paginatedData: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('success');

    const copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showAlertMessage('Text copied successfully!', 'success');
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
          showAlertMessage('Failed to copy text', 'error');
        });
    };

    const showAlertMessage = (message, type = 'error', duration = 2000) => {
      alertMessage.value = message;
      alertType.value = type;
      showAlert.value = true;

      if (duration) {
        setTimeout(() => {
          showAlert.value = false;
        }, duration);
      }
    };

    return {
      users,
      agencyAgents,
      showAlert,
      alertMessage,
      alertType,
      copyToClipboard,
    };
  },
});

export default UserCards;
</script>

<style>
.card-details span {
  margin-right: 30px;
}
.details-icon {
  margin-right: 5px;
}
.status-text {
  margin-top: 15px;
  font-size: 12px;
  padding: 0 12.41px;
  line-height: 1.9;
  font-weight: 500;
  border-radius: 12px;
  text-transform: capitalize;
  display: inline-block;
  background: #ddd;
}

.status-text.active {
  background-color: #eaf9ec;
  color: #01b81a;
}

.status-text.inactive {
  background-color: #fff5eb;
  color: #fa8e21;
}

.card__actions {
  display: flex;
  flex-direction: column;
}
.alert-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 270px;
}
</style>
