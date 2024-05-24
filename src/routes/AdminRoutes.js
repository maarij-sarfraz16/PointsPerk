import PageRoutes from "./PageRoutes";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "@/view/dashboard/DemoNine.vue"
      ),
  },

  {
    path: '/redemptionHistory',
    name: 'Redemption History',
    component: () => import(/* webpackChunkName: "redemptionHistory" */ '@/view/pages/RedemptionHistory/redemptionHistory.vue'),
  },
  ...PageRoutes,
];

export default routes;
