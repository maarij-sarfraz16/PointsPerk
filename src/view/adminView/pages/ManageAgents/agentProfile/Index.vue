<template>
  <sdPageHeader title="My Profile" class="ninjadash-page-header-main"> </sdPageHeader>

  <Main>
    <a-row :gutter="25">
      <a-col :xxl="6" :lg="8" :md="10" :xs="24">
        <div v-if="showAlert">
          <sdAlerts
            :outlined="false"
            :closable="true"
            :showIcon="true"
            :message="alertMessage"
            type="success"
            @close="showAlert = false"
          />
        </div>

        <Suspense>
          <template #default>
            <sdUserCard v-if="agentData">
              <div class="card user-card">
                <sdCards headless>
                  <figure>
                    <img :src="require(`@/${agentData.img}`)" alt="" />
                  </figure>
                  <figcaption>
                    <div class="card__content">
                      <sdHeading class="card__name" as="h6">
                        <a to="#">{{ agentData.first_name }} &nbsp; {{ agentData.last_name }}</a>
                      </sdHeading>
                      <p class="card__designation">{{ agentData.agency.name }}</p>
                    </div>
                    <div class="card__actions">
                      <sdButton size="default" outlined type="white" @click="copyToClipboard(agentData.email)">
                        <unicon name="envelope" width="14"></unicon>
                        <span>{{ agentData.email }}</span>
                      </sdButton>
                      <sdButton size="default" outlined type="white" @click="copyToClipboard(agentData.phone_number)">
                        <unicon name="user-plus" width="14"></unicon>
                        <span>{{ agentData.phone_number }}</span>
                      </sdButton>
                    </div>
                    <span :class="`status-text ${agentData.status}`">{{ agentData.status }}</span>

                    <div class="card__info">
                      <a-row :gutter="15">
                        <a-col :xs="8">
                          <div class="info-single">
                            <sdHeading class="info-single__title" as="h2">
                              {{ agentData.total_revenue }}
                            </sdHeading>
                            <p>Total Revenue</p>
                          </div>
                        </a-col>
                        <a-col :xs="8">
                          <div class="info-single">
                            <sdHeading class="info-single__title" as="h2">
                              {{ agentData.redemption_points }}
                            </sdHeading>
                            <p>Redemptions Points</p>
                          </div>
                        </a-col>
                        <a-col :xs="8">
                          <div class="info-single">
                            <sdHeading class="info-single__title" as="h2">
                              {{ agentData.coupons_redeemed }}
                            </sdHeading>
                            <p>Coupons Redeemed</p>
                          </div>
                        </a-col>
                      </a-row>
                    </div>
                  </figcaption>
                </sdCards>
              </div>
            </sdUserCard>
          </template>
          <template #fallback>
            <sdCards headless>
              <a-skeleton avatar active :paragraph="{ rows: 3 }" />
            </sdCards>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <UserBio :agent-data="agentData" />
          </template>
          <template #fallback>
            <sdCards headless>
              <a-skeleton avatar active :paragraph="{ rows: 3 }" />
            </sdCards>
          </template>
        </Suspense>
      </a-col>
      <a-col :xxl="18" :lg="16" :md="14" :xs="24">
        <SettingWrapper>
          <router-view name="child" :agent-data="agentData"></router-view>
        </SettingWrapper>
      </a-col>
    </a-row>
  </Main>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Main } from '@/view/styled';
import { SettingWrapper } from './overview/style';
import agencyAgentsData from '@/demoData/agencyAgentsData.json';
import { ref } from 'vue';

const UserBio = defineAsyncComponent(() => import('./overview/UserBio'));

export default {
  name: 'MyProfile',
  components: { Main, UserBio, SettingWrapper },
  setup() {
    const route = useRoute();
    const agentId = route.params.id;
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('success');

    const agentData = agencyAgentsData.find((agent) => agent.id === parseInt(agentId, 10));

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
      agentData,
      copyToClipboard,
      showAlert,
      alertMessage,
      alertType,
    };
  },
};
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
</style>
