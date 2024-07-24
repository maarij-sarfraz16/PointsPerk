const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/authentication/SignIn.vue'),
  },
  {
    path: 'requestsignup',
    name: 'requestsignup',
    component: () => import(/* webpackChunkName: "requestsignup" */ '@/view/authentication/RequestSignup.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/view/authentication/Signup.vue'),
  },
  {
    path: 'forgotpassword',
    name: 'forgotpassword',
    component: () => import(/* webpackChunkName: "forgotpassword" */ '@/view/authentication/ForgotPassword.vue'),
  },
  {
    path: 'resetpassword',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "resetpassword" */ '@/view/authentication/ResetPassword.vue'),
  },
];

export default routes;