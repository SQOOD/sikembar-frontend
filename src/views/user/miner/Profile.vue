<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail(
          :companyName= 'info.nama_perusahaan',
          :permission= 'info.perizinan[0].jenis_izin',
          :companyType= 'info.tipe_perusahaan',
          :address= 'info.alamat_perusahaan',
          :email= 'info.email',
          :npwp= 'info.npwp',
          :wiup= 'info.perizinan[0].kode_wiup',
          :commodity= 'info.perizinan[0].komoditas',
          :province= 'info.perizinan[0].provinsi'
        )
      .col-md-7
        ExcelAlert
        vue-dropzone( ref="myVueDropzone" id="dropzone"
        :options="dropzoneOptions" :useCustomSlot='true' @vdropzone-file-added='checkUploadType($event)'
        :duplicateCheck='true' )
          img(src='@/assets/img/excel.svg')
          h5.font-weight-bold Jatuhkan Berkas Formulir SIKEMBAR disini
            br
            small atau klik disini untuk mencari berkas dalam alat anda.
        br
        button.btn-block.btn.btn-primary.btn-sm(v-if="reports[0]" v-on:click="addReport()") Kirim
        button.btn-block.btn.btn-primary.btn-sm(v-if="report_procurements[0]" v-on:click="addReportBarang()") Kirim
        div(v-if="reports[0]")
          br
          span
            | Neraca 
          div(v-for="balance in calculated_balance")
            | {{balance['Uraian']}}: {{balance['Nilai']}}
          br
          span
            | Laba Rugi 
          div(v-for="profit_loss in calculated_profit_loss")
            | {{profit_loss['Uraian']}}: {{profit_loss['Nilai']}}
          br
          span
            | Penerimaan Negara 
          div(v-for="national_income in calculated_national_income")
            | {{national_income['Uraian']}}: {{national_income['Nilai']}}
          br
          span
            | Arus Kas 
          div(v-for="cashflow in calculated_cashflow")
            | {{cashflow['Uraian']}}: {{cashflow['Nilai']}}
          br
          span
            | Anggaran Belanja
          div(v-for="budget in calculated_budget")
            | {{budget['Uraian']}}: {{budget['Nilai']}}
          br
          span
            | HPP 
          div(v-for="costofgood in calculated_costofgood")
            | {{costofgood['Uraian']}}: {{costofgood['Nilai']}}
        div(v-if="report_procurements[0]")
          br
          span
            | Belanja Barang 
          div(v-for="barang in belanjaBarang" v-if="barang['Jenis Barang'] == 'Total'")
            | Total TKDN Kategori {{barang['Kategori']}}: {{barang['Bobot Tertimbang (%)'].toFixed(2)}}%
        div
          | {{ json }}
        charts
</template>

<script>
import XLSX from 'xlsx';
import vue2Dropzone from 'vue2-dropzone';
import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Charts from '@/components/charts/RandomCharts.vue';
import ExcelAlert from '@/components/alerts/ExcelFile.vue';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';

