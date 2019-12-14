<template>
  <div style="width:75%;">
    <canvas id="chart-laba-rugi"></canvas>
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
      tableProfitLosses: [],
      chartProfitLosses: [],
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
            label: 'Penjualan',
            fill: 'start',
            data: [],
            backgroundColor: colors.primary.toRGBA(0.1),
            borderColor: colors.primary.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.primary.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'HPP',
            fill: 'start',
            data: [],
            backgroundColor: colors.salmon.toRGBA(0.1),
            borderColor: colors.salmon.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.salmon.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Beban Operasi',
            fill: 'start',
            data: [],
            backgroundColor: colors.green.toRGBA(0.1),
            borderColor: colors.green.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.green.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Pajak Penghasilan',
            fill: 'start',
            data: [],
            backgroundColor: colors.yellow.toRGBA(0.1),
            borderColor: colors.yellow.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.yellow.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Laba Bersih',
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
          this.fetchLabaRugi(() => {
            this.mountTable();
            this.mountChart();
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
                if(this.reports[j].report_type == "Realisasi") {
                  if(result.profit_losses[i].detail == 'Penjualan' ||
                    result.profit_losses[i].detail == 'Harga Pokok Penjualan' ||
                    result.profit_losses[i].detail == 'Beban Operasi' ||
                    result.profit_losses[i].detail == 'Biaya Pajak Penghasilan' ||
                    result.profit_losses[i].detail == 'Laba Rugi Bersih') {
                    result.profit_losses[i].year = this.reports[j].year;
                    this.chartProfitLosses.push(result.profit_losses[i]);
                  }
                }
              }
            }
          }
          for(var k = 0; k < this.chartData.datasets.length; k++) {
            for(var i = 0; i < this.years.length; i++) {
              for(var j = 0; j < this.chartProfitLosses.length; j++) {
                if(this.years[i] == this.chartProfitLosses[j].year) {
                  if(this.chartData.datasets[k].label == 'Penjualan') {
                    if(this.chartProfitLosses[j]['detail'] == 'Penjualan') {
                      this.chartData.datasets[k].data.push(this.chartProfitLosses[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'HPP') {
                    if(this.chartProfitLosses[j]['detail'] == 'Harga Pokok Penjualan') {
                      this.chartData.datasets[k].data.push(this.chartProfitLosses[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Beban Operasi') {
                    if(this.chartProfitLosses[j]['detail'] == 'Beban Operasi') {
                      this.chartData.datasets[k].data.push(this.chartProfitLosses[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Pajak Penghasilan') {
                    if(this.chartProfitLosses[j]['detail'] == 'Biaya Pajak Penghasilan') {
                      this.chartData.datasets[k].data.push(this.chartProfitLosses[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Laba Bersih') {
                    if(this.chartProfitLosses[j]['detail'] == 'Laba Rugi Bersih') {
                      this.chartData.datasets[k].data.push(this.chartProfitLosses[j]['value']);
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
      for(var i = 0; i < this.tableProfitLosses.length; i++) {
        this.tableData.data.push({
          "detail": this.tableProfitLosses[i]['detail'], 
          "year": this.tableProfitLosses[i]['year'],
          "type": this.tableProfitLosses[i]['report_type'],
          "value": this.tableProfitLosses[i]['value'],
        })
      }
    },
    mountChart() {
      var ctx = document.getElementById('chart-laba-rugi').getContext('2d');
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
            text: 'Chart Laba Rugi'
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
