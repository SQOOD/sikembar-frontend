<template lang="pug">
#commodity
  form
    h1.text-center Komoditas utama dalam
      select.custom-select
        option(value='1' selected) 1 Tahun
        option(value='2') 3 Tahun
        option(value='3') 5 Tahun
        option(value='4') 10 Tahun
      | terakhir
  hr.m-2
  .btn-group.btn-group-sm.mb-3(role='group' aria-label='Basic example')
    button.btn.btn-commodity(type='button') Total Aset
    button.btn.btn-commodity(type='button') Total Penjualan
    button.btn.btn-commodity(type='button') Total Aset Eksplorasi
    button.btn.btn-commodity(type='button') Rasio Hutang terhadap Ekuitas
    button.btn.btn-commodity(type='button') Marjin Laba Bersih
  .row
    .col.mb-3(v-for="card in komoditasCard")
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 {{card.label}}
          p.mb-0 Rp {{card.value.totalAset.toLocaleString()}}
    .col.mb-3(v-for="card in komoditasCard")
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 {{card.label}}
          p.mb-0 Rp {{card.value.totalPenjualan.toLocaleString()}}
    .col.mb-3(v-for="card in komoditasCard")
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 {{card.label}}
          p.mb-0 Rp {{card.value.totalAsetEksplorasi.toLocaleString()}}
    .col.mb-3(v-for="card in komoditasCard")
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 {{card.label}}
          p.mb-0 {{card.value.totalDER.toFixed(2)}} %
    .col.mb-3(v-for="card in komoditasCard")
      Card.text-center
        template(v-slot:body)
          h6.text-uppercase.font-weight-bold.mb-0 {{card.label}}
          p.mb-0 {{card.value.totalNPM.toFixed(2)}} %
  router-link(to='#').btn.btn-sm.btn-primary.text-capitalize.w-100 lihat semua komoditas
</template>

<script>
import gql from '@/gql';
import basicFunction from '@/basicFunction';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';
import Card from '@/components/widgets/Card.vue';
import KomoditasGroup from '@/components/widgets/profile/admin/komoditas-group.json';

