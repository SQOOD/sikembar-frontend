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
        vue-dropzone( ref="myVueDropzone" id="dropzone"
        :options="dropzoneOptions" :useCustomSlot='true' @vdropzone-file-added='checkUploadType'
        :duplicateCheck='true' )
          img(src='@/assets/img/excel.svg')
          h5.font-weight-bold Jatuhkan Berkas Formulir SIKEMBAR disini
            br
            small atau klik disini untuk mencari berkas dalam alat anda.
        div {{json}}
        div {{json2}}
        charts
</template>

<script>
import readExcel from 'read-excel-file';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Charts from '@/components/charts/RandomCharts.vue';
// import schema from '@/excel/schema/neraca';

export default {
  data() {
    return {
      info: '',
      json: '',
      json2: '',
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
  },
  mounted() {
    this.axios.get(`/v1/moms?kode_wiup=${this.$route.params.wiup}`).then((response) => {
      this.info = response.data.perusahaan;
    });
  },
  methods: {
    checkUploadType(file) {
      if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        readExcel(file, {
          sheet: 2,
          transformData(data) {
            return data.splice(0, 6);
          },
        }).then((data) => {
          this.json = JSON.stringify(data, null, 2);
        });
        readExcel(file, { sheet: 3 }).then((data) => {
          this.json2 = JSON.stringify(data, null, 2);
        });
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
