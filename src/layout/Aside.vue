<template>
  <a-menu
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick"
  >
    <!-- Dashboard -->
    <a-menu-item @click="toggleCollapsed" key="dashboard">
      <template #icon>
        <unicon name="create-dashboard"></unicon>
      </template>
      <router-link to="/">
        {{ t('Dashboard') }}
      </router-link>
    </a-menu-item>

    <!-- Coupons -->
    <!-- <a-menu-item @click="toggleCollapsed" key="coupons">
      <template #icon>
        <unicon name="ticket"></unicon>
      </template>
      <router-link to="/app/ecommerce/product/grid"> Coupons </router-link>
    </a-menu-item> -->

    <a-menu-item @click="toggleCollapsed" key="ecommerce-product">
      <template #icon>
        <unicon name="ticket"></unicon>
      </template>
      <router-link to="/app/ecommerce/product/grid">
        {{ t('Coupons') }}
      </router-link>
    </a-menu-item>

    <!-- Redemption History -->
    <a-menu-item @click="toggleCollapsed" key="redemptionhistory">
      <template #icon>
        <unicon name="history-alt"></unicon>
      </template>
      <router-link to="/RedemptionHistory"> Redemption History </router-link>
    </a-menu-item>

    <!-- MY Performance -->
    <a-menu-item @click="toggleCollapsed" key="myperformance">
      <template #icon>
        <unicon name="arrow-growth"></unicon>
      </template>
      <router-link to="/MyPerformance"> My Performance </router-link>
    </a-menu-item>

    <!-- Leader Board -->
    <NavTitle class="ninjadash-sidebar-nav-title">{{ t('Company') }}</NavTitle>
    <a-menu-item @click="toggleCollapsed" key="leaderboard">
      <template #icon>
        <unicon name="trophy"></unicon>
      </template>
      <router-link to="/LeaderBoard"> Leader Board </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { computed, reactive, ref, toRefs, watch, watchEffect, defineComponent } from 'vue';
import VueTypes from 'vue-types';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import versions from '../demoData/changelog.json';
// import { NavTitle } from './style';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'AsideItems',
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
  // components: {
  //     NavTitle,
  // },
  setup(props) {
    const { t } = useI18n();
    const store = useStore();
    const darkMode = computed(() => store.state.themeLayout.data);
    const mode = ref('inline');
    const { events } = toRefs(props);
    const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } =
      events.value;

    const router = computed(() => useRoute());
    const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      selectedKeys: ['home'],
      openKeys: ['dashboard'],
      preOpenKeys: ['dashboard'],
    });

    const onOpenChange = (keys) => {
      state.openKeys = keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys;
    };

    const onClick = (item) => {
      if (item.keyPath.length === 1) state.openKeys = [];
    };

    watchEffect(() => {
      if (router.value.matched.length) {
        if (router.value.matched.length > 2) {
          state.selectedKeys = [router.value.matched[2].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else if (router.value.matched.length > 3) {
          state.selectedKeys = [router.value.matched[3].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else {
          state.selectedKeys = [router.value.matched[1].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        }
      }
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      },
    );

    return {
      mode,
      ...toRefs(state),
      darkMode,
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
      versions,
      onOpenChange,
      onClick,
      t,
    };
  },
});
</script>
