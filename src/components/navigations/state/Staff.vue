<template lang="pug">
ul.navbar-nav.ml-auto
  li.nav-item
    router-link.nav-link(:to="{ name: 'admin-profile'}") Dasbor
  li.nav-item
    router-link.nav-link(v-if='role === "ADMIN"' :to="{ name: 'create-user'}") Buat Pengguna Baru
  li.nav-item
    router-link.nav-link(:to="{ name: 'list-users'}") Daftar Pengguna
  li.nav-item
    a.nav-link(href='#' @click.prevent='logout') Keluar
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
    this.role = this.$cookies.get('hermes');
  },
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push('/admin-login');
    },
  },
};
</script>
