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
      tableBalances: [],
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
          this.fetchNeraca(() => {
            this.mountTable();
          });
        });
      })
    },
    fetchNeraca(cb) {
      this.axios.get(address + ":3000/get-neraca", headers).then((response) => {
        let query = gql.allBalance;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            for(var i = 0; i < result.balances.length; i++) {
              if(this.reports[j].report_id == result.balances[i].report_id) {
                result.balances[i].year = this.reports[j].year;
                result.balances[i].report_type = this.reports[j].report_type;
                this.tableBalances.push(result.balances[i]);
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    mountTable() {
      for(var i = 0; i < this.tableBalances.length; i++) {
        this.tableData.data.push({
          "detail": this.tableBalances[i]['detail'], 
          "year": this.tableBalances[i]['year'],
          "type": this.tableBalances[i]['report_type'],
          "value": this.tableBalances[i]['value'],
        })
      }
    },
  }
};
</script>
