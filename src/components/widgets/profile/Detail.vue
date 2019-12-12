<template lang="pug">
div
  .card.shadowbox
    .card-body
      .row.no-gutters
        .col-sm-4
          img.img-thumbnail.rounded-circle(src='@/assets/img/default-profile.png')
        .col-sm-8.align-self-center(v-if='companyType!=""')
          h1.mb-1 {{companyType}}. {{companyName}}
          router-link(to='#').badge-primary.badge {{permission}}
          router-link(to='#').badge-primary.badge {{commodity}}
          p {{address}}, {{province}}
        .col-sm-8.align-self-center(v-else)
          h1.mb-1 {{userName}}
    router-link(to='#').card-footer.text-center
      span Ubah Data
  #mail.detail.card.shadowbox(v-show='email!=""')
    .card-body.pt-2.pb-2
      h6.mb-0 E-Mail
        span {{email}}
  .detail.card.shadowbox(v-show='wiup!=""')
    .card-body.pt-2.pb-2
      ul.pl-0.mb-0
        li
          h6 WIUP
          span {{wiup}}
        li
          h6 NPWP
          span {{npwp}}
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      default: '',
    },
    companyType: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    npwp: {
      type: String,
      default: '',
    },
    wiup: {
      type: String,
      default: '',
    },
    permission: {
      type: String,
      default: '',
    },
    commodity: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    province: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
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
  background-color:rgba(0,0,0,.015);
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

h6{
  font-weight:600;
  font-size:0.9rem;
  color:#7a7a7a;
  display:inline-block;
  min-width: 3rem;
}

span{
  font-size:0.9rem;
}

li {
  list-style-type: none;
}

.detail span::before{
  content:':';
  margin-left:0.6rem;
  margin-right:0.6rem;
}

p{
  margin-left:0.1rem;
  margin-top:0.4rem;
  color:#909090;
}

</style>
