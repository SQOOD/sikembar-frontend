<template lang="pug">
ul.navbar-nav.ml-auto
  li.nav-item
    router-link.nav-link(:to="{ name: 'miner-profile'}") Profil Perusahaan
  li.nav-item
    router-link.nav-link(:to="{ name: 'miner-rekap'}") Rekap Perusahaan
  li.nav-item
    a.nav-link(href='#' @click.prevent='logout') Keluar
</template>

<script>
import { onLogout } from '../../../vue-apollo';

export default {
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push('/');
    },
  },
};
</script>
