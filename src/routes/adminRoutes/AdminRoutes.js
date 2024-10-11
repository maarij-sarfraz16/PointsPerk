import NotFoundRoutes from '../notFoundRoutes';

const routes = [
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/adminView/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  /////////// Manage Agents
  {
    name: 'ManageAgents',
    path: '',
    component: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
    children: [
      {
        path: '',
        name: 'users-1',
        components: {
          default: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
          child: () => import(/* webpackChunkName: "users-1" */ '@/view/adminView/pages/ManageAgents/Users.vue'),
        },
        children: [
          {
            path: '/admin/agents',
            name: 'user-grid',
            components: {
              default: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
              descendant: () =>
                import(
                  /* webpackChunkName: "user-grid" */ '@/view/adminView/pages/ManageAgents/overview/AgentCard.vue'
                ),
            },
          },
        ],
      },

      {
        path: '',
        name: 'add-user',
        components: {
          default: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
          child: () => import(/* webpackChunkName: "addUser" */ '@/view/adminView/pages/ManageAgents/AddUsers.vue'),
        },
        children: [
          {
            path: '/admin/addagent/details',
            name: 'info',
            components: {
              default: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
              descendant: () =>
                import(/* webpackChunkName: "info" */ '@/view/adminView/pages/ManageAgents/overview/Info.vue'),
            },
          },
          {
            path: '/admin/addagent/work',
            name: 'work',
            components: {
              default: () => import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/Index.vue'),
              descendant: () =>
                import(/* webpackChunkName: "work" */ '@/view/adminView/pages/ManageAgents/overview/work.vue'),
            },
          },
          {
            path: '/admin/addagent/social',
            name: 'social-user',
            components: {
              default: () =>
                import(/* webpackChunkName: "users" */ '@/view/adminView/pages/ManageAgents/agentProfile/Index.vue'),
              descendant: () =>
                import(/* webpackChunkName: "social-user" */ '@/view/adminView/pages/ManageAgents/overview/Social.vue'),
            },
          },
        ],
      },
    ],
  },
  //----- agent details (social app) ----- //
  {
    name: '',
    path: '',
    component: () =>
      import(/* webpackChunkName: "socialProfile" */ '@/view/adminView/pages/ManageAgents/agentProfile/Index.vue'),

    children: [
      {
        path: '/admin/agent-details/:id',
        name: 'agent-details',
        components: {
          default: () =>
            import(
              /* webpackChunkName: "socialProfile" */ '@/view/adminView/pages/ManageAgents/agentProfile/Index.vue'
            ),
          child: () =>
            import(
              /* webpackChunkName: "overview" */ '@/view/adminView/pages/ManageAgents/agentProfile/overview/Overview.vue'
            ),
        },
      },
    ],
  },

  // ---- Settings ---- //
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
