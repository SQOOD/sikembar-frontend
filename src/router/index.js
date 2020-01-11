import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('@/views/Home.vue'),
      menu: () => import('@/components/navigations/state/Login.vue'),
    },
    meta: {
      breadcrumb:
        { label: 'Home' },
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      breadcrumb:
        { label: 'About' },
    },
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('@/views/auth/UserLogin.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-login',
    },
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: () => import('@/views/auth/AdminLogin.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-admin',
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-404',
    },
  },
  {
    path: '/miner/:userName',
    name: 'miner',
    redirect: '/miner/:userName/profile',
    components: {
      menu: () => import('@/components/navigations/state/Miner.vue'),
      default: () => import('@/views/pages/Profile.vue'),
    },
    children: [
      {
        path: 'profile',
        name: 'miner-profile',
        components: {
          default: () => import('@/views/user/miner/Profile.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Profil' },
        },
      },
      {
        path: 'rekap',
        name: 'miner-rekap',
        components: {
          default: () => import('@/views/user/miner/Rekap.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Rekap' },
        },
      },
    ],
  },
  {
    path: '/admin/profile',
    name: 'admin-profile',
    alias: '/admin',
    components: {
      default: () => import('@/views/user/staff/Profile.vue'),
      menu: () => import('@/components/navigations/state/Staff.vue'),
    },
    props: true,
    meta: {
      breadcrumb:
        { label: 'Profil' },
    },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/user/staff/reports/List.vue'),
    props: true,
    meta: {
      breadcrumb: {
        label: 'List',
        parent: 'Profil',
      },
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
