<template lang="pug">
#report.container.mt-4
  section(v-if='reportFinance')
    section.d-flex.flex-row.pb-2.mb-2
      .card
        .card-body
          h1
            | Detail Laporan Keuangan
            span.badge.badge-secondary.ml-2 {{ reportFinance.id }}
            span.badge.badge-secondary.ml-2 {{ reportFinance.year }}
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
                  @click='showComment'
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
                  @click='showComment'
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
    vue-tabs
      v-tab(title='Asumsi Keuangan')
        h3 [ BBM Sebesar {{ reportFinance.fuel[0].price }} {{ reportFinance.fuel[0].currency }}]
        vue-good-table(:columns='assumption' :rows='reportFinance.assumption').mb-3
      v-tab(title='Neraca Keuangan')
        vue-good-table(:columns='balance' :rows='reportFinance.balance').mb-3
      v-tab(title='Anggaran Belanja')
        vue-good-table(:columns='budgets' :rows='reportFinance.budgets').mb-3
        vue-good-table(:columns='capital_budget' :rows='reportFinance.capital_budget').mb-3
      v-tab(title='Arus Keuangan')
        vue-good-table(:columns='cashflow' :rows='reportFinance.cashflow').mb-3
      v-tab(title='Harga Pokok Penjualan')
        vue-good-table(:columns='operation_cost' :rows='reportFinance.operation_cost').mb-3
        vue-good-table(:columns='royalty' :rows='reportFinance.royalty').mb-3
        vue-good-table(:columns='cost_of_good' :rows='reportFinance.cost_of_good').mb-3
      v-tab(title='Investasi')
        vue-good-table(:columns='investment' :rows='reportFinance.investment').mb-3
      v-tab(title='Laba Rugi')
        vue-good-table(:columns='lost_profit' :rows='reportFinance.lost_profit').mb-3
        vue-good-table(:columns='operation_cost' :rows='reportFinance.operation_cost').mb-3
      v-tab(title='Keuangan Lainnya')
        vue-good-table(:columns='other_finance' :rows='reportFinance.other_finance').mb-3
      v-tab(title='Penerimaan Negara')
        vue-good-table(:columns='state_revenue' :rows='reportFinance.state_revenue').mb-3
      v-tab(title='Sumber Pembiayaan')
        vue-good-table(:columns='source_of_funding' :rows='reportFinance.source_of_funding').mb-3
  span( v-else ) Loading ...
</template>

<script>
import gql from 'graphql-tag';
import commaNumber from 'comma-number';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  apollo: {
    reportFinance: {
      query: gql` query reportFinance($id: String!){
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
  validations: {
    comment: {
      required,
      minLength: minLength(10),
    },
  },
  data() {
    return {
      comment: '',
      reportStatus: 'Kirim Penolakan',
      commentShow: false,
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
  created() {
    this.$apollo.queries.reportFinance.setVariables({
      id: this.$route.params.reportID,
    });
  },
  methods: {
    showComment() {
      this.commentShow = !this.commentShow;
    },
    assumptionQuantity(x) {
      return `${x.volume_value} ${x.volume_unit}`;
    },
    assumptionValue(x) {
      return `${commaNumber(x.price, '.', ',')} ${x.currency}`;
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
      return `${commaNumber(x.value, '.', ',')}`;
    },
    submitApproval() {
      this.$refs.vac.startCountdown();
    },
    holdApproval() {
      this.$refs.vac.pauseCountdown();
    },
    approve() {
      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportFinance($id: String!){
          updateOneReportFinance(where:{id: $id}, data:{approved: true}){
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
    reject() {
      this.$refs.vac.stopCountdown();
      this.reportStatus = 'Laporan Ditolak';
      this.$apollo.mutate({
        mutation: gql`mutation updateOneReportFinance($id: String!, $comment: String){
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
      //   mutation: gql`mutation updateOneReportFinance($id: ID!){
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

  h1{
    color:#808080;
    font-size:1.3rem;
    font-weight:600;
    margin-top:0.1rem;
    margin-bottom:0;
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

  /deep/ .vgt-table td, a{
    font-size:0.8rem;
  }

  /deep/ .vgt-table td svg{
    margin-right: 0.3rem;
  }
</style>
