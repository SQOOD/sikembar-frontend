<template lang="pug">
.container-fluid.h-100
  .row.align-items-center.h-100.justify-content-center
    a.col-4.text-center(@click="$router.go(-1)")
      h1.font-weight-bold.py-3.mb-4.shadow-img { 404 }
      h2 Silahkan klik disini untuk kembali ke halaman sebelumnya.
      small.d-block ttd,
      small BIMUS MINERAL
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kanit:600&display=swap');

.row{
  background:rgba(255,255,255,0.4);
  font-family: 'Kanit', sans-serif;
}

a{
  cursor: pointer;
}

h1{
  font-size:7rem;
  color:#404404;
  border-radius: 50rem;
  border:3px solid #404404;
  background:rgba(255,255,255,0.7)
}

h2{
   font-size:1.4rem;
}
</style>
