<template>
  <InfoWraper>
    <div class="ninjadash-nav-actions__item ninjadash-nav-actions__language">
      <sdDropdown placement="bottomRight" :action="['click']">
        <template v-slot:overlay>
          <NavAuth>
            <a @click.prevent="onFlagChangeHandle('english')" to="#">
              <img src="../../../../static/img/flag/english.png" alt="" />
              <span>English</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('germany')" href="#">
              <img src="../../../../static/img/flag/germany.png" alt="" />
              <span>Germany</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('spain')" href="#">
              <img src="../../../../static/img/flag/spain.png" alt="" />
              <span>Spain</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('turky')" href="#">
              <img src="../../../../static/img/flag/turky.png" alt="" />
              <span>Turky</span>
            </a>
          </NavAuth>
        </template>

        <a to="#" class="ninjadash-nav-action-link">
          <img :src="require(`../../../../static/img/flag/${flag}.png`)" alt="" />
        </a>
      </sdDropdown>
    </div>

    <a @click="toggleMode" class="ninjadash-nav-action-mode" href="#">
      <unicon :name="darkMode ? 'sun' : 'moon'"></unicon>
    </a>
  </InfoWraper>
</template>

<script setup>
import { InfoWraper, NavAuth } from './auth-info-style';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const flag = ref('english');

const onFlagChangeHandle = (value) => {
  flag.value = value;
};

const darkMode = computed(() => store.state.themeLayout.data);

const toggleMode = () => {
  store.dispatch('changeLayoutMode', !darkMode.value);
};
</script>
