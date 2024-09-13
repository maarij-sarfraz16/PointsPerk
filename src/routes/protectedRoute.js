import { createWebHistory, createRouter } from 'vue-router';
import LandingPageRoutes from './LandingPageRoutes/LandingPageRoutes';
import userRoutes from './userRoutes/UserRoutes';
import userAuthRoutes from './userRoutes/userAuthRoutes';
import adminRoutes from './adminRoutes/AdminRoutes';
import adminAuthRoutes from './adminRoutes/adminAuthRoutes';
import store from '@/vuex/store';

const routes = [
  {
    name: 'Landing Page',
    path: '/',
    component: () => import(/* webpackChunkName: "landing" */ '@/layout/LandingPageLayout/withLandingPageLayout.vue'),
    children: [...LandingPageRoutes],
    meta: { requiresAuth: false },
  },
  {
    name: 'User Dashboard',
    path: '/user/dashboard',
    component: () => import(/* webpackChunkName: "user" */ '@/layout/userLayout/withUserLayout.vue'),
    children: [...userRoutes],
    meta: { requiresAuth: false },
  },
  {
    name: 'User Auth',
    path: '/user',
    component: () => import(/* webpackChunkName: "user auth" */ '@/layout/withAuthLayout.vue'),
    children: [...userAuthRoutes],
    meta: { requiresAuth: true },
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    component: () => import(/* webpackChunkName: "admin" */ '@/layout/adminLayout/withAdminLayout.vue'),
    children: [...adminRoutes],
    meta: { requiresAuth: false },
  },
  {
    name: 'Admin Auth',
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin auth" */ '@/layout/withAuthLayout.vue'),
    children: [...adminAuthRoutes],
    meta: { auth: true },
  },
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
  const isAuthenticated = store.state.auth.login;

  if (to.meta.requiresAuth && !isAuthenticated) {
    if (to.path.startsWith('/admin')) {
      next({ name: 'admin/login' });
    } else if (to.path.startsWith('/user')) {
      next({ name: 'user/login' });
    } else {
      next({ name: 'login' });
    }
  } else if (isAuthenticated && to.path === '/login') {
    if (store.state.auth.role === 'admin') {
      next({ name: 'Admin Dashboard' });
    } else {
      next({ name: 'User Dashboard' });
    }
  } else {
    next();
  }
  window.scrollTo(0, 0);
});

export default router;
