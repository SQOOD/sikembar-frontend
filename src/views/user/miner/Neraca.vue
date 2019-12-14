<template>
  <div style="width:75%;">
    <canvas id="chart-neraca"></canvas>
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
import colors from '@/utils/colors';
import Chart from '@/utils/chart';
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
      chartBalances: [],
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
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Aktiva Tetap',
            fill: 'start',
            data: [],
            backgroundColor: colors.primary.toRGBA(0.1),
            borderColor: colors.primary.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.primary.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Jumlah Aktiva',
            fill: 'start',
            data: [],
            backgroundColor: colors.salmon.toRGBA(0.1),
            borderColor: colors.salmon.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.salmon.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Aktiva Eksplorasi',
            fill: 'start',
            data: [],
            backgroundColor: colors.green.toRGBA(0.1),
            borderColor: colors.green.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.green.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Jumlah Kewajiban Jangka Pendek',
            fill: 'start',
            data: [],
            backgroundColor: colors.yellow.toRGBA(0.1),
            borderColor: colors.yellow.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.yellow.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Jumlah Kewajiban Jangka Panjang',
            fill: 'start',
            data: [],
            backgroundColor: colors.purple.toRGBA(0.1),
            borderColor: colors.purple.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.purple.toRGBA(1),
            borderWidth: 1.5,
          },
        ],
      }
    };
  },
  mounted() {
    var wiup = window.location.href.split("rekap-keuangan/")[1];
    this.axios.get(address + ":3000/get-user", headers).then((response) => {
      let query = gql.allUser;
      graphqlFunction.graphqlFetchAll(query, (result) => {
        for(var i = 0; i < result.users.length; i++) {
          if(result.users[i].username == wiup) {
            this.user = result.users[i];
          }
        }
        this.fetchReport();
      });
    });
  },
  methods: {
    fetchReport() {
      var id = this.user.user_id;
      this.axios.get(address + ":3000/get-report", headers).then((response) => {
        let query = gql.allReport;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.reports.length; i++) {
            if(result.reports[i].user_id == id) {
              this.reports.push(result.reports[i]);
              if(!this.years.includes(result.reports[i].year)) {
                this.years.push(result.reports[i].year);
                this.years.sort(function(a, b){return a-b});
                this.chartData.labels = this.years;
              }
            }
          }
          this.fetchNeraca(() => {
            this.mountTable();
            this.mountChart();
          });
        });
      })
    },
    fetchNeraca(cb) {
      var id = this.user.user_id;
      this.axios.get(address + ":3000/get-neraca", headers).then((response) => {
        let query = gql.allBalance;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            for(var i = 0; i < result.balances.length; i++) {
              if(this.reports[j].report_id == result.balances[i].report_id) {
                result.balances[i].year = this.reports[j].year;
                result.balances[i].report_type = this.reports[j].report_type;
                this.tableBalances.push(result.balances[i]);
                if(this.reports[j].report_type == "Realisasi") {
                  if(result.balances[i].detail == 'Aktiva Tetap' ||
                    result.balances[i].detail == 'Jumlah Aktiva' ||
                    result.balances[i].detail == 'Aktiva Eksplorasi' ||
                    result.balances[i].detail == 'Jumlah Kewajiban Jangka Pendek' ||
                    result.balances[i].detail == 'Jumlah Kewajiban Jangka Panjang') {
                    this.chartBalances.push(result.balances[i]);
                  }
                }
              }
            }
          }
          for(var k = 0; k < this.chartData.datasets.length; k++) {
            for(var i = 0; i < this.years.length; i++) {
              for(var j = 0; j < this.chartBalances.length; j++) {
                if(this.years[i] == this.chartBalances[j].year) {
                  if(this.chartData.datasets[k].label == 'Aktiva Tetap') {
                    if(this.chartBalances[j]['detail'] == 'Aktiva Tetap') {
                      this.chartData.datasets[k].data.push(this.chartBalances[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Jumlah Aktiva') {
                    if(this.chartBalances[j]['detail'] == 'Jumlah Aktiva') {
                      this.chartData.datasets[k].data.push(this.chartBalances[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Aktiva Eksplorasi') {
                    if(this.chartBalances[j]['detail'] == 'Aktiva Eksplorasi') {
                      this.chartData.datasets[k].data.push(this.chartBalances[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Jumlah Kewajiban Jangka Pendek') {
                    if(this.chartBalances[j]['detail'] == 'Jumlah Kewajiban Jangka Pendek') {
                      this.chartData.datasets[k].data.push(this.chartBalances[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Jumlah Kewajiban Jangka Panjang') {
                    if(this.chartBalances[j]['detail'] == 'Jumlah Kewajiban Jangka Panjang') {
                      this.chartData.datasets[k].data.push(this.chartBalances[j]['value']);
                    }
                  }
                }
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
    mountChart() {
      var ctx = document.getElementById('chart-neraca').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: this.chartData.labels,
            datasets: this.chartData.datasets
        },
        // Configuration options go here
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart Neraca'
          },
          tooltips: {
            mode: 'label',
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Year'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }]
          }
        }
      });
    },
  }
};
</script>
