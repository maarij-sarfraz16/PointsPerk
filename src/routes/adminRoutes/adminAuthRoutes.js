const routes = [
  {
    path: 'login',
    name: 'admin/login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/adminView/authentication/SignIn.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: 'signup',
    name: 'admin/signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/view/adminView/authentication/Signup.vue'),
    meta: { requiresAuth: false },
  },
];

export default routes;
