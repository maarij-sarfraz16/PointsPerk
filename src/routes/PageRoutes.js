export default [
  {
    path: '/page/support',
    name: 'support',
    component: () => import(/* webpackChunkName: "support" */ '@/view/pages/Support.vue'),
  },
  {
    path: '/page/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/view/pages/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import(/* webpackChunkName: "404" */ '@/view/pages/404.vue'),
  },
  {
    path: '/page/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "Settings" */ '@/view/pages/settings/Settings.vue'),
    children: [
      {
        path: 'profile',
        name: 'set-profile',
        component: () => import(/* webpackChunkName: "Profile" */ '@/view/pages/settings/overview/Profile.vue'),
      },
      {
        path: 'account',
        name: 'set-account',
        component: () => import(/* webpackChunkName: "Account" */ '@/view/pages/settings/overview/Account.vue'),
      },
      {
        path: 'password',
        name: 'set-password',
        component: () => import(/* webpackChunkName: "Password" */ '@/view/pages/settings/overview/Password.vue'),
      },
      {
        path: 'notification',
        name: 'set-notification',
        component: () =>
          import(/* webpackChunkName: "Notification" */ '@/view/pages/settings/overview/Notification.vue'),
      },
    ],
  },
];
