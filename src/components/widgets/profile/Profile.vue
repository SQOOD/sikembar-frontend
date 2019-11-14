<template lang="pug">
    .col-sm-6
      .card.shadow-nohover
        .card-body.row
          .col-4.text-center
            img.img-thumbnail(src='@/assets/img/default-profile.png')
          .col-8
            ul.list-group.list-group-flush
              li.list-group-item.name {{companyType}}. {{companyName}}
              li.list-group-item.wiup
                strong WIUP :
                |  {{wiup}}
              li.list-group-item.detail.email {{email}}
              li.list-group-item.detail.npwp {{npwp}}
              li.list-group-item.detail.address {{address}}
              li.list-group-item.detail
                router-link(to='#').badge.badge-info {{commodity}}
                router-link(to='#').badge.badge-primary {{permission}}
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
    },
    companyType: {
      type: String,
    },
    address: {
      type: String,
    },
    npwp: {
      type: String,
    },
    wiup: {
      type: String,
    },
    permission: {
      type: String,
    },
    commodity: {
      type: String,
    },
    email: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card{
  background-image:url('~@/assets/img/logo-esdm.gif');
  background-position:110% 150%;
  background-size:30%;
  background-repeat:no-repeat;
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
