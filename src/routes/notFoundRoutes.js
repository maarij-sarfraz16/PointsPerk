export default [
  {
    path: '/page/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/view/userView/pages/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import(/* webpackChunkName: "404" */ '@/view/userView/pages/404.vue'),
  },
];