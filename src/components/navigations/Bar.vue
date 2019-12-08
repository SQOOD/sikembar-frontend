<template lang="pug">
  nav.nav.navbar.navbar-expand-lg.navbar-dark.py-0.py-md-0.shadowbox(v-if="!$route.meta.hideNav")
    .container
      router-link.navbar-brand(to='/') SIKEMBAR
      button.navbar-toggler(type='button' data-toggle='collapse'
      data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
      aria-expanded='false' aria-label='Toggle navigation')
        span.navbar-toggler-icon.p-2
      #navbarSupportedContent.collapse.navbar-collapse
        ul.navbar-nav.ml-auto
          li.nav-item(v-if='session')
            router-link.nav-link(to='#' v-if='session.role == "miner"') Input Belanja Barang
            router-link.nav-link(to='#' v-if='session.role == "vendor"') Input Data Barang
          li.nav-item(v-if='session')
            router-link.nav-link(to='#') {{session.fullname}}
          li.nav-item(v-if='session')
            span.nav-link(v-on:click='logout()') Keluar
          li.nav-item(v-else)
            router-link.nav-link(to='/login') Masuk
</template>

<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';
export default {
  data() {
    return {
      session: {},
    };
  },
  mounted() {
    this.session = this.$session.get('user');
  },
  methods: {
    checkUploadType(file) {
      if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        console.log('ba');
      }
    },
    logout() {
      this.axios.get(address + ":3000/logout").then((response) => {
        alert("Successfully Logged Out");
        basicFunction.deleteAllCookies();
        localStorage.clear();
        this.$session.destroy();
        this.$router.push('/');
      });
    }
  },
};
</script>

<style scoped>
  nav{
    border-bottom:#F0B411 solid 1px;
    background-color: #1E375C;
    background-image: linear-gradient(315deg, #005596 0%, #1E375C 74%);
  }

  .navbar-toggler{
    font-size:0.9rem;
    border:0;
  }

  button.navbar-toggler:focus{
    outline:0;
  }

  .navbar-brand{
    font-size:1rem;
  }

  span.nav-link{
    cursor: pointer;
  }
</style>
