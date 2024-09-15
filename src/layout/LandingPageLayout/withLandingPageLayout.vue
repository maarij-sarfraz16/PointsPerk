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

      <Layout class="ninjadash-main-layout landing-page-layout">
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
        </Content>
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

const { Header, Content } = Layout;

export default defineComponent({
  name: 'WithAdminLayout',
  components: {
    Div,
    Header,
    Layout,
    Content,
    TopMenuSearch,
    AuthInfo,
  },
  setup() {
    const hide = ref(true);
    const customizerAction = ref(false);

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
    };
  },
});
</script>

<style>
.landing-page-layout {
  margin: 0 !important;
  overflow: hidden !important;
}
</style>