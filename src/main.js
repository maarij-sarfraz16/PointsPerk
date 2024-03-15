import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRouter, createWebHistory } from "vue-router"; // Import createRouter and createWebHistory

import userDashboard from "./components//User/userDashboard.vue";
import adminDashboard from "./components/Admin/adminDashboard.vue";
import userLogin from "./components/User/userLogin.vue";
import userSignup from "./components/User/userSignup.vue";
import adminLogin from "./components/Admin/adminLogin.vue";

import history from "./components/User/RedemptionHistory.vue";
import settings from "./components/User/ProfileSettings.vue";

loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: userDashboard },
    { path: "/admin", component: adminDashboard },

    { path: "/login", component: userLogin },
    { path: "/signup", component: userSignup },
    { path: "/admin-login", component: adminLogin },

    { path: "/history", component: history },
    { path: "/settings", component: settings },
  ],
});

createApp(App).use(vuetify).use(router).mount("#app");