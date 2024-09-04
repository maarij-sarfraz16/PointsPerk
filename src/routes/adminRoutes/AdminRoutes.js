import NotFoundRoutes from '../notFoundRoutes';
import Apps from '../Applications';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/adminView/dashboard/Dashboard.vue'),
  },

  {
    path: '/admin/settings',
    name: 'Admin Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '@/view/adminView/pages/settings/Settings.vue'),
    children: [
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import(/* webpackChunkName: "Profile" */ '@/view/adminView/pages/settings/overview/Profile.vue'),
      },
      {
        path: 'account',
        name: 'admin-account',
        component: () => import(/* webpackChunkName: "Account" */ '@/view/adminView/pages/settings/overview/Account.vue'),
      },
      {
        path: 'password',
        name: 'admin-password',
        component: () => import(/* webpackChunkName: "Password" */ '@/view/adminView/pages/settings/overview/Password.vue'),
      },
      {
        path: 'notification',
        name: 'admin-notification',
        component: () =>
          import(/* webpackChunkName: "Notification" */ '@/view/adminView/pages/settings/overview/Notification.vue'),
      },
    ],
  },

  {
    path: '/admin/support',
    name: 'Admin Support',
    component: () => import(/* webpackChunkName: "support" */ '@/view/adminView/pages/Support.vue'),
  },

  ...NotFoundRoutes,
  ...Apps,
];

export default routes;
