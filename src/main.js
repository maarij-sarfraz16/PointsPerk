import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRouter, createWebHistory } from "vue-router"; // Import createRouter and createWebHistory

import HomePage from "./components/Pages/HomePage.vue";
import LoginPage from "./components/Pages/LoginPage.vue";

loadFonts();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
  ],
});

createApp(App).use(vuetify).use(router).mount("#app");
