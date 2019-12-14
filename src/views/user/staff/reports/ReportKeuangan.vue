<template>
  <div>
    <report-neraca></report-neraca>
    <report-laba-rugi></report-laba-rugi>
    <report-penerimaan-negara></report-penerimaan-negara>
    <button class="btn btn-primary" v-on:click="updateReport()">Approve</button>
  </div>
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';
import PivotTable from '@marketconnect/vue-pivot-table';
import ReportNeraca from '@/views/user/staff/reports/ReportNeraca.vue';
import ReportLabaRugi from '@/views/user/staff/reports/ReportLabaRugi.vue';
import ReportPenerimaanNegara from '@/views/user/staff/reports/ReportPenerimaanNegara.vue';

export default {
  components: { 
    PivotTable,
    ReportNeraca,
    ReportLabaRugi,
    ReportPenerimaanNegara
  },
  data() {
    return {
      reports: {},
    };
  },
  mounted() {
    this.fetchReport();
  },
  methods: {
    fetchReport() {
      var id = window.location.href.split("report-keuangan/")[1];
      this.axios.get(address + ":3000/get-report", headers).then((response) => {
        let query = gql.allReport;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.reports.length; i++) {
            if(result.reports[i].report_id == id) {
              this.report = result.reports[i];
            }
          }
        });
      })
    },
    updateReport() {
      let postObj = {
        report_id: this.report.report_id,
        user_id: this.report.user_id,
        year: this.report.year,
        term: this.report.term,
        report_type: this.report.report_type,
        currency: this.report.currency,
        rate: this.report.rate,
        approved: 1,
        flagged_for_deletion: this.report.flagged_for_deletion
      };
      this.axios.post(address + ':3000/update-report', postObj, headers).then((response) => {
        let query = gql.updateReport;
        let variables = {
          reportId: postObj.report_id,
          input: postObj
        }
        graphqlFunction.graphqlMutation(query, variables, (result) => {
          this.$router.push('/admin');
        });
      });
    },
  }
};
</script>
