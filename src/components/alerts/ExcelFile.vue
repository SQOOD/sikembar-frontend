<template lang="pug">
.alert.alert-warning.fade.show(role='alert')
  h6.alert-heading.font-weight-bold
    a(:href='`https://github.com/SQOOD/sikembar-form/archive/1.0.2.1.zip`')
      | Unduh berkas formulir SIKEMBAR disini.
  img.float-left(src='@/assets/img/excel.svg')
  p Formulir ini diperuntukan khususnya untuk administrasi SIKEMBAR dan hal - hal yang terkait.
    |  Adapun penggunaan terhadap aplikasi lainnya,
    | kami tidak memberikan dukungan dalam bentuk apapun.
  p Saat ini Formulir SIKEMBAR adalah versi {{version}} yang dirilis pada tanggal {{date}}.
  button.close(type="button" data-dismiss="alert" aria-label="Close")
    span(aria-hidden="true") &times;
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      version: '1.0.2.1',
      date: '02-03-2020',
    };
  },
};
</script>

<style scoped>
.alert-heading{
  font-size:0.9rem;
}

p{
  font-size:0.7rem;
  margin-bottom:0.5rem;
}

img{
  width:3rem;
  margin-right:1rem;
}
</style>
