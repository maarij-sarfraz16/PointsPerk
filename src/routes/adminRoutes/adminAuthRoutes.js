const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/adminView/authentication/SignIn.vue'),
  },
  {
    path: 'signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/view/adminView/authentication/Signup.vue'),
  }
];

export default routes;