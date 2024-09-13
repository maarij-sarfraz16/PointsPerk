<template>
  <div>
    <Main>
      <a-row :gutter="100" justify="center">
        <a-col v-for="item in cardSeven" :key="item.id" :lg="8" :xs="24" :md="8" class="mt-25">
          <LoginCards :item="item" />
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Main } from '../styled';

import LoginCards from '@/components/cards/sampleCard/LoginCards.vue';

const cardSeven = [
  {
    id: 1,
    title: 'Agent Login',
    installed: false,
    content: 'Click Login below if you are an agent!',
    img: 'static/img/users/AgentAvatar.png',
    loginRoute: '/user/login',
    signupRoute: '/user/requestsignup',
    showLogin: true,
    showSignup: true,
  },
  {
    id: 2,
    title: 'Agency Admin Login',
    installed: false,
    content: 'Click Login below if you are an agency admin!',
    img: 'static/img/users/AgencyAdminAvatar.png',
    loginRoute: '/admin/login',
    signupRoute: '/admin/signup',
    showLogin: true,
    showSignup: false,
  },
];
export default defineComponent({
  name: 'WidgetCard',
  components: {
    Main,
    LoginCards,
  },
  setup() {
    return {
      cardSeven,
    };
  },
});
</script>
