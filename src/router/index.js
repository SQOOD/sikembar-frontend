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
      auth: false,
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
      auth: false,
    },
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: () => import('@/views/auth/AdminLogin.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-admin',
      auth: false,
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      hideNav: true, /* Hide Navigation */
      bodyClass: 'background-404',
      auth: false,
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
    path: '/admin/:userName/',
    name: 'admin',
    alias: '/admin',
    redirect: '/admin/:userName/profile',
    components: {
      default: () => import('@/views/pages/Profile.vue'),
      menu: () => import('@/components/navigations/state/Staff.vue'),
    },
    props: true,
    meta: {
      breadcrumb:
        { label: 'Profil' },
    },
    children: [
      {
        path: 'profile',
        name: 'admin-profile',
        components: {
          default: () => import('@/views/user/staff/Profile.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Profil' },
        },
      },
      {
        path: 'create-user',
        name: 'create-user',
        components: {
          default: () => import('@/views/user/staff/CreateUser.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Buat Pengguna' },
        },
      },
      {
        path: 'list-users',
        name: 'list-users',
        components: {
          default: () => import('@/views/user/staff/lists/User.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Daftar Pengguna' },
        },
      },
      {
        path: 'view-user/miner/:userName',
        name: 'view-miner',
        components: {
          default: () => import('@/views/user/miner/Profile.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Daftar Pengguna' },
        },
      },
      {
        path: 'view-user/vendor/:userName',
        name: 'view-vendor',
        components: {
          default: () => import('@/views/user/vendor/Profile.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Daftar Pengguna' },
        },
      },
      {
        path: 'view-user/staff/:userName',
        name: 'view-staff',
        components: {
          default: () => import('@/views/user/staff/Profile.vue'),
        },
        props: true,
        meta: {
          breadcrumb:
            { label: 'Daftar Pengguna' },
        },
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/user/miner/Profile.vue'),
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth === false || window.$cookies.isKey('apollo') != null) {
    next();
  } else {
    router.push('/login');
  }
});

export default router;