export default {
  data() {
    return {
      info: '',
      json: '',

      balances: [],
      profit_losses: [],
      national_incomes: [],
      cashflows: [],
      budgets: [],
      costofgoods: [],
      source_of_financings: [],
      investments: [],
      other_finances: [],
      assumptions: [],
      reports: [],
      calculated_balance: [],
      calculated_profit_loss: [],
      calculated_national_income: [],
      calculated_cashflow: [],
      calculated_budget: [],
      calculated_costofgood: [],

      report_procurements: [],
      barangA: [],
      barangB: [],
      barangC: [],
      barangD: [],
      barangE: [],
      barangF: [],
      barangG: [],
      barangH: [],
      barangI: [],
      barangJ: [],
      barangK: [],
      barangL: [],
      barangM: [],
      barangN: [],
      barangO: [],
      barangP: [],
      barangQ: [],
      barangR: [],
      barangS: [],
      barangT: [],
      belanjaBarang: [],

      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 1,
        headers: { 'My-Awesome-Header': 'header value' },
        acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12',
      },
    };
  },
  components: {
    ProfileDetail,
    vueDropzone: vue2Dropzone,
    Charts,
    ExcelAlert,
  },
  mounted() {
    this.axios.get(`/v1/moms?kode_wiup=${this.$route.params.wiup}`).then((response) => {
      this.info = response.data.perusahaan;
    });
  },
  methods: {
    importXls(file) {
      var vm = this;
      var files = file, f = file;
      var reader = new FileReader();
      reader.onload = function(event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        let reportConfig = workbook.SheetNames[0];
        let worksheetConfig = workbook.Sheets[reportConfig];

        if(XLSX.utils.sheet_to_json(worksheetConfig)[0]["Jenis Laporan"] == "Keuangan") {
          let sheetNeraca = workbook.SheetNames[1];
          let sheetLabaRugi = workbook.SheetNames[2];
          let sheetArusKas = workbook.SheetNames[3];
          let sheetAsumsiKeuangan = workbook.SheetNames[4];
          let sheetAnggaranBelanja = workbook.SheetNames[5];
          let sheetHPP = workbook.SheetNames[6];
          let sheetSumberPembiayaan = workbook.SheetNames[7];
          let sheetInvestasi = workbook.SheetNames[8];
          let sheetKeuanganLainnya = workbook.SheetNames[9];
          let sheetPenerimaanNegara = workbook.SheetNames[10];

          let worksheetNeraca = workbook.Sheets[sheetNeraca];
          let worksheetLabaRugi = workbook.Sheets[sheetLabaRugi];
          let worksheetPenerimaanNegara = workbook.Sheets[sheetPenerimaanNegara];
          let worksheetArusKas = workbook.Sheets[sheetArusKas];
          let worksheetAsumsiKeuangan = workbook.Sheets[sheetAsumsiKeuangan];
          let worksheetAnggaranBelanja = workbook.Sheets[sheetAnggaranBelanja];
          let worksheetHPP = workbook.Sheets[sheetHPP];
          let worksheetSumberPembiayaan = workbook.Sheets[sheetSumberPembiayaan];
          let worksheetInvestasi = workbook.Sheets[sheetInvestasi];
          let worksheetKeuanganLainnya = workbook.Sheets[sheetKeuanganLainnya];

          vm.reports = XLSX.utils.sheet_to_json(worksheetConfig);
          vm.balances = XLSX.utils.sheet_to_json(worksheetNeraca);
          vm.profit_losses = XLSX.utils.sheet_to_json(worksheetLabaRugi);
          vm.national_incomes = XLSX.utils.sheet_to_json(worksheetPenerimaanNegara);
          vm.cashflows = XLSX.utils.sheet_to_json(worksheetArusKas);
          vm.assumptions = XLSX.utils.sheet_to_json(worksheetAsumsiKeuangan);
          vm.budgets = XLSX.utils.sheet_to_json(worksheetAnggaranBelanja);
          vm.costofgoods = XLSX.utils.sheet_to_json(worksheetHPP);
          vm.source_of_financings = XLSX.utils.sheet_to_json(worksheetSumberPembiayaan);
          vm.investments = XLSX.utils.sheet_to_json(worksheetInvestasi);
          vm.other_finances = XLSX.utils.sheet_to_json(worksheetKeuanganLainnya);

          vm.spliceArray(vm.balances);
          vm.normalizeCategory(vm.balances);

          vm.spliceArray(vm.profit_losses);
          vm.normalizeCategory(vm.profit_losses);

          vm.spliceArray(vm.national_incomes);
          vm.normalizeCategory(vm.national_incomes);

          vm.spliceArray(vm.cashflows);
          vm.normalizeCategory(vm.cashflows);

          vm.spliceArray(vm.assumptions);

          vm.spliceArray(vm.budgets);
          vm.normalizeCategory(vm.budgets);

          vm.spliceArray(vm.costofgoods);

          vm.spliceArray(vm.source_of_financings);

          vm.spliceArray(vm.investments);

          vm.spliceArray(vm.other_finances);

          vm.calculateNeraca(vm.balances);
          vm.calculateLabaRugi(vm.profit_losses);
          vm.calculatePenerimaanNegara(vm.national_incomes);
          vm.calculateArusKas(vm.cashflows);
          vm.calculateAnggaranBelanja(vm.budgets);
          vm.calculateHPP(vm.costofgoods);
        }
        else if(XLSX.utils.sheet_to_json(worksheetConfig)[0]["Jenis Laporan"] == "Barang") {
          let barangA = workbook.SheetNames[1];
          let barangB = workbook.SheetNames[2];
          let barangC = workbook.SheetNames[3];
          let barangD = workbook.SheetNames[4];
          let barangE = workbook.SheetNames[5];
          let barangF = workbook.SheetNames[6];
          let barangG = workbook.SheetNames[7];
          let barangH = workbook.SheetNames[8];
          let barangI = workbook.SheetNames[9];
          let barangJ = workbook.SheetNames[10];
          let barangK = workbook.SheetNames[11];
          let barangL = workbook.SheetNames[12];
          let barangM = workbook.SheetNames[13];
          let barangN = workbook.SheetNames[14];
          let barangO = workbook.SheetNames[15];
          let barangP = workbook.SheetNames[16];
          let barangQ = workbook.SheetNames[17];
          let barangR = workbook.SheetNames[18];
          let barangS = workbook.SheetNames[19];
          let barangT = workbook.SheetNames[20];

          let worksheetBarangA = workbook.Sheets[barangA];
          let worksheetBarangB = workbook.Sheets[barangB];
          let worksheetBarangC = workbook.Sheets[barangC];
          let worksheetBarangD = workbook.Sheets[barangD];
          let worksheetBarangE = workbook.Sheets[barangE];
          let worksheetBarangF = workbook.Sheets[barangF];
          let worksheetBarangG = workbook.Sheets[barangG];
          let worksheetBarangH = workbook.Sheets[barangH];
          let worksheetBarangI = workbook.Sheets[barangI];
          let worksheetBarangJ = workbook.Sheets[barangJ];
          let worksheetBarangK = workbook.Sheets[barangK];
          let worksheetBarangL = workbook.Sheets[barangL];
          let worksheetBarangM = workbook.Sheets[barangM];
          let worksheetBarangN = workbook.Sheets[barangN];
          let worksheetBarangO = workbook.Sheets[barangO];
          let worksheetBarangP = workbook.Sheets[barangP];
          let worksheetBarangQ = workbook.Sheets[barangQ];
          let worksheetBarangR = workbook.Sheets[barangR];
          let worksheetBarangS = workbook.Sheets[barangS];
          let worksheetBarangT = workbook.Sheets[barangT];

          vm.report_procurements = XLSX.utils.sheet_to_json(worksheetConfig);
          vm.barangA = XLSX.utils.sheet_to_json(worksheetBarangA);
          vm.barangB = XLSX.utils.sheet_to_json(worksheetBarangB);
          vm.barangC = XLSX.utils.sheet_to_json(worksheetBarangC);
          vm.barangD = XLSX.utils.sheet_to_json(worksheetBarangD);
          vm.barangE = XLSX.utils.sheet_to_json(worksheetBarangE);
          vm.barangF = XLSX.utils.sheet_to_json(worksheetBarangF);
          vm.barangG = XLSX.utils.sheet_to_json(worksheetBarangG);
          vm.barangH = XLSX.utils.sheet_to_json(worksheetBarangH);
          vm.barangI = XLSX.utils.sheet_to_json(worksheetBarangI);
          vm.barangJ = XLSX.utils.sheet_to_json(worksheetBarangJ);
          vm.barangK = XLSX.utils.sheet_to_json(worksheetBarangK);
          vm.barangL = XLSX.utils.sheet_to_json(worksheetBarangL);
          vm.barangM = XLSX.utils.sheet_to_json(worksheetBarangM);
          vm.barangN = XLSX.utils.sheet_to_json(worksheetBarangN);
          vm.barangO = XLSX.utils.sheet_to_json(worksheetBarangO);
          vm.barangP = XLSX.utils.sheet_to_json(worksheetBarangP);
          vm.barangQ = XLSX.utils.sheet_to_json(worksheetBarangQ);
          vm.barangR = XLSX.utils.sheet_to_json(worksheetBarangR);
          vm.barangS = XLSX.utils.sheet_to_json(worksheetBarangS);
          vm.barangT = XLSX.utils.sheet_to_json(worksheetBarangT);

          vm.normalizeCategoryBarang(vm.barangA);
          vm.normalizeCategoryBarang(vm.barangB);
          vm.normalizeCategoryBarang(vm.barangC);
          vm.normalizeCategoryBarang(vm.barangD);
          vm.normalizeCategoryBarang(vm.barangE);
          vm.normalizeCategoryBarang(vm.barangF);
          vm.normalizeCategoryBarang(vm.barangG);
          vm.normalizeCategoryBarang(vm.barangH);
          vm.normalizeCategoryBarang(vm.barangI);
          vm.normalizeCategoryBarang(vm.barangJ);
          vm.normalizeCategoryBarang(vm.barangK);
          vm.normalizeCategoryBarang(vm.barangL);
          vm.normalizeCategoryBarang(vm.barangM);
          vm.normalizeCategoryBarang(vm.barangN);
          vm.normalizeCategoryBarang(vm.barangO);
          vm.normalizeCategoryBarang(vm.barangP);
          vm.normalizeCategoryBarang(vm.barangQ);
          vm.normalizeCategoryBarang(vm.barangR);
          vm.normalizeCategoryBarang(vm.barangS);
          vm.normalizeCategoryBarang(vm.barangT);

          vm.calculateBarang(vm.barangA);
          vm.calculateBarang(vm.barangB);
          vm.calculateBarang(vm.barangC);
          vm.calculateBarang(vm.barangD);
          vm.calculateBarang(vm.barangE);
          vm.calculateBarang(vm.barangF);
          vm.calculateBarang(vm.barangG);
          vm.calculateBarang(vm.barangH);
          vm.calculateBarang(vm.barangI);
          vm.calculateBarang(vm.barangJ);
          vm.calculateBarang(vm.barangK);
          vm.calculateBarang(vm.barangL);
          vm.calculateBarang(vm.barangM);
          vm.calculateBarang(vm.barangN);
          vm.calculateBarang(vm.barangO);
          vm.calculateBarang(vm.barangP);
          vm.calculateBarang(vm.barangQ);
          vm.calculateBarang(vm.barangR);
          vm.calculateBarang(vm.barangS);
          vm.calculateBarang(vm.barangT);

          for(var i = 0; i < vm.barangA.length; i++) {
            vm.belanjaBarang.push(vm.barangA[i]);
          }
          for(var i = 0; i < vm.barangB.length; i++) {
            vm.belanjaBarang.push(vm.barangB[i]);
          }
          for(var i = 0; i < vm.barangC.length; i++) {
            vm.belanjaBarang.push(vm.barangC[i]);
          }
          for(var i = 0; i < vm.barangD.length; i++) {
            vm.belanjaBarang.push(vm.barangD[i]);
          }
          for(var i = 0; i < vm.barangE.length; i++) {
            vm.belanjaBarang.push(vm.barangE[i]);
          }
          for(var i = 0; i < vm.barangF.length; i++) {
            vm.belanjaBarang.push(vm.barangF[i]);
          }
          for(var i = 0; i < vm.barangG.length; i++) {
            vm.belanjaBarang.push(vm.barangG[i]);
          }
          for(var i = 0; i < vm.barangH.length; i++) {
            vm.belanjaBarang.push(vm.barangH[i]);
          }
          for(var i = 0; i < vm.barangI.length; i++) {
            vm.belanjaBarang.push(vm.barangI[i]);
          }
          for(var i = 0; i < vm.barangJ.length; i++) {
            vm.belanjaBarang.push(vm.barangJ[i]);
          }
          for(var i = 0; i < vm.barangK.length; i++) {
            vm.belanjaBarang.push(vm.barangK[i]);
          }
          for(var i = 0; i < vm.barangL.length; i++) {
            vm.belanjaBarang.push(vm.barangL[i]);
          }
          for(var i = 0; i < vm.barangM.length; i++) {
            vm.belanjaBarang.push(vm.barangM[i]);
          }
          for(var i = 0; i < vm.barangN.length; i++) {
            vm.belanjaBarang.push(vm.barangN[i]);
          }
          for(var i = 0; i < vm.barangO.length; i++) {
            vm.belanjaBarang.push(vm.barangO[i]);
          }
          for(var i = 0; i < vm.barangP.length; i++) {
            vm.belanjaBarang.push(vm.barangP[i]);
          }
          for(var i = 0; i < vm.barangQ.length; i++) {
            vm.belanjaBarang.push(vm.barangQ[i]);
          }
          for(var i = 0; i < vm.barangR.length; i++) {
            vm.belanjaBarang.push(vm.barangR[i]);
          }
          for(var i = 0; i < vm.barangS.length; i++) {
            vm.belanjaBarang.push(vm.barangS[i]);
          }
          for(var i = 0; i < vm.barangT.length; i++) {
            vm.belanjaBarang.push(vm.barangT[i]);
          }
        }
      };
      reader.readAsArrayBuffer(f);

      this.axios.post(address + ':3000/import-csv', {})
      .then((response) => {
        console.log(response);
      });
    },
    checkUploadType(file) {
      if(file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        this.importXls(file);
      }
    },

    fetchReport() {
      var id = this.$session.get('user').user_id;
      this.axios.get(address + ":3000/get-report", headers).then((response) => {
        let query = gql.allReport;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.reports.length; i++) {
            if(result.reports[i].user_id == id) {
              this.reports.push(result.reports[i]);
            }
          }
          this.fetchNeraca();
        });
      })
    },
    addReport() {
      let postObj = {
        user_id: this.$session.get('user').user_id,
        year: this.reports[0]["Tahun"],
        term: this.reports[0]["Termin"],
        report_type: this.reports[0]["Tipe Laporan"],
        currency: this.reports[0]["Mata Uang"],
        rate: this.reports[0]["Kurs"],
        approved: 0,
        flagged_for_deletion: 0
      };
      this.axios.post(address + ':3000/add-report', postObj, headers)
      .then((response) => {
        let query = gql.addReport;
        postObj.report_id = response.data.insertId;
        let variables = {
          input: postObj
        }
        graphqlFunction.graphqlMutation(query, variables, (result) => {
          this.balances = this.balances.concat(this.calculated_balance);
          this.profit_losses = this.profit_losses.concat(this.calculated_profit_loss);
          this.national_incomes = this.national_incomes.concat(this.calculated_national_income);
          this.cashflows = this.cashflows.concat(this.calculated_cashflow);
          this.budgets = this.budgets.concat(this.calculated_budget);
          this.costofgoods = this.costofgoods.concat(this.calculated_costofgood);
          this.addNeraca(postObj.report_id);
          this.addLabaRugi(postObj.report_id);
          this.addPenerimaanNegara(postObj.report_id);
          this.addArusKas(postObj.report_id);
          this.addAsumsiKeuangan(postObj.report_id);
          this.addAnggaranBelanja(postObj.report_id);
          this.addHPP(postObj.report_id);
          this.addSumberPembiayaan(postObj.report_id);
          this.addInvestasi(postObj.report_id);
          this.addKeuanganLainnya(postObj.report_id);
        });
      });
    },
    fetchNeraca() {
      var id = this.$session.get('user').user_id;
      var lastReport = this.reports[this.reports.length-1];
      this.axios.get(address + ":3000/get-neraca", headers).then((response) => {
        let query = gql.allBalance;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.balances.length; i++) {
            if(result.balances[i].report_id == lastReport.report_id) {
              this.balances.push({
                'balance_id': result.balances[i].balance_id,
                'report_id': result.balances[i].report_id,
                'Kategori': result.balances[i].category,
                'Sub-Kategori': result.balances[i].sub_category,
                'Uraian': result.balances[i].detail,
                'Nilai': result.balances[i].value,
              });
            }
          }
        });
      })
    },
    calculateNeraca(balances) {
      var jumlahAktivaLancar = 0;
      var jumlahAktivaTidakLancar = 0;
      var jumlahKewajibanJangkaPendek = 0;
      var jumlahKewajibanJangkaPanjang = 0;
      var jumlahEkuitas = 0;
      for(var i = 0; i < balances.length; i++) {
        if(balances[i]["Uraian"] == "Kas dan Bank" || 
          balances[i]["Uraian"] == "Piutang Usaha" || 
          balances[i]["Uraian"] == "Pajak dibayar dimuka" || 
          balances[i]["Uraian"] == "Piutang lain-lain dan biaya dibayar dimuka" || 
          balances[i]["Uraian"] == "Persediaan") {
          jumlahAktivaLancar += balances[i]["Nilai"];
        }
        if(balances[i]["Uraian"] == "Aktiva Tetap" ||
          balances[i]["Uraian"] == "Aktiva Eksplorasi" ||
          balances[i]["Uraian"] == "Beban ditangguhkan" ||
          balances[i]["Uraian"] == "Amortisasi" || 
          balances[i]["Uraian"] =="Depresiasi") {
          jumlahAktivaTidakLancar += balances[i]["Nilai"];
        }
        if((balances[i]["Uraian"] == "Hutang Usaha" || 
          balances[i]["Uraian"] == "Hutang Bank" || 
          balances[i]["Uraian"] == "Hutang Akrual" || 
          balances[i]["Uraian"] == "Hutang Afiliasi" || 
          balances[i]["Uraian"] == "Hutang Pajak" || 
          balances[i]["Uraian"] == "Hutang lain-lain") &&
          balances[i]["Sub-Kategori"] == "Kewajiban Jangka Pendek") {
          jumlahKewajibanJangkaPendek += balances[i]["Nilai"];
        }
        if((balances[i]["Uraian"] == "Hutang Bank" || 
          balances[i]["Uraian"] == "Hutang Pajak" || 
          balances[i]["Uraian"] == "Hutang Leasing" || 
          balances[i]["Uraian"] == "Hutang Afiliasi" || 
          balances[i]["Uraian"] == "Provisi Reklamasi dan Pasca Tambang" || 
          balances[i]["Uraian"] == "Hutang lain-lain") &&
          balances[i]["Sub-Kategori"] == "Kewajiban Jangka Panjang") {
          jumlahKewajibanJangkaPanjang += balances[i]["Nilai"];
        }
        if(balances[i]["Uraian"] == "Modal Yang Disetor" ||
          balances[i]["Uraian"] == "Laba (rugi) ditahan" ||
          balances[i]["Uraian"] == "Lain-lain") {
          jumlahEkuitas += balances[i]["Nilai"];
        }
      }
      var jumlahAktiva = jumlahAktivaLancar + jumlahAktivaTidakLancar;
      var jumlahKewajiban = jumlahKewajibanJangkaPendek + jumlahKewajibanJangkaPanjang;
      var jumlahKewajibanDanEkuitas = jumlahKewajiban + jumlahEkuitas;

      this.calculated_balance.push({
          'Kategori': 'NERACA',
          'Sub-Kategori': 'Aktiva Lancar',
          'Uraian': 'Jumlah Aktiva Lancar',
          'Nilai': jumlahAktivaLancar 
        }, {
          'Kategori': 'NERACA',
          'Sub-Kategori': 'Aktiva Tidak Lancar',
          'Uraian': 'Jumlah Aktiva Tidak Lancar',
          'Nilai': jumlahAktivaTidakLancar 
        }, {
          'Kategori': 'NERACA',
          'Sub-Kategori': '-',
          'Uraian': 'Jumlah Aktiva',
          'Nilai': jumlahAktiva 
        }, {
          'Kategori': 'HUTANG DAN MODAL',
          'Sub-Kategori': 'Kewajiban Jangka Pendek',
          'Uraian': 'Jumlah Kewajiban Jangka Pendek',
          'Nilai': jumlahKewajibanJangkaPendek 
        }, {
          'Kategori': 'HUTANG DAN MODAL',
          'Sub-Kategori': 'Kewajiban Jangka Panjang',
          'Uraian': 'Jumlah Kewajiban Jangka Panjang',
          'Nilai': jumlahKewajibanJangkaPanjang
        }, {
          'Kategori': 'HUTANG DAN MODAL',
          'Sub-Kategori': '-',
          'Uraian': 'Jumlah Kewajiban',
          'Nilai': jumlahKewajiban
        }, {
          'Kategori': 'HUTANG DAN MODAL',
          'Sub-Kategori': 'Modal Saham',
          'Uraian': 'Jumlah Ekuitas',
          'Nilai': jumlahEkuitas
        }, {
          'Kategori': 'HUTANG DAN MODAL',
          'Sub-Kategori': '-',
          'Uraian': 'Jumlah Kewajiban dan Ekuitas',
          'Nilai': jumlahKewajibanDanEkuitas
        }
      );
    },
    addNeraca(report_id) {
      for(var i = 0; i < this.balances.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.balances[i]["Uraian"],
          value: this.balances[i]["Nilai"],
          category: this.balances[i]["Kategori"],
          sub_category: this.balances[i]["Sub-Kategori"],
        };
        this.axios.post(address + ':3000/add-neraca', postObj, headers)
        .then((response) => {
          let query = gql.addBalance;
          postObj.balance_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });    
      }
    },
    calculateLabaRugi(profit_losses) {
      var jumlahBebanOperasi = 0;
      var jumlahPendapatanLainLain = 0;
      for(var i = 0; i < profit_losses.length; i++) {
        if(profit_losses[i]["Uraian"] == "Penjualan") {
          var penjualan = profit_losses[i]["Nilai"];
        }
        if(profit_losses[i]["Uraian"] == "Royalti") {
          var royalti = profit_losses[i]["Nilai"];
        }
        if(profit_losses[i]["Uraian"] == "Harga Pokok Penjualan") {
          var hpp = profit_losses[i]["Nilai"];
        }
        if(profit_losses[i]["Uraian"] == "Beban Penjualan" ||
          profit_losses[i]["Uraian"] == "Beban Umum" ||
          profit_losses[i]["Uraian"] == "Beban Lain-Lain") {
          jumlahBebanOperasi += profit_losses[i]["Nilai"];
        }
        if(profit_losses[i]["Uraian"] == "Beban Bunga" || 
          profit_losses[i]["Uraian"] == "Laba Selisih Kurs" || 
          profit_losses[i]["Uraian"] == "Pendapatan Bunga" || 
          profit_losses[i]["Uraian"] == "Beban Lain-Lain" || 
          profit_losses[i]["Uraian"] == "Rugi Selisih Kurs, Bersih") {
          jumlahPendapatanLainLain += profit_losses[i]["Nilai"];
        }
        if(profit_losses[i]["Uraian"] == "Biaya Pajak Penghasilan") {
          var biayaPajakPenghasilan = profit_losses[i]["Nilai"];
        }
      }
      var labaRugiKotor = penjualan - royalti - hpp;
      var labaRugiOperasi = labaRugiKotor - jumlahBebanOperasi;
      var labaRugiSebelumPajak = labaRugiOperasi + jumlahPendapatanLainLain;
      var labaRugiBersih = labaRugiSebelumPajak - biayaPajakPenghasilan;

      this.calculated_profit_loss.push({
          'Kategori': 'PENDAPATAN',
          'Uraian': 'Laba Rugi Kotor',
          'Nilai': labaRugiKotor 
        }, {
          'Kategori': 'BEBAN OPERASI',
          'Uraian': 'Jumlah Beban Operasi',
          'Nilai': jumlahBebanOperasi 
        }, {
          'Kategori': 'BEBAN OPERASI',
          'Uraian': 'Laba Rugi Operasi',
          'Nilai': labaRugiOperasi 
        }, {
          'Kategori': 'PENDAPATAN/(BEBAN) LAIN-LAIN',
          'Uraian': 'Jumlah Pendapatan Lain Lain',
          'Nilai': jumlahPendapatanLainLain 
        }, {
          'Kategori': 'PENDAPATAN/(BEBAN) LAIN-LAIN',
          'Uraian': 'Laba Rugi Sebelum Pajak',
          'Nilai': labaRugiSebelumPajak 
        }, {
          'Kategori': 'PENDAPATAN/(BEBAN) LAIN-LAIN',
          'Uraian': 'Laba Rugi Bersih',
          'Nilai': labaRugiBersih 
        }
      );
    },
    addLabaRugi(report_id) {
      for(var i = 0; i < this.profit_losses.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.profit_losses[i]["Uraian"],
          value: this.profit_losses[i]["Nilai"],
          category: this.profit_losses[i]["Kategori"]
        };
        this.axios.post(address + ':3000/add-laba-rugi', postObj, headers)
        .then((response) => {
          let query = gql.addProfitLoss;
          postObj.profit_loss_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    calculatePenerimaanNegara(national_incomes) {
      var jumlahPajak = 0;
      var jumlahNonPajak = 0;
      for(var i = 0; i < national_incomes.length; i++) {
        if(national_incomes[i]["Uraian"] == "PPH Pasal 21" || 
          national_incomes[i]["Uraian"] == "PPH Pasal 22" || 
          national_incomes[i]["Uraian"] == "PPH Pasal 23/26" || 
          national_incomes[i]["Uraian"] == "PPH Pasal 25" || 
          national_incomes[i]["Uraian"] == "PPH Pasal 29" || 
          national_incomes[i]["Uraian"] == "PPN Masukan" || 
          national_incomes[i]["Uraian"] == "PPN Keluaran" || 
          national_incomes[i]["Uraian"] == "Pajak-pajak daerah" || 
          national_incomes[i]["Uraian"] == "Lumpsum Payment") {
          jumlahPajak += national_incomes[i]["Nilai"];
        }

        if(national_incomes[i]["Uraian"] == "Royalti" ||
          national_incomes[i]["Uraian"] == "Deadrent" ||
          national_incomes[i]["Uraian"] == "SPW3D" ||
          national_incomes[i]["Uraian"] == "Advance Payment" ||
          national_incomes[i]["Uraian"] == "BBN") {
          jumlahNonPajak += national_incomes[i]["Nilai"];
        }
      }
      var jumlahPenerimaanNegara = jumlahPajak + jumlahNonPajak;

      this.calculated_national_income.push({
          'Kategori': 'PAJAK',
          'Uraian': 'Jumlah Pajak',
          'Nilai': jumlahPajak 
        }, {
          'Kategori': 'NON PAJAK',
          'Uraian': 'Jumlah Non Pajak',
          'Nilai': jumlahNonPajak 
        }, {
          'Kategori': '-',
          'Uraian': 'Jumlah Penerimaan Negara',
          'Nilai': jumlahPenerimaanNegara 
        }
      );
    },
    addPenerimaanNegara(report_id) {
      for(var i = 0; i < this.national_incomes.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.national_incomes[i]["Uraian"],
          value: this.national_incomes[i]["Nilai"],
          category: this.national_incomes[i]["Kategori"]
        };
        this.axios.post(address + ':3000/add-penerimaan-negara', postObj, headers)
        .then((response) => {
          let query = gql.addNationalIncome;
          postObj.national_income_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    calculateArusKas(cashflows) {
      var arusKasNettoDigunakanUntukAktivitasOperasi = 0;
      var arusKasNettoYangDigunakanUntukAktivitasInvestasi = 0;
      var arusKasNettoYangDigunakanUntukAktivitasPendanaan = 0;
      var labaRugiBersihTahunBerjalan = 0; //ambil dari laba rugi
      for(var i = 0; i < cashflows.length; i++) {
        if(cashflows[i]["Kategori"] == "AKTIVITAS OPERASI") {
          arusKasNettoDigunakanUntukAktivitasOperasi += cashflows[i]["Nilai"];
        }

        if(cashflows[i]["Kategori"] == "AKTIVITAS INVESTASI") {
          arusKasNettoYangDigunakanUntukAktivitasInvestasi += cashflows[i]["Nilai"];
        }

        if(cashflows[i]["Kategori"] == "AKTIVITAS PENDANAAN") {
          arusKasNettoYangDigunakanUntukAktivitasPendanaan += cashflows[i]["Nilai"];
        }
      }
      var kenaikanPenurunanNettoKasDanBank = 
          arusKasNettoDigunakanUntukAktivitasOperasi + 
          arusKasNettoYangDigunakanUntukAktivitasInvestasi + 
          arusKasNettoYangDigunakanUntukAktivitasPendanaan + 
          labaRugiBersihTahunBerjalan;

      this.calculated_cashflow.push({
          'Kategori': 'AKTIVITAS OPERASI',
          'Uraian': 'Arus Kas Netto digunakan untuk Aktivitas Operasi',
          'Nilai': arusKasNettoDigunakanUntukAktivitasOperasi 
        }, {
          'Kategori': 'AKTIVITAS INVESTASI',
          'Uraian': 'Arus Kas Netto yang digunakan untuk aktivitas Investasi',
          'Nilai': arusKasNettoYangDigunakanUntukAktivitasInvestasi 
        }, {
          'Kategori': 'AKTIVITAS PENDANAAN',
          'Uraian': 'Arus Kas Netto Yang Digunakan Untuk Aktivitas Pendanaan',
          'Nilai': arusKasNettoYangDigunakanUntukAktivitasPendanaan 
        }, {
          'Kategori': '-',
          'Uraian': 'Laba / Rugi Bersih Tahun Berjalan',
          'Nilai': labaRugiBersihTahunBerjalan 
        }, {
          'Kategori': '-',
          'Uraian': 'Kenaikan / Penurunan Netto Kas dan Bank',
          'Nilai': kenaikanPenurunanNettoKasDanBank 
        }
      );
    },
    addArusKas(report_id) {
      for(var i = 0; i < this.cashflows.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.cashflows[i]["Uraian"],
          value: this.cashflows[i]["Nilai"],
          category: this.cashflows[i]["Kategori"]
        };
        this.axios.post(address + ':3000/add-arus-kas', postObj, headers)
        .then((response) => {
          let query = gql.addCashflow;
          postObj.cashflow_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    addAsumsiKeuangan(report_id) {
      for(var i = 0; i < this.assumptions.length; i++) {
        let postObj = {
          report_id: report_id,
          currency: this.assumptions[i]["Mata Uang"],
          unit_rate: 1,
          detail: this.assumptions[i]["Uraian"],
          volume_unit: this.assumptions[i]["Satuan"],
          volume_value: this.assumptions[i]["Volume"],
          price_value: this.assumptions[i]["Harga Jual"],
          cutoff_grade_value: this.assumptions[i]["Cut Off Grade Nilai"],
          cutoff_grade_unit: this.assumptions[i]["Cut Off Grade Satuan"],
        };
        this.axios.post(address + ':3000/add-asumsi-keuangan', postObj, headers)
        .then((response) => {
          let query = gql.addAssumption;
          postObj.assumption_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    calculateAnggaranBelanja(budgets) {
      var jumlahAnggaranBelanja = 0;

      for(var i = 0; i < budgets.length; i++) {
        jumlahAnggaranBelanja += budgets[i]["Nilai"];
      }

      this.calculated_budget.push({
          'Kategori': '-',
          'Uraian': 'Jumlah Anggaran Belanja',
          'Nilai': jumlahAnggaranBelanja 
        }
      );
    },
    addAnggaranBelanja(report_id) {
      for(var i = 0; i < this.budgets.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.budgets[i]["Uraian"],
          value: this.budgets[i]["Nilai"],
          category: this.budgets[i]["Kategori"]
        };
        this.axios.post(address + ':3000/add-anggaran-belanja', postObj, headers)
        .then((response) => {
          let query = gql.addBudget;
          postObj.budget_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    calculateHPP(costofgoods) {
      var temp = 0;

      for(var i = 0; i < costofgoods.length; i++) {
        if(costofgoods[i]["Uraian"] != "Persediaan Awal" && costofgoods[i]["Uraian"] != "Persediaan Akhir") {
          temp += costofgoods[i]["Nilai"];
        }
        if(costofgoods[i]["Uraian"] != "Persediaan Awal") {
          var persediaanAwal = costofgoods[i]["Nilai"];
        }
        if(costofgoods[i]["Uraian"] != "Persediaan Akhir") {
          var persediaanAkhir = costofgoods[i]["Nilai"];
        }
      }

      var totalPersediaan = persediaanAwal - persediaanAkhir;
      var totalHPP = temp + totalPersediaan;

      this.calculated_costofgood.push({
          'Uraian': 'Total Persediaan',
          'Nilai': totalPersediaan 
        }, {
          'Uraian': 'Total HPP',
          'Nilai': totalHPP 
        }
      );
    },
    addHPP(report_id) {
      for(var i = 0; i < this.costofgoods.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.costofgoods[i]["Uraian"],
          value: this.costofgoods[i]["Nilai"]
        };
        this.axios.post(address + ':3000/add-harga-pokok', postObj, headers)
        .then((response) => {
          let query = gql.addCostofgood;
          postObj.costofgood_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    addSumberPembiayaan(report_id) {
      for(var i = 0; i < this.source_of_financings.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.source_of_financings[i]["Uraian"],
          value: this.source_of_financings[i]["Nilai"]
        };
        this.axios.post(address + ':3000/add-sumber-pembiayaan', postObj, headers)
        .then((response) => {
          let query = gql.addSourceOfFinancing;
          postObj.source_of_financing_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    addInvestasi(report_id) {
      for(var i = 0; i < this.investments.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.investments[i]["Uraian"],
          value: this.investments[i]["Nilai"]
        };
        this.axios.post(address + ':3000/add-investasi', postObj, headers)
        .then((response) => {
          let query = gql.addInvestment;
          postObj.investment_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    addKeuanganLainnya(report_id) {
      for(var i = 0; i < this.other_finances.length; i++) {
        let postObj = {
          report_id: report_id,
          detail: this.other_finances[i]["Uraian"],
          value: this.other_finances[i]["Nilai"]
        };
        this.axios.post(address + ':3000/add-keuangan-lainnya', postObj, headers)
        .then((response) => {
          let query = gql.addOtherFinance;
          postObj.other_finance_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            
          });
        });
      }
    },
    fetchReportBarang() {
      var id = this.$session.get('user').user_id;
      this.axios.get(address + ":3000/get-report-barang", headers).then((response) => {
        let query = gql.allReportProcurement;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.report_procurements.length; i++) {
            if(result.report_procurements[i].user_id == id) {
              this.report_procurements.push(result.report_procurements[i]);
            }
          }
        });
      })
    },
    addReportBarang() {
      let postObj = {
        user_id: this.$session.get('user').user_id,
        year: this.report_procurements[0]["Tahun"],
        term: this.report_procurements[0]["Termin"],
        report_type: this.reports[0]["Tipe Laporan"],
        approved: 0,
        flagged_for_deletion: 0
      };
      this.axios.post(address + ':3000/add-report-barang', postObj, headers)
      .then((response) => {
        let query = gql.addReportProcurement;
        postObj.report_procurement_id = response.data.insertId;
        let variables = {
          input: postObj
        }
        graphqlFunction.graphqlMutation(query, variables, (result) => {
          this.addBelanjaBarang(postObj.report_procurement_id);
        });
      });
    },
    addBelanjaBarang(report_procurement_id) {
      for(var i = 0; i < this.belanjaBarang.length; i++) {
        let postObj = {
          detail: this.belanjaBarang[i]["Jenis Barang"],
          specification: this.belanjaBarang[i]["Spesifikasi"],
          project_area: this.belanjaBarang[i]["Area Project"],
          tkdn: this.belanjaBarang[i]["Bobot Tertimbang (%)"],
          report_procurement_id: report_procurement_id,
          country_of_origin: this.belanjaBarang[i]["Negara"],
          province_of_origin: this.belanjaBarang[i]["Provinsi"],
          district_of_origin: this.belanjaBarang[i]["Kabupaten"],
          city_of_origin: this.belanjaBarang[i]["Nasional"],
          qty: this.belanjaBarang[i]["Kuantitas"],
          category: this.belanjaBarang[i]["Kategori"],
          unit_price: this.belanjaBarang[i]["Total Price (US$)"],
        };
        this.axios.post(address + ':3000/add-belanja-barang', postObj, headers)
        .then((response) => {
          let query = gql.addProcurement;
          postObj.procurements_id = response.data.insertId;
          let variables = {
            input: postObj
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            // console.log(result);
          });
        });    
      }
    },
    spliceArray(spliceFile) {
      for(var i = 0; i < spliceFile.length; i++) {
        if(!spliceFile[i].hasOwnProperty('No.')) {
          spliceFile.splice(i, 1);
        }
      }
    },
    normalizeCategory(normalizeFile) {
      var category = normalizeFile[0]['Kategori'];
      var sub = normalizeFile[0]['Sub-Kategori'];
      for(var i = 0; i < normalizeFile.length; i++) {
        if(!normalizeFile[i]['Kategori']) {
          normalizeFile[i]['Kategori'] = category;
        }
        else {
          category = normalizeFile[i]['Kategori'];
        }
        if(!normalizeFile[i]['Sub-Kategori']) {
          normalizeFile[i]['Sub-Kategori'] = sub;
        }
        else {
          sub = normalizeFile[i]['Sub-Kategori'];
        }
      }
    },
    normalizeCategoryBarang(normalizeFile) {
      var category = normalizeFile[0]['Kategori'];
      var jenisBarang = normalizeFile[0]['Jenis Barang'];
      for(var i = 0; i < normalizeFile.length; i++) {
        if(!normalizeFile[i]['Kategori']) {
          normalizeFile[i]['Kategori'] = category;
        }
        else {
          category = normalizeFile[i]['Kategori'];
        }

        if(!normalizeFile[i]['Jenis Barang']) {
          normalizeFile[i]['Jenis Barang'] = "Total";
        }
      }
      normalizeFile.splice(0, 1)
    },
    calculateBarang(file) {
      var totalKuantitas = 0;
      var totalCif = 0;
      var totalOnSite = 0;
      var totalBobot = 0;
      var totalPrice = 0;
      for(var i = 0; i < file.length-1; i++) {
        totalKuantitas += file[i]["Kuantitas"];
        if(file[i]["Cost, Insurance, & Freight"]) {
          totalCif += file[i]["Cost, Insurance, & Freight"];
          file[i]["Total Price (US$)"] = file[i]["Cost, Insurance, & Freight"] * file[i]["Kuantitas"]; 
          totalPrice += file[i]["Total Price (US$)"];
        }
        else if(file[i]["On Site"]) {
          totalOnSite += file[i]["On Site"];
          file[i]["Total Price (US$)"] = file[i]["On Site"] * file[i]["Kuantitas"];
          totalPrice += file[i]["Total Price (US$)"];
        }
      }

      file[file.length-1]["Kuantitas"] = totalKuantitas;
      file[file.length-1]["Cost, Insurance, & Freight"] = totalCif;
      file[file.length-1]["On Site"] = totalOnSite;
      file[file.length-1]["Total Price (US$)"] = totalPrice;

      for(var i = 0; i < file.length-1; i++) {
        if(file[i]["Area Project"]) {
          file[i]["Bobot Tertimbang (%)"] = file[i]["Total Price (US$)"] / file[file.length-1]["Total Price (US$)"] * file[i]["Area Project"];
        }
        else if(file[i]["Self Assessment"]) {
          file[i]["Bobot Tertimbang (%)"] = file[i]["Total Price (US$)"] / file[file.length-1]["Total Price (US$)"] * file[i]["Self Assessment"];
        }
        totalBobot += file[i]["Bobot Tertimbang (%)"];
      }

      file[file.length-1]["Bobot Tertimbang (%)"] = totalBobot;
    }
  },
};
</script>

<style scoped>
img{
  width: 4.5rem;
}

.vue-dropzone{
  border:2px dashed #b7b7b7;
  background-color:rgba(255,255,255,0.6);
  margin-top:3px;
  color:#6d8671;
}
</style>
