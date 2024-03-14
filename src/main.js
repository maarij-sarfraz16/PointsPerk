import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRouter, createWebHistory } from "vue-router"; // Import createRouter and createWebHistory

import HomePage from "./components/Pages/HomePage.vue";
import LoginPage from "./components/Pages/LoginPage.vue";
import RedemptionHistory from "@/components/Pages/RedemptionHistory.vue";
import ProfileSettings from  "@/components/Pages/ProfileSettings.vue"



loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    {path:  '/history', component: RedemptionHistory},
    {path: '/settings', component: ProfileSettings},
  ],
});

createApp(App).use(vuetify).use(router).mount("#app");