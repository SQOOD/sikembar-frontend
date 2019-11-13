<template lang="pug">
    nav.nav.navbar.navbar-expand-lg.navbar-dark.py-0.py-md-0.sticky-top(v-if="!$route.meta.hideNav")
        router-link.navbar-brand(to='/') SIKEMBAR
        button.navbar-toggler(type='button' data-toggle='collapse'
        data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
        aria-expanded='false' aria-label='Toggle navigation')
            span.navbar-toggler-icon.p-2
        #navbarSupportedContent.collapse.navbar-collapse
            ul.navbar-nav.ml-auto
                li.nav-item
                    router-link.nav-link(to='/login') Masuk
</template>

<style scoped>
    nav{
        border-bottom:#c7a87e solid 1px;
        background-color: #2b2017;
        background-image: linear-gradient(315deg, #2b2017 0%, #422419 74%);
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
