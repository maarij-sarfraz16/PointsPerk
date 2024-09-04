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
      <router-link to="/admin/dashboard">
        {{ t('Dashboard') }}
      </router-link>
    </a-menu-item>
    
  </a-menu>
</template>

<script>
import { computed, reactive, ref, toRefs, watch, watchEffect, defineComponent } from 'vue';
import VueTypes from 'vue-types';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import versions from '../../demoData/changelog.json';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Admin Aside',
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
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