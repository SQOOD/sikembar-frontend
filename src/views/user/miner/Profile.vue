<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail(
          :companyName= 'info.nama_perusahaan',
          :permission= 'info.perizinan[0].jenis_izin',
          :companyType= 'info.tipe_perusahaan',
          :address= 'info.alamat_perusahaan',
          :email= 'info.email',
          :npwp= 'info.npwp',
          :wiup= 'info.perizinan[0].kode_wiup',
          :commodity= 'info.perizinan[0].komoditas',
          :province= 'info.perizinan[0].provinsi'
        )
      .col-md-7
        ExcelAlert
        vue-dropzone( ref="myVueDropzone" id="dropzone"
        :options="dropzoneOptions" :useCustomSlot='true' @vdropzone-file-added='checkUploadType'
        :duplicateCheck='true' )
          img(src='@/assets/img/excel.svg')
          h5.font-weight-bold Jatuhkan Berkas Formulir SIKEMBAR disini
            br
            small atau klik disini untuk mencari berkas dalam alat anda.
        div
          | {{ json }}
        charts
</template>

<script>
// import XLSX from 'xlsx';
import vue2Dropzone from 'vue2-dropzone';
import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Charts from '@/components/charts/RandomCharts.vue';
import ExcelAlert from '@/components/alerts/ExcelFile.vue';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';


export default {
  data() {
    return {
      info: '',
      json: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 1,
        headers: { 'My-Awesome-Header': 'header value' },
        acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12',
      },
    };
  },
  components: {
    ProfileDetail,
    vueDropzone: vue2Dropzone,
    Charts,
    ExcelAlert,
  },
  mounted() {
    this.axios.get(`/v1/moms?kode_wiup=${this.$route.params.wiup}`).then((response) => {
      this.info = response.data.perusahaan;
    });
  },
  methods: {
    checkUploadType(file) {
      if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        console.log('ba');
      }
    },
  },
};
</script>

<style scoped>
img{
  width: 4.5rem;
}

.vue-dropzone{
  border:2px dashed #b7b7b7;
  background-color:rgba(255,255,255,0.6);
  margin-top:3px;
  color:#6d8671;
}
</style>
