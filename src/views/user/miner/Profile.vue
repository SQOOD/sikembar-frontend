<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail(
          :companyName= 'user.company_name',
          :permission= 'user.company_permission',
          :companyType= 'user.company_type',
          :address= 'user.address',
          :email= 'user.email',
          :npwp= 'user.npwp',
          :userName= 'user.wiup',
          :commodity= 'user.commodity',
        )
      .col-md-7
        ExcelAlert
        vue-dropzone( ref="myVueDropzone" id="dropzone"
        :options="dropzoneOptions" :useCustomSlot='true' @vdropzone-file-added='checkUploadType'
        :duplicateCheck='true' )
          img(src='@/assets/img/excel.svg')
          h5.font-weight-bold Jatuhkan Berkas Formulir SIKEMBAR disini
            br
            small atau klik disini untuk mencari berkas dalam komputer anda.
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import gql from 'graphql-tag';
import cd from 'clean-deep';
import transform from 'json-map-transform';
import xlsxParser from '@/lib/xlsx-parser-json';

import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Charts from '@/components/charts/RandomCharts.vue';
import ExcelAlert from '@/components/alerts/ExcelFile.vue';
import template from '@/lib/json-map/ReportFinance';
import template3 from '@/lib/json-map/ReportGood';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  data() {
    return {
      data: '',
      user: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 1,
        headers: { 'My-Awesome-Header': 'header value' },
        acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12',
      },
    };
  },
  apollo: {
    user: {
      query: gql`query User($username: String!){
        user(where:{username:$username}){
          username
          role
          commodity
          company_type
          company_name
          npwp
          wiup
          email
          address
          company_permission
        }
      }`,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
    },
  },
  components: {
    ProfileDetail,
    vueDropzone: vue2Dropzone,
    Charts,
    ExcelAlert,
  },
  methods: {
    checkUploadType(file) {
      if (
        file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        && file.name.match(/form *be*.*.xlsx?/gi)) {
        xlsxParser
          .onFileSelection(file, { showNullProperties: true, hideEmptyRows: true })
          .then((data) => {
            const A = data.A.map(o => Object.assign(o, { Kategori: 'A' }));
            const B = data.B.map(o => Object.assign(o, { Kategori: 'B' }));
            const C = data.C.map(o => Object.assign(o, { Kategori: 'C' }));
            const D = data.D.map(o => Object.assign(o, { Kategori: 'D' }));
            const E = data.E.map(o => Object.assign(o, { Kategori: 'E' }));
            const F = data.F.map(o => Object.assign(o, { Kategori: 'F' }));
            const G = data.G.map(o => Object.assign(o, { Kategori: 'G' }));
            const H = data.H.map(o => Object.assign(o, { Kategori: 'H' }));
            const I = data.I.map(o => Object.assign(o, { Kategori: 'I' }));
            const J = data.J.map(o => Object.assign(o, { Kategori: 'J' }));
            const K = data.K.map(o => Object.assign(o, { Kategori: 'K' }));
            const L = data.L.map(o => Object.assign(o, { Kategori: 'L' }));
            const M = data.M.map(o => Object.assign(o, { Kategori: 'M' }));
            const N = data.N.map(o => Object.assign(o, { Kategori: 'N' }));
            const O = data.O.map(o => Object.assign(o, { Kategori: 'O' }));
            const P = data.P.map(o => Object.assign(o, { Kategori: 'P' }));
            const Q = data.Q.map(o => Object.assign(o, { Kategori: 'Q' }));
            const R = data.R.map(o => Object.assign(o, { Kategori: 'R' }));
            const S = data.S.map(o => Object.assign(o, { Kategori: 'S' }));
            const T = data.T.map(o => Object.assign(o, { Kategori: 'T' }));
            let varData = A.concat(B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T);
            varData = transform(varData, template3);
            const x = {
              term: data.Konfigurasi[0].Termin.toUpperCase(),
              year: parseInt(data.Konfigurasi[0].Tahun, 10),
              report_type: data.Konfigurasi[0]['Tipe Laporan'].toUpperCase(),
              currency: data.Konfigurasi[0]['Mata Uang'].toUpperCase(),
              rate: parseInt(data.Konfigurasi[0].Kurs, 10),
              procurement:
                {
                  create:
                  [
                    ...varData,
                  ],
                },
            };
            this.$apollo.query({
              query: gql`query{me{username}}`,
            }).then((me) => {
              const y = { file_path: 'none', user: { connect: { username: me.data.me.username } } };
              const z = { ...x, ...y };
              this.$apollo.mutate({
                mutation: gql`
                mutation($data: ReportGoodCreateInput!) {
                  createOneReportGood(
                    data:$data
                  )
                  {currency}
                }
                `,
                variables: {
                  data: z,
                },
              });
            });
          });
      } else if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      && file.name.match(/form *lap*.*.xlsx?/gi)) {
        xlsxParser
          .onFileSelection(file, { showNullProperties: true, hideEmptyRows: true })
          .then((data) => {
            const str = JSON.stringify(data)
              .replace(/Rp/g, '')
              .replace(/,0/g, '0')
              .replace(/"([0-9])"/g, '$1')
              .replace(/" - "/g, '0')
              .replace(/"No\..+?,/g, '')
              .replace(/"(\w+) (\w+)"/g, '"$1$2"')
              .replace(/"(\w+) (\w+) (\w+)"/g, '"$1$2$3"')
              .replace(/"(\w+) (\w+) (\w+) (\w+)"/g, '"$1$2$3$4"');
            const parsedData = JSON.parse(str);
            const x = transform(parsedData, template);
            this.$apollo.query({
              query: gql`query{me{username}}`,
            }).then((me) => {
              const y = { file_path: 'none', user: { connect: { username: me.data.me.username } } };
              const z = cd({ ...x, ...y });
              this.$apollo.mutate({
                mutation: gql`
                mutation($data: ReportFinanceCreateInput!) {
                  createOneReportFinance(
                    data:$data
                  )
                  {currency}
                }
                `,
                variables: {
                  data: z,
                },
              });
            });
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
