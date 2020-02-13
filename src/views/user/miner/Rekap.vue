<template lang="pug">
  .container.mt-4
    h1.pb-2 Rekap Perusahaan
    vue-tabs
      v-tab(title='Laporan Keuangan')
        section(v-if='reportFinance' v-for='reportFinance in reportFinances')
          section.d-flex.flex-row.pb-2.mb-2
            h3
              | Laporan Keuangan
              span.badge.badge-secondary.ml-2 {{ reportFinance.id }}
              span.badge.badge-secondary.ml-2 {{ reportFinance.year }}
          vue-tabs
            v-tab(title='Asumsi Keuangan')
              vue-good-table(
                :columns='assumption'
                :rows='reportFinance.assumption'
              ).mb-3
              h3 Pembelian BBM Sebesar
                |  {{ reportFinance.fuel[0].price }} {{ reportFinance.fuel[0].currency }}
            v-tab(title='Neraca Keuangan')
              vue-good-table(
                :columns='balance'
                :rows='reportFinance.balance'
              ).mb-3
            v-tab(title='Anggaran Belanja')
              vue-good-table(
                :columns='budgets'
                :rows='reportFinance.budgets'
              ).mb-3
              vue-good-table(
                :columns='capital_budget'
                :rows='reportFinance.capital_budget'
              ).mb-3
            v-tab(title='Arus Keuangan')
              vue-good-table(
                :columns='cashflow'
                :rows='reportFinance.cashflow'
              ).mb-3
            v-tab(title='Harga Pokok Penjualan')
              vue-good-table(
                :columns='operation_cost'
                :rows='reportFinance.operation_cost'
              ).mb-3
              vue-good-table(
                :columns='royalty'
                :rows='reportFinance.royalty'
              ).mb-3
              vue-good-table(
                :columns='cost_of_good'
                :rows='reportFinance.cost_of_good'
              ).mb-3
            v-tab(title='Investasi')
              vue-good-table(
                :columns='investment'
                :rows='reportFinance.investment'
              ).mb-3
            v-tab(title='Laba Rugi')
              vue-good-table(
                :columns='lost_profit'
                :rows='reportFinance.lost_profit'
              ).mb-3
            v-tab(title='Keuangan Lainnya')
              vue-good-table(
                :columns='other_finance'
                :rows='reportFinance.other_finance'
              ).mb-3
            v-tab(title='Penerimaan Negara')
              vue-good-table(
                :columns='state_revenue'
                :rows='reportFinance.state_revenue'
              ).mb-3
            v-tab(title='Sumber Pembiayaan')
              vue-good-table(
                :columns='source_of_funding'
                :rows='reportFinance.source_of_funding'
              ).mb-3
        span( v-else ) Loading ...
      v-tab(title='Belanja Barang')
        section(v-if='reportGoods' v-for='reportGood in reportGoods')
          section.d-flex.flex-row.pb-2.mb-2
            h3
              | Laporan Belanja Barang
              span.badge.badge-secondary.ml-2 {{ reportGood.id }}
              span.badge.badge-secondary.ml-2 {{ reportGood.year }}
          vue-good-table(
            :columns='procurement'
            :rows='reportGood.procurement'
          ).mb-3
        span( v-else ) Loading ...
</template>

<script>
/* eslint-disable */
import gql from 'graphql-tag';

export default {
  apollo:{
    reportFinances: {
      query: gql` query reportFinances($username: String!){
        reportFinances(where: {user: {username: {equals: $username}}, approved:{not:false} }){
          id
          year
          rate
          report_type
          approved
          assumption{
            rate
            detail
            volume_value
            volume_unit
            price
            cut_off
            cut_off_unit
            currency
          }
          balance{
            value
            detail
            category
            sub_category
          }
          budgets{
            value
            detail
          }
          capital_budget{
            value
            detail
          }
          cashflow{
            value
            category
            detail
          }
          cost_of_good{
            value
            detail
          }
          fuel{
            rate
            price
            currency
          }
          investment{
            value
            detail
          }
          lost_profit{
            value
            detail
            category
          }
          other_finance{
            detail
            value
          }
          operation_cost{
            value
            detail
          }
          royalty{
            value
            detail
          }
          state_revenue{
            value
            detail
            category
          }
          source_of_funding{
            value
            detail
          }
        }
      }`,   
      variables: {
        username: this.username,
      },
    },
    reportGoods: {
      query: gql` query reportGoods($username: String!){
        reportGoods( where:{user: {username: {equals: $username}}, approved:{not:false}}){
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
      variables: {
        username: this.username,
      },
    },
  },  
  name: 'rekap',
  data() {
    return {
      username:this.$cookies.get('ares'),
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
      assumption: [
        {
          label: 'Uraian',
          field: 'detail',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Jumlah',
          field: this.assumptionQuantity,
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Harga Jual',
          field: this.assumptionValue,
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Cut Off',
          field: this.assumptionCutOff,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      balance: [
        {
          label: 'Kategori',
          field: 'category',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Sub Kategori',
          field: 'sub_category',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      budgets: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      capital_budget: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      cashflow: [
        {
          label: 'Kategori',
          field: 'category',
        },
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      cost_of_good: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      investment: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      lost_profit: [
        {
          label: 'Kategori',
          field: 'category',
        },
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      other_finance: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      operation_cost: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      royalty: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      state_revenue: [
        {
          label: 'Kategori',
          field: 'category',
        },
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
      source_of_funding: [
        {
          label: 'Uraian',
          field: 'detail',
        },
        {
          label: 'Nilai',
          field: this.balanceValue,
          tdClass: 'text-center font-weight-bold',
        },
      ],
    };
  },
  methods: {
    assumptionQuantity(x) {
      return `${x.volume_value} ${x.volume_unit}`;
    },
    assumptionValue(x) {
      return `${x.price} ${x.currency}`;
    },
    assumptionCutOff(x) {
      let y = '';
      if (x.cut_off_unit === 'PERSENTASE') {
        y = '%';
      } else {
        y = 'g/Tonne';
      }
      return `${x.cut_off} ${y}`;
    },
    balanceValue(x) {
      return `${x.value}`;
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
  }
};
</script>

<style scoped>
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

  /deep/ .vue-tabs .nav > li > a  {
    padding: 10px 13px;
  }

  /deep/ .vue-tabs .nav{
    font-size:0.6rem;
  }

  /deep/ .vgt-table th{
    font-size:0.8rem;
    font-weight:600;
  }
</style>
