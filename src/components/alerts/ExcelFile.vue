<template lang="pug">
.alert.alert-warning.alert-dismissible.fade.show(role='alert')
  h6.alert-heading.font-weight-bold Unduh berkas formulir SIKEMBAR disini.
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
      version: '29.1',
      date: '31-12-1293',
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
