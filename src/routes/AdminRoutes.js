import PageRoutes from './PageRoutes';
import Apps from './Applications';

const routes = [
  {
    path: '',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/dashboard/Dashboard.vue'),
  },
  {
    path: '/RedemptionHistory',
    name: 'Redemption History',
    component: () =>
      import(/* webpackChunkName: "RedemptionHistory" */ '@/view/pages/RedemptionHistory/RedemptionHistory.vue'),
  },

  {
    path: '/LeaderBoard',
    name: 'LeaderBoard',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '@/view/pages/LeaderBoard/LeaderBoard.vue'),
  },

  {
    path: '/MyPerformance',
    name: 'MyPerformance',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '@/view/pages/LeaderBoard/MyPerformance.vue'),
  },

  ...PageRoutes,
  ...Apps,
];

export default routes;
