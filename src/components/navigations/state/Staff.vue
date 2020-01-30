<template lang="pug">
ul.navbar-nav.ml-auto
  li.nav-item
    router-link.nav-link(v-if='role === "ADMIN"' :to="{ name: 'create-user'}") Buat Pengguna
  li.nav-item
    router-link.nav-link(:to="{ name: 'list-users'}") Daftar Pengguna
  li.nav-item
    router-link.nav-link(:to="{ name: 'admin-profile'}") Profil
  li.nav-item
    a.btn.btn-secondary.nav-link(href='#' @click.prevent='logout') Keluar
</template>

<script>
import { onLogout } from '../../../vue-apollo';

export default {
  data() {
    return {
      role: '',
    };
  },
  mounted() {
    this.role = localStorage.getItem('apollo-rule');
  },
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push('/admin-login');
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>
