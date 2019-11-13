<template lang="pug">
    .col-sm-6
      .card.shadow-nohover
        .card-body.row
          .col-4.text-center
            img.img-thumbnail(src='@/assets/img/default-profile.png')
          .col-8
            ul.list-group.list-group-flush
              li.list-group-item.name PT. Justin Pertambahan
              li.list-group-item.wiup 8049320843290843208
              li.list-group-item.detail
                router-link(to='#').badge.badge-info Nikel
                router-link(to='#').badge.badge-primary IOP-OPK
              li.list-group-item.detail.address Jl. Bla bla bla blabla
</template>

<style scoped>
.card{
  background-color:#f7f2e5;
  background-image:url('~@/assets/img/logo-esdm.gif');
  background-position:110% 150%;
  background-size:30%;
  background-repeat:no-repeat;
  background-blend-mode:overlay;
}

.list-group-item{
  border:0;
  padding-left:0;
  background:none;
}

.name{
  font-size:1.4rem;
  font-weight:600;
  padding:0rem;
}

.wiup{
  font-size:0.8rem;
  font-weight:600;
  padding-top:0;
}

.detail{
  padding:0rem;
}

.badge:first-child{
  margin-left:0;
}

.badge{
  margin:0.2rem;
  font-size:0.8rem;
}

</style>
