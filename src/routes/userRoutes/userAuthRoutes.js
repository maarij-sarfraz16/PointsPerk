const routes = [
  {
    path: 'login',
    name: 'user/login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/userView/authentication/SignIn.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: 'requestsignup',
    name: 'user/requestsignup',
    component: () => import(/* webpackChunkName: "requestsignup" */ '@/view/userView/authentication/RequestSignup.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: 'register',
    name: 'user/register',
    component: () => import(/* webpackChunkName: "register" */ '@/view/userView/authentication/Signup.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: 'forgotpassword',
    name: 'user/forgotpassword',
    component: () =>
      import(/* webpackChunkName: "forgotpassword" */ '@/view/userView/authentication/ForgotPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: 'resetpassword',
    name: 'user/resetpassword',
    component: () => import(/* webpackChunkName: "resetpassword" */ '@/view/userView/authentication/ResetPassword.vue'),
    meta: { requiresAuth: false },
  },
];

export default routes;
