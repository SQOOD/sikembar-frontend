<template lang='pug'>
.container-fluid.mt-3
  .row
    profile(
      :companyName= 'info.nama_perusahaan',
      :permission= 'info.perizinan[0].jenis_izin',
      :companyType= 'info.tipe_perusahaan',
      :address= 'info.alamat_perusahaan',
      :email= 'info.email',
      :npwp= 'info.npwp',
      :wiup= 'info.perizinan[0].kode_wiup',
      :commodity= 'info.perizinan[0].komoditas',
    )
</template>

<script>
import Profile from '@/components/widgets/profile/Profile.vue';

export default {
  data() {
    return {
      info: '',
    };
  },
  components: {
    Profile,
  },
  mounted() {
    this.axios.get('/v1/moms?kode_wiup=3364023032014118').then((response) => {
      this.info = response.data.perusahaan;
      console.log(this.info);
    });
  },
};
</script>
