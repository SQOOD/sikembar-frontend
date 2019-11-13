import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('../views/auth/UserLogin.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-login',
    },
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: () => import('../views/auth/AdminLogin.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-admin',
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-404',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
