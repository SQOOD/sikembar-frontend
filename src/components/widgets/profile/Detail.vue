<template lang="pug">
div
  .card.shadowbox
    .card-body
      .row.no-gutters
        .col-sm-4
          img.img-thumbnail.rounded-circle(src='@/assets/img/default-profile.png')
        .col-sm-8.align-self-center
          h1.mb-1 {{companyType}}. {{companyName}}
          router-link(to='#').badge-primary.badge {{permission}}
          router-link(to='#').badge-primary.badge {{commodity}}
          p {{address}}, {{province}}
    router-link(to='#').card-footer.text-center
      span Ubah Data Perusahaan
  #mail.card.shadowbox
    .card-body
      h5.mb-0 E-Mail
        br
        small {{email}}
  .card.shadowbox
    .card-body
      h5.mb-0 WIUP
        br
        small {{wiup}}
      h5.mb-0 NPWP
        br
        small {{npwp}}
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
    province: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card{
  margin-bottom:0.7rem;
  border-radius: 0.2rem;
  color:#606060;
}

.card-footer{
  color:#808080;
}

.card-footer:hover{
  text-decoration: none;
  color:#505050;
  background-color:rgba(0,0,0,.125);
  border-radius:0 0 0.2rem 0.2rem;
}

#mail{
  background-color:rgb(240, 180, 17,0.3);
}

img{
  max-width:7rem;
}

.row{
  font-size:0.9rem;
  font-weight:600;
  padding:0;
}

h1{
  font-size:1.3rem;
  font-weight:600;
}

.badge{
  margin:0.2rem;
  font-weight:600;
  padding: .3em .4em;
  font-size: 0.8rem;
}

h5{
  font-weight:600;
}

p{
  margin-left:0.1rem;
  margin-top:0.4rem;
  color:#909090;
}

</style>
