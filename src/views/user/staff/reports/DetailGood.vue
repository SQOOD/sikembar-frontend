<template lang="pug">
<!-- eslint-disable camelcase-->
#report.container.mt-4
  section(v-if='reportGood')
    section.d-flex.flex-row.pb-2.mb-2
      .card
        .card-body
          h1
            | Detail laporan
            span.badge.badge-secondary.ml-2 {{ reportGood.id }}
            span.badge.badge-secondary.ml-2 {{ reportGood.year }}
            span.badge.badge-secondary.ml-2 {{ reportGood.report_type }}
      .ml-auto
        vac(
            @finish='approve'
            :end-time="new Date().getTime() + 8000"
            :auto-start="false"
            ref="vac"
            )
            template(v-slot:before)
              .card
                .card-body
                  button.btn.btn-sm.btn-info(
                    type='button'
                    @click='submitApproval'
                    ) Setujui Laporan
                  button.btn.btn-sm.btn-danger.ml-3(
                    type='button'
                    @click='showComment()'
                    ) Tolak Laporan
            template(v-slot:process='{ timeObj, state }')
              .card
                .card-body
                  small Diproses dalam {{ timeObj.ceil.s }} detik.
                  button.btn.btn-sm.ml-3.btn-warning(v-if='state === "process"'
                    @click='holdApproval'
                    ) Tahan
                  button.btn.btn-sm.ml-3.btn-success(v-else
                    @click='submitApproval'
                    ) Lanjutkan
                  button.btn.btn-sm.btn-danger.ml-3(
                    type='button'
                    @click='showComment()'
                    ) Tolak Laporan
            template(v-slot:finish)
              .card.text-white.bg-success
                .card-body
                  | Laporan telah disetujui.
    .card.mb-2(v-if='commentShow')
      .card-body
        label.col-form-label-sm.font-weight-bold(for='comment') Alasan Penolakan
        textarea#akunPengguna.form-control.form-control-sm(
          aria-describedby='comment' placeholder='Masukan komentar yang ingin diberikan'
          v-model.trim.lazy="$v.comment.$model"
          :class="{ 'is-invalid': $v.comment.$error }" )
        p.error(v-if="!$v.comment.minLength")
          | Minimum {{$v.comment.$params.minLength.min}} karakter.
        button.btn.btn-sm.btn-danger.ml-auto.mt-2(
                    type='button'
                    @click='reject'
                    :disabled="reportStatus === 'Laporan Ditolak'"
                    ) {{ reportStatus }}
    h2 Belanja Barang
    vue-tabs
      v-tab(title='A')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "A")').mb-3
      v-tab(title='B')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "B")').mb-3
      v-tab(title='C')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "C")').mb-3
      v-tab(title='D')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "D")').mb-3
      v-tab(title='E')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "E")').mb-3
      v-tab(title='F')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "F")').mb-3
      v-tab(title='G')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "G")').mb-3
      v-tab(title='H')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "H")').mb-3
      v-tab(title='I')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "I")').mb-3
      v-tab(title='J')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "J")').mb-3
      v-tab(title='K')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "K")').mb-3
      v-tab(title='L')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "L")').mb-3
      v-tab(title='M')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "M")').mb-3
      v-tab(title='N')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "N")').mb-3
      v-tab(title='O')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "O")').mb-3
      v-tab(title='P')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "P")').mb-3
      v-tab(title='Q')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "Q")').mb-3
      v-tab(title='R')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "R")').mb-3
      v-tab(title='S')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "S")').mb-3
      v-tab(title='T')
        vue-good-table(:columns='procurement'
        :rows='reportGood.procurement.filter(x => x.category === "T")').mb-3
  span(v-else) Loading ...
</template>

<script>
import gql from 'graphql-tag';
import commaNumber from 'comma-number';
import { required, minLength } from 'vuelidate/lib/validators';


