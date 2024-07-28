<template>
  <InfoWraper>
    <Notification />

    <div class="ninjadash-nav-actions__item ninjadash-nav-actions__language">
      <sdDropdown placement="bottomRight" :action="['click']">
        <template v-slot:overlay>
          <NavAuth>
            <a @click.prevent="onFlagChangeHandle('english')" to="#">
              <img src="../../../static/img/flag/english.png" alt="" />
              <span>English</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('germany')" href="#">
              <img src="../../../static/img/flag/germany.png" alt="" />
              <span>Germany</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('spain')" href="#">
              <img src="../../../static/img/flag/spain.png" alt="" />
              <span>Spain</span>
            </a>
            <a @click.prevent="onFlagChangeHandle('turky')" href="#">
              <img src="../../../static/img/flag/turky.png" alt="" />
              <span>Turky</span>
            </a>
          </NavAuth>
        </template>

        <a to="#" class="ninjadash-nav-action-link">
          <img :src="require(`../../../static/img/flag/${flag}.png`)" alt="" />
        </a>
      </sdDropdown>
    </div>

    <a @click="toggleMode" class="ninjadash-nav-action-mode" href="#">
      <unicon :name="darkMode ? 'sun' : 'moon'"></unicon>
    </a>

    <div class="ninjadash-nav-actions__item ninjadash-nav-actions__author">
      <sdPopover placement="bottomRight" action="click">
        <template v-slot:content>
          <UserDropDown>
            <div class="user-dropdown">
              <figure class="user-dropdown__info">
                <img src="../../../static/img/avatar/chat-auth.png" alt="" />
                <figcaption>
                  <sdHeading as="h5">Danial</sdHeading>
                  <p>Support Engineer</p>
                </figcaption>
              </figure>
              <ul class="user-dropdown__links">
                <li>
                  <router-link to="/page/settings">
                    <unicon name="setting"></unicon>
                    Settings
                  </router-link>
                </li>
                <li>
                  <router-link to="#">
                    <unicon name="dollar-sign"></unicon>
                    Billings
                  </router-link>
                </li>
              </ul>
              <a @click="SignOut" class="user-dropdown__bottomAction" href="#">
                <LogoutOutlined /> Sign Out
              </a>
            </div>
          </UserDropDown>
        </template>
        <a to="#" class="ninjadash-nav-action-link">
          <a-avatar src="../../../static/img/avatar/chat-auth.png" />
          <span class="ninjadash-nav-actions__author--name">Danial</span>
          <unicon name="angle-down"></unicon>
        </a>
      </sdPopover>
    </div>
  </InfoWraper>
</template>

<script setup>
import { InfoWraper, NavAuth, UserDropDown } from "./auth-info-style";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";
import Notification from "./Notification.vue";

const store = useStore();
const { push } = useRouter();

const flag = ref("english");

const onFlagChangeHandle = (value) => {
  flag.value = value;
};

const darkMode = computed(() => store.state.themeLayout.data);

const toggleMode = () => {
  store.dispatch("changeLayoutMode", !darkMode.value);
};

const SignOut = (e) => {
  e.preventDefault();
  push("/auth/login");
  store.dispatch("logOut");
  localStorage.removeItem("token");
};
</script>
