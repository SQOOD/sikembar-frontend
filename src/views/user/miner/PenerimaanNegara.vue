<template>
  <div style="width:75%;">
    <canvas id="chart-penerimaan-negara"></canvas>
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
      tableNationalIncomes: [],
      chartNationalIncomes: [],
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
            label: 'Royalti',
            fill: 'start',
            data: [],
            backgroundColor: colors.primary.toRGBA(0.1),
            borderColor: colors.primary.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.primary.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Deadrent',
            fill: 'start',
            data: [],
            backgroundColor: colors.salmon.toRGBA(0.1),
            borderColor: colors.salmon.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.salmon.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Jumlah Pajak',
            fill: 'start',
            data: [],
            backgroundColor: colors.green.toRGBA(0.1),
            borderColor: colors.green.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.green.toRGBA(1),
            borderWidth: 1.5,
          },
          {
            label: 'Pajak Daerah',
            fill: 'start',
            data: [],
            backgroundColor: colors.yellow.toRGBA(0.1),
            borderColor: colors.yellow.toRGBA(1),
            pointBackgroundColor: colors.white.toHex(),
            pointHoverBackgroundColor: colors.yellow.toRGBA(1),
            borderWidth: 1.5,
          }
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
          this.fetchPenerimaanNegara(() => {
            this.mountTable();
            this.mountChart();
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
                if(this.reports[j].report_type == "Realisasi") {  
                  if(result.national_incomes[i].detail == 'Royalti' ||
                    result.national_incomes[i].detail == 'Deadrent' ||
                    result.national_incomes[i].detail == 'Pajak-pajak daerah' ||
                    result.national_incomes[i].detail == 'Jumlah Pajak') {
                    result.national_incomes[i].year = this.reports[j].year;
                    this.chartNationalIncomes.push(result.national_incomes[i]);
                  }
                }
              }
            }
          }
          for(var k = 0; k < this.chartData.datasets.length; k++) {
            for(var i = 0; i < this.years.length; i++) {
              for(var j = 0; j < this.chartNationalIncomes.length; j++) {
                if(this.years[i] == this.chartNationalIncomes[j].year) {
                  if(this.chartData.datasets[k].label == 'Royalti') {
                    if(this.chartNationalIncomes[j]['detail'] == 'Royalti') {
                      this.chartData.datasets[k].data.push(this.chartNationalIncomes[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Deadrent') {
                    if(this.chartNationalIncomes[j]['detail'] == 'Deadrent') {
                      this.chartData.datasets[k].data.push(this.chartNationalIncomes[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Jumlah Pajak') {
                    if(this.chartNationalIncomes[j]['detail'] == 'Jumlah Pajak') {
                      this.chartData.datasets[k].data.push(this.chartNationalIncomes[j]['value']);
                    }
                  }
                  if(this.chartData.datasets[k].label == 'Pajak Daerah') {
                    if(this.chartNationalIncomes[j]['detail'] == 'Pajak-pajak daerah') {
                      this.chartData.datasets[k].data.push(this.chartNationalIncomes[j]['value']);
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
      for(var i = 0; i < this.tableNationalIncomes.length; i++) {
        this.tableData.data.push({
          "detail": this.tableNationalIncomes[i]['detail'], 
          "year": this.tableNationalIncomes[i]['year'],
          "type": this.tableNationalIncomes[i]['report_type'],
          "value": this.tableNationalIncomes[i]['value'],
        })
      }
    },
    mountChart() {
      var ctx = document.getElementById('chart-penerimaan-negara').getContext('2d');
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
            text: 'Chart Penerimaan Negara'
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
