<template lang="pug">
  footer.mt-4(v-if="!$route.meta.hideNav")
    .container
      .row.pt-2.pb-2
        .col
          span.font-weight-bold  Hak Cipta &copy; 2020 Kementerian Energi dan Sumber Daya Mineral
          br
          | Kementerian Energi dan Sumber Daya Mineral
          br
          | Jl. Medan Merdeka Selatan No. 18
          br
          | Jakarta Pusat 10110
          br
          | Telp. 021 3804242 Fax. 021 3507210
        .col.text-right
          | SIKEMBAR v.2.1 | BIMUS MINERBA 4.0
</template>

<style scoped>
  footer{
    border-top: #fee50e solid 3px;
    background-color:#000;
    min-height: 3rem;
  }

  .container{
    color:#FFF;
    font-size:.8rem;
  }

  span{
    color:#fee50e;
  }
</style>
