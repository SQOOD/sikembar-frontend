<template>
  <div style="width:75%;">
    <pivot-table :data="tableData.data" 
                 :row-fields="tableData.rowFields" 
                 :col-fields="tableData.colFields" 
                 :reducer="tableData.reducer"
                 :default-show-settings="false">
      <template slot="value" slot-scope="{ value }">
        Rp. {{ value.toLocaleString() }}
      </template>
      <!-- Optional slots can be used for formatting table headers and values, see documentation below -->
    </pivot-table>
  </div>
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';
import PivotTable from '@marketconnect/vue-pivot-table';

export default {
  components: { 
    PivotTable 
  },
  data() {
    return {
      user: {},
      reports: [],
      tableNationalIncomes: [],
      years: [],
      dateRange: {
        from: null,
        to: null,
      },
      tableData: {
        data: [],
        rowFields: [{
          getter: item => item.detail,
          label: 'Detail'
        }],
        colFields: [{
          getter: item => item.year,
          label: 'Year'
        }, {
          getter: item => item.type,
          label: 'Type'
        }],
        reducer: (sum, item) => sum + item.value,
        defaultShowSettings: true,
        isDataLoading: false
      },
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
              this.reports.push(result.reports[i]);
              if(!this.years.includes(result.reports[i].year)) {
                this.years.push(result.reports[i].year);
                this.years.sort(function(a, b){return a-b});
              }
            }
          }
          this.fetchPenerimaanNegara(() => {
            this.mountTable();
          });
        });
      })
    },
    fetchPenerimaanNegara(cb) {
      var id = this.user.user_id;
      this.axios.get(address + ":3000/get-penerimaan-negara", headers).then((response) => {
        let query = gql.allNationalIncome;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            for(var i = 0; i < result.national_incomes.length; i++) {
              if(this.reports[j].report_id == result.national_incomes[i].report_id) {
                result.national_incomes[i].year = this.reports[j].year;
                result.national_incomes[i].report_type = this.reports[j].report_type;
                this.tableNationalIncomes.push(result.national_incomes[i]);
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    mountTable() {
      for(var i = 0; i < this.tableNationalIncomes.length; i++) {
        this.tableData.data.push({
          "detail": this.tableNationalIncomes[i]['detail'], 
          "year": this.tableNationalIncomes[i]['year'],
          "type": this.tableNationalIncomes[i]['report_type'],
          "value": this.tableNationalIncomes[i]['value'],
        })
      }
    },
  }
};
</script>
