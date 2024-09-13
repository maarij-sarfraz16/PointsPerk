<template>
  <Div :darkMode="darkMode">
    <Layout class="layout">
      <Header
        :style="{
          position: 'fixed',
          width: '100%',
          top: 0,
          [!rtl ? 'left' : 'right']: 0,
        }"
      >
        <div class="ninjadash-header-content d-flex">
          <div class="ninjadash-header-content__left">
            <div class="navbar-brand align-cener-v">
              <router-link :class="topMenu && innerWidth > 991 ? 'ninjadash-logo top-menu' : 'ninjadash-logo'" to="/">
                <img
                  :src="
                    !darkMode ? require(`../../static/img/Logo_Dark.svg`) : require(`../../static/img/Logo_White.svg`)
                  "
                  alt="logo"
                />
              </router-link>
            </div>
          </div>
          <div class="ninjadash-header-content__right d-flex">
            <div class="ninjadash-navbar-menu d-flex align-center-v">
              <TopMenu v-if="topMenu && innerWidth > 991" />
            </div>

            <div class="ninjadash-nav-actions">
              <TopMenuSearch v-if="topMenu && innerWidth > 991">
                <div class="top-right-wrap d-flex">
                  <AuthInfo />
                </div>
              </TopMenuSearch>
              <AuthInfo v-else />
            </div>
          </div>
        </div>
      </Header>
      <div class="header-more">
        <a-row>
          <a-col :md="0" :sm="24" :xs="24">
            <div class="small-screen-headerRight">
              <SmallScreenAuthInfo :hide="hide" :darkMode="darkMode">
                <AuthInfo :rtl="rtl" />
              </SmallScreenAuthInfo>
            </div>
          </a-col>
        </a-row>
      </div>
      <Layout>
        <template v-if="!topMenu || innerWidth <= 991">
          <Sider
            :width="280"
            :style="{
              margin: '72px 0 0 0',
              padding: `${!rtl ? '20px 20px 55px 0px' : '20px 0px 55px 20px'}`,
              overflowY: 'auto',
              height: '100vh',
              position: 'fixed',
              [!rtl ? 'left' : 'right']: 0,
              zIndex: 998,
            }"
            :collapsed="true"
            :theme="!darkMode ? 'light' : 'dark'"
          >
            <perfect-scrollbar
              :options="{
                wheelSpeed: 1,
                swipeEasing: true,
                suppressScrollX: true,
              }"
            >
              <AsideItems
                :toggleCollapsed="toggleCollapsedMobile"
                :topMenu="topMenu"
                :rtl="rtl"
                :darkMode="darkMode"
                :events="onEventChange"
              />
            </perfect-scrollbar>
          </Sider>
        </template>
        <Layout class="ninjadash-main-layout">
          <Content>
            <Suspense>
              <template #default>
                <router-view></router-view>
              </template>
              <template #fallback>
                <div class="spin">
                  <a-spin />
                </div>
              </template>
            </Suspense>

            <Footer
              class="admin-footer"
              :style="{
                padding: '20px 30px 18px',
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '14px',
                background: 'rgba(255, 255, 255, .90)',
                width: '100%',
                margin: '0px',
                boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
              }"
            >
              <a-row>
                <a-col :md="12" :xs="24">
                  <span class="admin-footer__copyright">{{ currentYear }} © <a href="#" style="">Points Perk</a></span>
                </a-col>
              </a-row>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Div>
</template>
<script>
import { Layout } from 'ant-design-vue';
import { Div, TopMenuSearch } from '../style';
import AuthInfo from '@/components/utilities/LandingPageutilities/auth-info/info.vue';

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import { computed, ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const { Header, Footer, Content, Sider } = Layout;

export default defineComponent({
  name: 'WithAdminLayout',
  components: {
    Div,
    Header,
    Layout,
    Footer,
    Sider,
    Content,
    TopMenuSearch,
    AuthInfo,
  },
  setup() {
    const hide = ref(true);
    const customizerAction = ref(false);
    const currentYear = ref(new Date().getFullYear());
    const route = useRoute();
    const isHomeRoute = computed(() => route.path === '/user/dashboard');

    // const store = useStore();
    const { dispatch, state } = useStore();

    const rtl = computed(() => state.themeLayout.rtlData);
    const darkMode = computed(() => state.themeLayout.data);
    const topMenu = computed(() => state.themeLayout.topMenu);

    const onRtlChange = () => {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
      dispatch('changeRtlMode', true);
    };

    const onLtrChange = () => {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
      dispatch('changeRtlMode', false);
    };

    const modeChangeDark = () => {
      dispatch('changeLayoutMode', true);
    };

    const modeChangeLight = () => {
      dispatch('changeLayoutMode', false);
    };

    const modeChangeTopNav = () => {
      dispatch('changeMenuMode', true);
    };

    const modeChangeSideNav = () => {
      dispatch('changeMenuMode', false);
    };

    const onEventChange = {
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
    };

    return {
      hide,
      customizerAction,
      innerWidth: window.innerWidth,
      rtl,
      darkMode,
      topMenu,
      onEventChange,
      currentYear,

      isHomeRoute,
    };
  },
});
</script>

<style>
.ps {
  height: calc(100vh - 100px);
}
.ant-layout-sider-collapsed .ps {
  height: calc(100vh - 70px);
}
</style>
