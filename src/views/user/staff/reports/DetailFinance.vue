<template lang="pug">
#report.container.mt-4
  section(v-if='reportFinance')
    section.d-flex.flex-row.pb-2.mb-2
      h1
        | Detail laporan
        span.badge.badge-secondary.ml-2 {{ reportFinance.id }}
        span.badge.badge-secondary.ml-2 {{ reportFinance.year }}
      button.ml-auto.btn.btn-sm.btn-info(type='button' @click='approve') Setujui Laporan
    h2 Asumsi Keuangan
    h3 [ BBM Sebesar {{ reportFinance.fuel[0].price }} {{ reportFinance.fuel[0].currency }}]
    vue-good-table(:columns='assumption' :rows='reportFinance.assumption').mb-3
    h2 Neraca Keuangan
    vue-good-table(:columns='balance' :rows='reportFinance.balance').mb-3
    h2 Anggaran Belanja
    vue-good-table(:columns='budgets' :rows='reportFinance.budgets').mb-3
    h3 Belanja Modal
    vue-good-table(:columns='capital_budget' :rows='reportFinance.capital_budget').mb-3
    h3 Arus Keuangan
    vue-good-table(:columns='cashflow' :rows='reportFinance.cashflow').mb-3
  vue-element-loading( v-else :active='true' spinner="bar-fade-scale" color="#3434334")
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    reportFinance: {
      query: gql` query reportFinance($id: ID!){
        reportFinance( where:{id: $id} ){
          id
          year
          rate
          report_type
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
    },
  },
  data() {
    return {
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
    };
  },
  created() {
    this.$apollo.queries.reportFinance.setVariables({
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
    approve() {
      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportFinance($id: ID!){
          updateOneReportFinance(where:{id: $id}, data:{approved: true}){
            approved
          },
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
