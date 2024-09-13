import NotFoundRoutes from '../notFoundRoutes';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/adminView/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/admin/settings',
    name: 'Admin Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '@/view/adminView/pages/settings/Settings.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'admin-profile',
        component: () =>
          import(/* webpackChunkName: "Profile" */ '@/view/adminView/pages/settings/overview/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account',
        name: 'admin-account',
        component: () =>
          import(/* webpackChunkName: "Account" */ '@/view/adminView/pages/settings/overview/Account.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'password',
        name: 'admin-password',
        component: () =>
          import(/* webpackChunkName: "Password" */ '@/view/adminView/pages/settings/overview/Password.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'notification',
        name: 'admin-notification',
        component: () =>
          import(/* webpackChunkName: "Notification" */ '@/view/adminView/pages/settings/overview/Notification.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/admin/support',
    name: 'Admin Support',
    component: () => import(/* webpackChunkName: "support" */ '@/view/adminView/pages/Support.vue'),
    meta: { requiresAuth: true },
  },

  ...NotFoundRoutes,
];

export default routes;
