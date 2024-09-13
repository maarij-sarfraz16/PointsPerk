import NotFoundRoutes from '../notFoundRoutes';
import Apps from '../Applications';

const routes = [
  {
    path: '/user/dashboard',
    name: 'User Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/userView/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/user/redemption-history',
    name: 'Redemption History',
    component: () =>
      import(
        /* webpackChunkName: "RedemptionHistory" */ '@/view/userView/pages/RedemptionHistory/RedemptionHistory.vue'
      ),
    meta: { requiresAuth: true },
  },

  {
    path: '/user/leaderboard',
    name: 'LeaderBoard',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '@/view/userView/pages/LeaderBoard/LeaderBoard.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/user/myPerformance',
    name: 'MyPerformance',
    component: () =>
      import(/* webpackChunkName: "LeaderBoard" */ '@/view/userView/pages/LeaderBoard/MyPerformance.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/user/settings',
    name: 'User Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '@/view/userView/pages/settings/Settings.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'user-profile',
        component: () =>
          import(/* webpackChunkName: "Profile" */ '@/view/userView/pages/settings/overview/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account',
        name: 'user-account',
        component: () =>
          import(/* webpackChunkName: "Account" */ '@/view/userView/pages/settings/overview/Account.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'password',
        name: 'user-password',
        component: () =>
          import(/* webpackChunkName: "Password" */ '@/view/userView/pages/settings/overview/Password.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'notification',
        name: 'user-notification',
        component: () =>
          import(/* webpackChunkName: "Notification" */ '@/view/userView/pages/settings/overview/Notification.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/user/support',
    name: 'User Support',
    component: () => import(/* webpackChunkName: "support" */ '@/view/userView/pages/Support.vue'),
    meta: { requiresAuth: true },
  },

  ...NotFoundRoutes,
  ...Apps,
];

export default routes;
