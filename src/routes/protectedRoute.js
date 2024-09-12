import { createWebHistory, createRouter } from 'vue-router';
import userRoutes from './userRoutes/UserRoutes';
import userAuthRoutes from './userRoutes/userAuthRoutes';
//import adminRoutes from './adminRoutes/AdminRoutes';
// import adminAuthRoutes from './adminRoutes/adminAuthRoutes';
import store from '@/vuex/store';

const routes = [
  // {
  //   name: 'Landing Page',
  //   path: '/',
  //   component: () => import(/* webpackChunkName: "landing" */ '@/view/pages/LandingPage.vue'),
  //   meta: { auth: false },
  // },
  {
    name: 'User Dashboard',
    path: '/user/dashboard',
    component: () => import(/* webpackChunkName: "user" */ '@/layout/userLayout/withUserLayout.vue'),
    children: [...userRoutes],
    meta: { auth: false },
  },
  {
    name: 'User Auth',
    path: '/user',
    component: () => import(/* webpackChunkName: "user auth" */ '@/layout/withAuthLayout.vue'),
    children: [...userAuthRoutes],
    meta: { auth: true },
  },
  // {
  //   name: 'Admin Dashboard',
  //   path: '/admin/dashboard',
  //   component: () => import(/* webpackChunkName: "admin" */ '@/layout/adminLayout/withAdminLayout.vue'),
  //   children: [...adminRoutes],
  //   meta: { auth: false },
  // },
  // {
  //   name: 'Admin Auth',
  //   path: '/admin',
  //   component: () => import(/* webpackChunkName: "admin auth" */ '@/layout/withAuthLayout.vue'),
  //   children: [...adminAuthRoutes],
  //   meta: { auth: true },
  // },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_SUB_ROUTE
        ? process.env.VUE_APP_SUB_ROUTE
        : process.env.BASE_URL
      : process.env.BASE_URL,
  ),
  linkExactActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to, store);
  if (to.meta.auth && store.state.auth.login) {
    next({ name: 'dashboard' });
  } else if (!to.meta.auth && !store.state.auth.login) {
    next({ name: 'login' });
  } else {
    next();
  }
  window.scrollTo(0, 0); // reset scroll position to top of page
  next();
});

export default router;