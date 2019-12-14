import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      breadcrumb:
        { label: 'Home' },
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      breadcrumb:
        { label: 'About' },
    },
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
    path: '/profile/:wiup',
    name: 'miner-profile',
    component: () => import('../views/user/miner/Profile.vue'),
    props: true,
    meta: {
      breadcrumb:
        { label: 'Profil' },
    },
  },
  {
    path: '/admin/',
    name: 'admin-profile',
    component: () => import('../views/user/staff/Profile.vue'),
    props: true,
    meta: {
      breadcrumb:
        { label: 'Profil' },
    },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/user/staff/reports/List.vue'),
    props: true,
    meta: {
      breadcrumb: {
        label: 'List',
        parent: 'Profil',
      },
    },
  },
  {
    path: '/rekap-keuangan/:wiup',
    name: 'miner-rekap-keuangan',
    component: () => import('../views/user/miner/RekapKeuangan.vue'),
    props: true,
    meta: {
      breadcrumb:
        { label: 'Rekap Keuangan' },
    },
  },
  {
    path: '/report-keuangan/:report_id',
    name: 'miner-report-keuangan',
    component: () => import('../views/user/staff/reports/ReportKeuangan.vue'),
    props: true,
    meta: {
      breadcrumb:
        { label: 'Report Keuangan' },
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
