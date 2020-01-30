<template lang="pug">
  nav.sticky-top.nav.navbar.navbar-expand-lg.navbar-light.shadowbox(v-if="!$route.meta.hideNav")
    .container-fluid
      router-link.navbar-brand(v-show='auth' to='#')
        img.d-inline-block.align-top.mr-3(src='@/assets/img/logo-esdm.gif')
        .d-inline-block.pt-1
          .title.font-weight-bold.text-uppercase Kementerian Energi dan Sumber Daya Mineral
          .subtitle.text-uppercase Republik Indonesia
      router-link.navbar-brand(v-show='auth === null' to='/')
        img.d-inline-block.align-top.mr-3(src='@/assets/img/logo-esdm.gif')
        .d-inline-block.pt-1
          .title.font-weight-bold.text-uppercase Kementerian Energi dan Sumber Daya Mineral
          .subtitle.text-uppercase Republik Indonesia
      button.navbar-toggler(type='button' data-toggle='collapse'
      data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
      aria-expanded='false' aria-label='Toggle navigation')
        span.navbar-toggler-icon.p-2
      #navbarSupportedContent.collapse.navbar-collapse
        router-view(name='menu')
</template>

<script>
export default {
  data() {
    return {
      auth: '',
    };
  },
  mounted() {
    this.auth = window.$cookies.get('apollo');
    this.role = window.$cookies.get('hermes');
  },
};
</script>

<style scoped>
  nav{
    border-top:#fee50e solid 3px;
    background-color: #FFF;
  }

  .navbar-brand{
    font-size:0.8rem
  }

  .navbar-brand img{
    max-width:45px;
  }

  /deep/ .nav-link{
    font-size:0.8rem;
  }

  .navbar-toggler{
    font-size:0.9rem;
    border:0;
  }

  button.navbar-toggler:focus{
    outline:0;
  }
</style>