export default {
  components: {
    Card,
  },
  data() {
    return {
      reports: [],
      users: [],
      komoditasGroup: KomoditasGroup,
      komoditasCard: [],
      totalAset: [],
      totalPenjualan: [],
      totalAsetEksplorasi: [],
      totalDER: [],
      totalNPM: [],
      activeCard: "totalAset",
    };
  },
  mounted() {
    this.createKomoditasCard();
    this.fetchReport();
  },
  methods: {
    createKomoditasCard() {
      var arrKeys = Object.keys(this.komoditasGroup);
      for(var i = 0; i < arrKeys.length; i++) {
        this.komoditasCard.push({
          label: arrKeys[i],
          value: {
            totalAset: 0,
            totalPenjualan: 0,
            totalAsetEksplorasi: 0,
            totalDER: 0,
            totalNPM: 0,
          },
        });
      }
    },
    fetchKomoditasGroup(komoditas) {
      var arrKeys = Object.keys(this.komoditasGroup);
      for(var i = 0; i < arrKeys.length; i++) {
        for(var j = 0; j < this.komoditasGroup[arrKeys[i]].length; j++) {
          if(this.komoditasGroup[arrKeys[i]][j] == komoditas.toLowerCase()) {
              return arrKeys[i];
          }
        }
      }
    },
    fillKomoditasCard() {
      for(var i = 0; i < this.komoditasCard.length; i++) {
        for(var j = 0; j < this.totalAset.length; j++) {
          if(this.komoditasCard[i].label == this.totalAset[j].komoditas) {
            this.komoditasCard[i].value.totalAset = this.totalAset[j].value;  
          }
        }
        for(var j = 0; j < this.totalPenjualan.length; j++) {
          if(this.komoditasCard[i].label == this.totalPenjualan[j].komoditas) {
            this.komoditasCard[i].value.totalPenjualan = this.totalPenjualan[j].value;  
          }
        }
        for(var j = 0; j < this.totalAsetEksplorasi.length; j++) {
          if(this.komoditasCard[i].label == this.totalAsetEksplorasi[j].komoditas) {
            this.komoditasCard[i].value.totalAsetEksplorasi = this.totalAsetEksplorasi[j].value;  
          }
        }
        for(var j = 0; j < this.totalDER.length; j++) {
          if(this.komoditasCard[i].label == this.totalDER[j].komoditas) {
            this.komoditasCard[i].value.totalDER = this.totalDER[j].value;  
          }
        }
        for(var j = 0; j < this.totalNPM.length; j++) {
          if(this.komoditasCard[i].label == this.totalNPM[j].komoditas) {
            this.komoditasCard[i].value.totalNPM = this.totalNPM[j].value;  
          }
        }
      }
      console.log(this.komoditasCard)
    },
    fetchReport(cb) {
      this.axios.get(address + ":3000/get-report", headers).then((response) => {
        let query = gql.allReport;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.reports.length; i++) {
            this.reports.push(result.reports[i]);
          }
          this.fetchUserComodity(() => {
            this.fetchNeraca();
          });
        });
      })
    },
    fetchUserComodity(cb) {
      this.axios.get(address + ":3000/get-user-detail", headers).then((response) => {
        let query = gql.allUserDetail;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            for(var i = 0; i < result.user_details.length; i++) {
              if(result.user_details[i].user_id == this.reports[j].user_id) {
                  this.reports[j].comodity = result.user_details[i].commodity;
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    fetchNeraca() {
      this.axios.get(address + ":3000/get-neraca", headers).then((response) => {
        let query = gql.allBalance;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            var aktivaLancar = 0;
            var aktivaTidakLancar = 0;
            var aktivaEksplorasi = 0;
            var kewajiban = 0;
            var ekuitas = 0;
            var komoditas = this.reports[j].comodity;
            if(komoditas) {
              komoditas = this.fetchKomoditasGroup(komoditas);
              if(this.reports[j].report_type == "Realisasi") {
                for(var i = 0; i < result.balances.length; i++) {
                  if(this.reports[j].report_id == result.balances[i].report_id) {
                    if(result.balances[i].detail == 'Jumlah Aktiva Lancar') {
                      aktivaLancar += result.balances[i].value;
                    }
                    else if(result.balances[i].detail == 'Jumlah Aktiva Tidak Lancar') {
                      aktivaTidakLancar += result.balances[i].value;
                    }
                    else if(result.balances[i].detail == 'Aktiva Eksplorasi') {
                      aktivaEksplorasi += result.balances[i].value;
                    }
                    else if(result.balances[i].detail == 'Jumlah Kewajiban') {
                      kewajiban += result.balances[i].value;
                    }
                    else if(result.balances[i].detail == 'Jumlah Ekuitas') {
                      ekuitas += result.balances[i].value;
                    }
                  }
                }
                if(this.totalAset.length == 0) {
                  this.totalAset.push({
                    "komoditas": komoditas,
                    "value": aktivaLancar + aktivaTidakLancar
                  });    
                }
                else {
                  for(var i = 0; i < this.totalAset.length; i++) {
                    if(this.totalAset[i].komoditas == komoditas) {
                      this.totalAset[i].value += aktivaLancar + aktivaTidakLancar;
                      break;
                    }
                    if(i == this.totalAset.length-1) {
                      this.totalAset.push({
                        "komoditas": komoditas,
                        "value": aktivaLancar + aktivaTidakLancar
                      });
                      break;
                    }
                  }
                }
                if(this.totalDER.length == 0) {
                  this.totalDER.push({
                    "komoditas": komoditas,
                    "value": kewajiban / ekuitas
                  });
                }
                else {
                  for(var i = 0; i < this.totalDER.length; i++) {
                    if(this.totalDER[i].komoditas == komoditas) {
                      this.totalDER[i].value += kewajiban / ekuitas;
                      break;
                    }
                    if(i == this.totalDER.length-1) {
                      this.totalDER.push({
                        "komoditas": komoditas,
                        "value": kewajiban / ekuitas
                      });
                      break;
                    }
                  }
                }
                if(this.totalAsetEksplorasi.length == 0) {
                  this.totalAsetEksplorasi.push({
                    "komoditas": komoditas,
                    "value": aktivaEksplorasi
                  });    
                }
                else {
                  for(var i = 0; i < this.totalAsetEksplorasi.length; i++) {
                    if(this.totalAsetEksplorasi[i].komoditas == komoditas) {
                      this.totalAsetEksplorasi[i].value += aktivaEksplorasi
                      break;
                    }
                    if(i == this.totalAsetEksplorasi.length-1) {
                      this.totalAsetEksplorasi.push({
                        "komoditas": komoditas,
                        "value": aktivaEksplorasi
                      });
                      break;
                    }
                  }
                }
              }
            }
          }
          this.fetchLabaRugi();
        });
      })
    },
    fetchLabaRugi(cb) {
      this.axios.get(address + ":3000/get-laba-rugi", headers).then((response) => {
        let query = gql.allProfitLoss;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var j = 0; j < this.reports.length; j++) {
            var penjualan = 0;
            var labaBersih = 0;
            var komoditas = this.reports[j].comodity;
            if(komoditas) {
              komoditas = this.fetchKomoditasGroup(komoditas);
              if(this.reports[j].report_type == "Realisasi") {
                for(var i = 0; i < result.profit_losses.length; i++) {
                  if(this.reports[j].report_id == result.profit_losses[i].report_id) {
                    if(result.profit_losses[i].detail == 'Penjualan') {
                      penjualan += result.profit_losses[i].value;
                    }
                    else if(result.profit_losses[i].detail == 'Laba Rugi Bersih') {
                      labaBersih += result.profit_losses[i].value;
                    }
                  }
                }
                if(this.totalPenjualan.length == 0) {
                  this.totalPenjualan.push({
                    "komoditas": komoditas,
                    "value": penjualan
                  });    
                }
                else {
                  for(var i = 0; i < this.totalPenjualan.length; i++) {
                    if(this.totalPenjualan[i].komoditas == komoditas) {
                      this.totalPenjualan[i].value += penjualan
                      break;
                    }
                    if(i == this.totalPenjualan.length-1) {
                      this.totalPenjualan.push({
                        "komoditas": komoditas,
                        "value": penjualan
                      });
                      break;
                    }
                  }
                }
                if(this.totalNPM.length == 0) {
                  this.totalNPM.push({
                    "komoditas": komoditas,
                    "value": labaBersih / penjualan
                  });    
                }
                else {
                  for(var i = 0; i < this.totalNPM.length; i++) {
                    if(this.totalNPM[i].komoditas == komoditas) {
                      this.totalNPM[i].value += labaBersih / penjualan
                      break;
                    }
                    if(i == this.totalNPM.length-1) {
                      this.totalNPM.push({
                        "komoditas": komoditas,
                        "value": labaBersih / penjualan
                      });
                      break;
                    }
                  }
                }
              }
            }
          }
          this.fillKomoditasCard();
        });
      })
    },
  }
};
</script>

<style scoped>
  h1{
    font-size:1rem;
    color:#5a5a5a;
    font-weight:600;
  }

  .custom-select{
    width:auto;
    background-color:transparent;
    border:none;
    color:#5a5a5a;
    font-weight:600;
    border-bottom:rgba(240, 180, 17, 0.7) solid 1px;
    border-radius:0;
    margin:0;
    padding: 0 1rem 0 .75rem;
    height: calc(1.5em + 2px)
  }

  .custom-select:focus{
    box-shadow: none;
  }

  #commodity{
    margin-top:2px;
  }

  .btn-commodity{
    font-weight:600;
    font-size:0.743rem;
    color:#5a5a5a;
    border:1px solid rgba(0,0,0,.125);
    background:rgba(240, 180, 17, 0.3);
  }

  .btn-commodity:hover{
    background:rgba(240, 180, 17, 0.7);
  }

  .btn-commodity:focus{
    box-shadow:none;
  }

  .card{
    max-width:12rem;
  }

  h6{
    color:#757575;
    font-size:0.8rem;
  }

  p{
    font-size:2.4rem;
    color:#3D5170;
  }

  /deep/ .card-header{
    display:none;
  }
</style>
