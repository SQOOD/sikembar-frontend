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
        excel-alert
        file-pond(
          @addfile='uploadXLSX'
          allowMultiple='true'
          dropOnPage='true'
          dropOnElement='false'
          maxFileSize='1MB'
          acceptedFileTypes='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, \
            application/vnd.ms-excel.sheet.macroEnabled.12'
          labelIdle=`<img src='/img/excel.65bddd47.svg'><h5 class="font-weight-bold">Jatuhkan \
          Berkas Formulir SIKEMBAR dihalaman ini<br/><small>atau klik disini untuk mencari \
          berkas dalam komputer anda.</small>`)
        .filewrapper.py-2.px-3.mx-3(v-if='fileStatus' :class='fileStatusClass') {{ fileStatus }}
</template>

<script>
import vueFilePond from 'vue-filepond';
import FilePondPluginValidateSize from 'filepond-plugin-file-validate-size';
import FilePondFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';

import transform from 'json-map-transform';
import gql from 'graphql-tag';
import cd from 'clean-deep';
import xlsxParser from '@/lib/xlsx-parser-json';

import template from '@/lib/json-map/ReportFinance';
import template3 from '@/lib/json-map/ReportGood';

import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Charts from '@/components/charts/RandomCharts.vue';
import ExcelAlert from '@/components/alerts/ExcelFile.vue';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

export default {
  data() {
    return {
      server: {
        process: null,
      },
      data: '',
      user: '',
      fileStatus: '',
      fileStatusClass: '',
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
          username: this.$cookies.get('apollo'),
        };
      },
    },
  },
  components: {
    ProfileDetail,
    Charts,
    ExcelAlert,
    FilePond: vueFilePond(
      FilePondPluginValidateSize,
      FilePondPluginValidateType,
      FilePondFilePoster,
    ),
  },
  methods: {
    uploadXLSX(error, file) {
      if (file.filename.match(/form *be*.*.xlsx?/gi)) {
        this.fileStatus = 'Berkas diproses.';
        this.fileStatusClass = 'processing';
        xlsxParser
          .onFileSelection(file.file, { showNullProperties: true, hideEmptyRows: true })
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
              const y = { user: { connect: { username: me.data.me.username } } };
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
              this.fileStatus = 'Berkas selesai diproses.';
              this.fileStatusClass = 'done';
            });
          });
      } else if (file.filename.match(/form *lap*.*.xlsx?/gi)) {
        this.fileStatus = 'Berkas diproses.';
        this.fileStatusClass = 'processing';
        xlsxParser
          .onFileSelection(file.file, { showNullProperties: true, hideEmptyRows: true })
          .then((data) => {
            this.fileStatus = 'Berkas diproses.';
            this.fileStatusClass = 'processing';
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
              const y = { user: { connect: { username: me.data.me.username } } };
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
              this.fileStatus = 'Berkas selesai diproses.';
              this.fileStatusClass = 'done';
            });
          });
      }
    },
  },
};
</script>

<style scoped>
/deep/ .filepond--root img{
  width: 4.5rem;
}

/deep/ .filepond--root .filepond--drop-label{
  min-height:10rem
}

.filepond--wrapper{
  border:2px dashed #b7b7b7;
  color:#6d8671;
}

.filepond--drop-label{
  min-height: 15rem;
}

.filewrapper{
  border-radius: 0.5rem;
  min-height: 2rem;
  font-size:0.8rem;
  color:#ffffff;
  margin-top:0.7rem;
}

.processing{
  background-color:rgb(184, 184, 43);
}

.done{
  background-color:rgb(23, 105, 23);
  -webkit-transition: opacity 3s ease-in-out;
  -moz-transition: opacity 3s ease-in-out;
  -ms-transition: opacity 3s ease-in-out;
  -o-transition: opacity 3s ease-in-out;
  opacity: 0;
}

.failed{
  background-color:rgb(192, 24, 24);
}
</style>
