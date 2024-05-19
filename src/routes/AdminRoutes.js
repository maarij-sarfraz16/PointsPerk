import PageRoutes from "./PageRoutes";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "@/view/dashboard/DemoNine.vue"
      ),
  },
  ...PageRoutes,
];

export default routes;
