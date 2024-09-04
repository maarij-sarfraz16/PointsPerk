const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/userView/authentication/SignIn.vue'),
  },
  {
    path: 'requestsignup',
    name: 'requestsignup',
    component: () => import(/* webpackChunkName: "requestsignup" */ '@/view/userView/authentication/RequestSignup.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/view/userView/authentication/Signup.vue'),
  },
  {
    path: 'forgotpassword',
    name: 'forgotpassword',
    component: () => import(/* webpackChunkName: "forgotpassword" */ '@/view/userView/authentication/ForgotPassword.vue'),
  },
  {
    path: 'resetpassword',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "resetpassword" */ '@/view/userView/authentication/ResetPassword.vue'),
  },
];

export default routes;