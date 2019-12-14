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
      tableProfitLosses: [],
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
          this.fetchLabaRugi(() => {
            this.mountTable();
          });
        });
      })
    },
    fetchLabaRugi(cb) {
      var id = this.user.user_id;
      this.axios.get(address + ":3000/get-laba-rugi", headers).then((response) => {
        let query = gql.allProfitLoss;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            for(var i = 0; i < result.profit_losses.length; i++) {
              if(this.reports[j].report_id == result.profit_losses[i].report_id) {
                result.profit_losses[i].year = this.reports[j].year;
                result.profit_losses[i].report_type = this.reports[j].report_type;
                this.tableProfitLosses.push(result.profit_losses[i]);
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    mountTable() {
      for(var i = 0; i < this.tableProfitLosses.length; i++) {
        this.tableData.data.push({
          "detail": this.tableProfitLosses[i]['detail'], 
          "year": this.tableProfitLosses[i]['year'],
          "type": this.tableProfitLosses[i]['report_type'],
          "value": this.tableProfitLosses[i]['value'],
        })
      }
    },
  }
};
</script>
