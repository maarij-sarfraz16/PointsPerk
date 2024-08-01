<template>
  <DrawerStyle>
    <div v-if="type == 'basic'">
      <sdButton type="primary" :raised="true" @click="showDrawer">
        <unicon :name="IconName" class="Basic-Drawer-Button"></unicon>
        {{ btnText }}
      </sdButton>

      <a-drawer
        :title="title"
        :placement="placement"
        :closable="true"
        v-model:visible="visible"
        :width="width"
        @afterVisibleChange="afterVisibleChange"
      >
        <slot></slot>
      </a-drawer>
    </div>

    <div class="ninjadash-drawer-placement" v-if="type == 'custom'">
      <a-radio-group v-model:value="customPlacement">
        <a-radio value="top">top</a-radio>
        <a-radio value="right">right</a-radio>
        <a-radio value="bottom">bottom</a-radio>
        <a-radio value="left">left</a-radio>
      </a-radio-group>
      <sdButton type="primary" :raised="true" @click="showDrawer">
        {{ btnText }}
      </sdButton>
      <a-drawer
        :title="title"
        :placement="customPlacement"
        :closable="false"
        v-model:visible="visible"
        @close="onClose"
      >
        <slot></slot>
      </a-drawer>
    </div>

    <div
      v-if="type == 'render'"
      :style="{
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        padding: '48px',
        textAlign: 'center',
        width: '100%',
      }"
    >
      Render in this
      <div style="margin-top: 16px">
        <sdButton type="primary" :raised="true" @click="showDrawer">
          Open
        </sdButton>
      </div>
      <a-drawer
        :title="title"
        placement="right"
        :closable="false"
        v-model:visible="visible"
        :get-container="false"
        :style="{ position: 'absolute' }"
        @close="onClose"
      >
        <slot></slot>
      </a-drawer>
    </div>

    <div v-if="type == 'submit'">
      <sdButton
        :size="btnSize"
        :type="btnType"
        :shape="btnShape"
        :raised="true"
        :transparented="isTransparent"
        :ghost="isGhost"
        :outlined="isOutlined"
        @click="showDrawer"
      >
        <span> {{ btnText }}</span>
        <unicon :name="IconName" class="Basic-Drawer-Button"></unicon>
      </sdButton>
      <a-drawer
        :title="title"
        :width="720"
        v-model:visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
        class="drawer-default"
      >
        <slot></slot>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <sdButton type="primary" @click="onClose">{{
            BottomBtnText
          }}</sdButton>
        </div>
      </a-drawer>
    </div>
  </DrawerStyle>
</template>

<script>
import VueTypes from "vue-types";
import { useStore } from "vuex";
import { computed, ref, onMounted, defineComponent } from "vue";
import sdButton from "../buttons/Buttons.vue";
import { DrawerStyle } from "./style";

export default defineComponent({
  name: "Drawer",
  components: {
    sdButton,
    DrawerStyle,
  },
  props: {
    type: VueTypes.oneOf(["basic", "custom", "render", "submit"]).def("basic"),
    title: VueTypes.string,
    placement: VueTypes.string.def("right"),
    btnText: VueTypes.string.def("Open"),
    btnType: VueTypes.string.def("primary"),
    btnShape: VueTypes.string.def(""),
    btnMode: VueTypes.string.def(""),
    btnSize: VueTypes.string.def("default"),
    width: VueTypes.number.def(320),
    IconName: VueTypes.string.def(""),
    BottomBtnText: VueTypes.string.def("Submit"),
  },
  setup(props) {
    const { state } = useStore();
    const visible = ref(false);
    const customPlacement = ref("left");
    const rtl = computed(() => state.themeLayout.rtlData);

    const isTransparent = computed(() => props.btnMode === "transparent");
    const isGhost = computed(() => props.btnMode === "ghost");
    const isOutlined = computed(() => props.btnMode === "outlined");

    const afterVisibleChange = (bool) => {
      console.log("visible", bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    onMounted(() => {
      visible.value = false;
    });

    return {
      visible,
      customPlacement,
      afterVisibleChange,
      showDrawer,
      onClose,
      rtl,
      isTransparent,
      isGhost,
      isOutlined,
    };
  },
});
</script>
