<template>
  <a-menu
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick">
    
    <!-- Dashboard -->
    <a-menu-item @click="toggleCollapsed" key="dashboard">
      <template #icon>
        <unicon name="create-dashboard"></unicon>
      </template>
      <router-link to="/">
        {{ t("Dashboard") }}
      </router-link>
    </a-menu-item>
    <!-- coupons -->
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
        {{ t("Coupons") }}
      </router-link>
    </a-menu-item>

    <!-- redemprion history -->
    <a-menu-item @click="toggleCollapsed" key="redemptionHistory">
      <template #icon>
        <unicon name="history-alt"></unicon>
      </template>
      <router-link to="/redemptionHistory"> Redemption History </router-link>
    </a-menu-item>
    <!-- Settings -->
    <a-sub-menu key="settings">
      <template #icon>
        <unicon name="setting"></unicon>
      </template>
      <template #title>Settings</template>

      <a-menu-item @click="toggleCollapsed" key="set-profile">
        <router-link to="/page/profile-settings/profile"> Profile </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-account">
        <router-link to="/page/profile-settings/account"> Account </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-password">
        <router-link to="/page/profile-settings/password">
          Password
        </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-social">
        <router-link to="/page/profile-settings/social"> Social </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-notification">
        <router-link to="/page/profile-settings/notification">
          Notification
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
import VueTypes from "vue-types";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import versions from "../demoData/changelog.json";
// import { NavTitle } from './style';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "AsideItems",
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
    const mode = ref("inline");
    const { events } = toRefs(props);
    const {
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
    } = events.value;

    const router = computed(() => useRoute());
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      selectedKeys: ["home"],
      openKeys: ["dashboard"],
      preOpenKeys: ["dashboard"],
    });

    const onOpenChange = (keys) => {
      state.openKeys =
        keys[keys.length - 1] !== "recharts"
          ? [keys.length && keys[keys.length - 1]]
          : keys;
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
      }
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
