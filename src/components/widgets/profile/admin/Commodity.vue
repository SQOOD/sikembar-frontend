<template lang="pug">
#commodity
  form
    h1.text-center Komoditas utama dalam
      select.custom-select
        option(value='1' selected) 1 Tahun
        option(value='2') 3 Tahun
        option(value='3') 5 Tahun
        option(value='4') 10 Tahun
      | terakhir
  hr.m-2
  .btn-group.btn-group-sm.mb-3(role='group' aria-label='Basic example')
    button.btn.btn-commodity(type='button') Total Aset
    button.btn.btn-commodity(type='button') Total Penjualan
    button.btn.btn-commodity(type='button') Total Aset Eksplorasi
    button.btn.btn-commodity(type='button') Rasio Hutang terhadap Ekuitas
    button.btn.btn-commodity(type='button') Marjin Laba Bersih
  .row
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 90983
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 909321
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 90983
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 90983
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 90983
    .col.mb-3
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 test
          p.mb-0 90983
  router-link(to='#').btn.btn-sm.btn-primary.text-capitalize.w-100 lihat semua komoditas
</template>

<script>
import Card from '@/components/widgets/Card.vue';

export default {
  components: {
    Card,
  },
};
</script>

<style scoped>
  h1{
    font-size:1rem;
    color:#5a5a5a;
    font-weight:600;
  }

  .custom-select{
    width:auto;
    background-color:transparent;
    border:none;
    color:#5a5a5a;
    font-weight:600;
    border-bottom:rgba(240, 180, 17, 0.7) solid 1px;
    border-radius:0;
    margin:0;
    padding: 0 1rem 0 .75rem;
    height: calc(1.5em + 2px)
  }

  .custom-select:focus{
    box-shadow: none;
  }

  #commodity{
    margin-top:2px;
  }

  .btn-commodity{
    font-weight:600;
    font-size:0.743rem;
    color:#5a5a5a;
    border:1px solid rgba(0,0,0,.125);
    background:rgba(240, 180, 17, 0.3);
  }

  .btn-commodity:hover{
    background:rgba(240, 180, 17, 0.7);
  }

  .btn-commodity:focus{
    box-shadow:none;
  }

  .card{
    max-width:12rem;
  }

  h6{
    color:#757575;
    font-size:0.8rem;
  }

  p{
    font-size:2.4rem;
    color:#3D5170;
  }

  /deep/ .card-header{
    display:none;
  }
</style>