export default {
  apollo: {
    reportGood: {
      query: gql` query reportGood($id: String!){
        reportGood( where:{id: $id} ){
          id
          year
          createdAt
          rate
          report_type
          procurement{
            category
            detail
            country_of_origin
            province_of_origin
            spec
            volume_value
            unit_price
            unit_price_type
            project_area
            district_of_origin
            current_district
            vendor_type
            tkdn
            tkdn_type
          }
        }
      }`,
    },
  },
  validations: {
    comment: {
      required,
      minLength: minLength(10),
    },
  },
  data() {
    return {
      comment: '',
      commentShow: false,
      reportStatus: 'Kirim Penolakan',
      rate: 'USD',
      procurement: [
        {
          label: 'Jenis Barang',
          field: 'detail',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Lokasi Pembelian',
          field: this.locationProcurement,
          html: true,
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Harga Satuan',
          field: 'unit_price',
          tdClass: 'text-center font-weight-bold',
          formatFn: this.formatFn,
        },
        {
          label: 'Kuantitas',
          field: 'volume_value',
          tdClass: 'text-center font-weight-bold',
          formatFn: this.formatFn,
        },
        {
          label: 'Total Harga',
          field: this.TotalHarga,
          tdClass: 'text-center font-weight-bold',
          formatFn: this.formatFn,
        },
        {
          label: 'Tipe Pengadaan',
          field: 'unit_price_type',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'TKDN',
          field: this.TKDN,
          html: true,
          tdClass: 'text-center font-weight-bold',
        },
      ],
    };
  },
  created() {
    this.$apollo.queries.reportGood.setVariables({
      id: this.$route.params.reportID,
    });
  },
  methods: {
    showComment() {
      this.commentShow = !this.commentShow;
    },
    formatFn(x) {
      return `${this.rate} ${commaNumber(x, '.', ',')}`;
    },
    assumptionQuantity(x) {
      return `${x.volume_value} ${x.volume_unit}`;
    },
    assumptionValue(x) {
      return `${x.price} ${x.currency}`;
    },
    locationProcurement(x) {
      if (x.country_of_origin !== null) {
        return `${x.country_of_origin} <span class='badge badge-danger'>Impor</span>`;
      }
      if (x.province_of_origin !== null || x.district_of_origin !== null) {
        return `${x.province_of_origin} <span class='badge badge-info'>Nasional</span>`;
      }
      if (x.district_of_origin !== null) {
        return `${x.district_of_origin} <span class='badge badge-info'>Nasional</span>`;
      }
      return `${x.current_district} <span class='badge badge-success'>Lokal</span>`;
    },
    TotalHarga(x) {
      return x.unit_price * x.volume_value;
    },
    TKDN(x) {
      let y = '';
      if (x.tkdn_type === 'SA') {
        y = `<span class='badge badge-warning'>${x.tkdn_type}</span>`;
      } else {
        y = `<span class='badge badge-success'>${x.tkdn_type}</span>`;
      }
      return `${x.tkdn}% ${y}`;
    },
    approve() {
      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportGood($id: String!){
          updateOneReportGood(where:{id: $id}, data:{approved: true}){
            approved
          },
        }`,
        variables: {
          id: this.$route.params.reportID,
        },
      });
      setTimeout(
        () => { this.$router.push({ name: 'admin-profile' }); }, 3000,
      );
    },
    submitApproval() {
      this.$refs.vac.startCountdown();
    },
    holdApproval() {
      this.$refs.vac.pauseCountdown();
    },
    reject() {
      this.$refs.vac.stopCountdown();
      this.reportStatus = 'Laporan Ditolak';
      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportGood($id: String!, $comment: String){
          updateOneReportGood(where:{id: $id}, data:{flag_for_deletion: true, comment: $comment}){
            flag_for_deletion
          },
        }`,
        variables: {
          id: this.$route.params.reportID,
          comment: this.comment,
        },
      });
      setTimeout(
        () => { this.$router.push({ name: 'admin-profile' }); }, 3000,
      );

      // this.$apollo.mutate({
      //   mutation: gql`mutation updateOneReportGood($id: ID!){
      //     deleteOneReportFinance(where:{id: $id}),
      //   }`,
      //   variables: {
      //     id: this.$route.params.reportID,
      //   },
      // });
      // this.$router.push({ name: 'admin-profile' });
    },
  },
};
</script>

<style scoped>
  .card-body{
    padding: 0.3rem 1.25rem;
  }

  section{
    border-bottom: 2px solid #525252;
  }

  h1{
    color:#808080;
    font-size:1.3rem;
    font-weight:600;
  }

  h2{
    color:#525252;
    font-size:1.1rem;
    font-weight:600;
  }
  h3{
    color:#535353;
    font-size:0.9rem;
    font-weight:600;
  }

  /deep/ .vgt-table th{
    font-size:0.8rem;
    font-weight:600;
  }

  /deep/ .vgt-table td, a{
    font-size:0.8rem;
  }

  /deep/ .vgt-table td svg{
    margin-right: 0.3rem;
  }

  .error{
    color:#dc3545;
    font-size:0.7rem;
    line-height:1.1;
    margin-top:0.3rem;
  }
</style>
