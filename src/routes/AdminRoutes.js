import FeaturesRoutes from "./FeaturesRoutes";
import PageRoutes from "./PageRoutes";
import Components from "./Components";
import Apps from "./Applications";


const routes = [
  {
    path: "",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "@/view/dashboard/Dashboard.vue"
      ),
  },
  {
    path: "/crud",
    name: "axios",
    component: () =>
      import(/* webpackChunkName: "axios" */ "@/view/crud/axios/Index.vue"),
    children: [
      {
        path: "axios-view",
        name: "axios-view",
        component: () =>
          import(
            /* webpackChunkName: "axios-view" */ "@/view/crud/axios/View.vue"
          ),
      },
      {
        path: "axios-edit/:id",
        name: "axios-edit",
        component: () =>
          import(
            /* webpackChunkName: "axios-edit" */ "@/view/crud/axios/edit.vue"
          ),
      },
      {
        path: "axios-add",
        name: "axios-add",
        component: () =>
          import(
            /* webpackChunkName: "axios-add" */ "@/view/crud/axios/addNew.vue"
          ),
      },
    ],
  },
  {
    path: "/crud",
    name: "fireStore",
    component: () =>
      import(
        /* webpackChunkName: "fireStore" */ "@/view/crud/fireStore/Index.vue"
      ),
    children: [
      {
        path: "fireStore-view",
        name: "fireStore-view",
        component: () =>
          import(
            /* webpackChunkName: "fireStore-view" */ "@/view/crud/fireStore/View.vue"
          ),
      },
      {
        path: "fireStore-edit/:id",
        name: "fireStore-edit",
        component: () =>
          import(
            /* webpackChunkName: "fireStore-edit" */ "@/view/crud/fireStore/edit.vue"
          ),
      },
      {
        path: "fireStore-add",
        name: "fireStore-add",
        component: () =>
          import(
            /* webpackChunkName: "fireStore-add" */ "@/view/crud/fireStore/addNew.vue"
          ),
      },
    ],
  },

  {
    path: "/RedemptionHistory",
    name: "Redemption History",
    component: () =>
      import(
        /* webpackChunkName: "redemptionHistory" */ "@/view/pages/RedemptionHistory/redemptionHistory.vue"
      ),
  },

  {
    path: "/LeaderBoard",
    name: "LeaderBoard",
    component: () =>
      import(
        /* webpackChunkName: "LeaderBoard" */ "@/view/pages/LeaderBoard/LeaderBoard.vue"
      ),
  },

  {
    path: "/MyPerformance",
    name: "MyPerformance",
    component: () =>
      import(
        /* webpackChunkName: "LeaderBoard" */ "@/view/pages/LeaderBoard/MyPerformance.vue"
      ),
  },

  {
    path: "/hassan",
    name: "hassan",
    component: () =>
      import(
        /* webpackChunkName: "LeaderBoard" */ "@/view/pages/hassan/hassan.vue"
      ),
  },

 

  ...PageRoutes,
  ...FeaturesRoutes,
  ...Components,
  ...Apps,
];

export default routes;
