import NotFoundRoutes from '../notFoundRoutes';

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/LandingPage/LandingPage.vue'),
  },

  ...NotFoundRoutes,
];

export default routes;
