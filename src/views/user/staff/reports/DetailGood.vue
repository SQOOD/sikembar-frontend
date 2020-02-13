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
                    @click='reject'
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
                    @click='reject'
                    ) Tolak Laporan
            template(v-slot:finish)
              .card.text-white.bg-success
                .card-body
                  | Laporan telah disetujui.
    h2 Belanja Barang
    vue-good-table(:columns='procurement' :rows='reportGood.procurement').mb-3
  span(v-else) Loading ...
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    reportGood: {
      query: gql` query reportGood($id: String!){
        reportGood( where:{id: $id} ){
          id
          year
          createdAt
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
  data() {
    return {
      procurement: [
        {
          label: 'Kategori',
          field: 'category',
          tdClass: 'text-center font-weight-bold',
        },
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
        },
        {
          label: 'Kuantitas',
          field: 'volume_value',
          tdClass: 'text-center font-weight-bold',
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
      this.$router.push({ name: 'admin-profile' });
    },
    submitApproval() {
      this.$refs.vac.startCountdown();
    },
    holdApproval() {
      this.$refs.vac.pauseCountdown();
    },
    reject() {
      this.$refs.vac.stopCountdown();

      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportGood($id: ID!){
          deleteOneReportFinance(where:{id: $id}),
        }`,
        variables: {
          id: this.$route.params.reportID,
        },
      });
      this.$router.push({ name: 'admin-profile' });
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
</style>
