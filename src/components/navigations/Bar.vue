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
          router-view(name='menu')
</template>

<style scoped>
  nav{
    border-bottom:#F0B411 solid 1px;
    background-color: #1E375C;
    background-image: linear-gradient(315deg, #005596 0%, #1E375C 74%);
  }

  .nav-item{
    font-size:0.8rem;
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
</style>
