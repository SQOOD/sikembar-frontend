<template lang="pug">
  div
    vue-good-table(:columns='columns' :rows='rows').mb-3
      template(slot='table-row' slot-scope='props')
        span(v-if='props.column.field == "check"')
          router-link.btn.btn-sm.btn-info(:to='"/report-keuangan/"')
            font-awesome-icon(:icon='["fas", "file-alt"]')
            | Periksa Barang
</template>

<script>
import gql from '@/gql';
import basicFunction from '@/basicFunction';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';
export default {
  data() {
    return {
      user: {},
      vendor: [],
      commerces: [],
      report_procurements: [],
      procurements: [],
      match_goods: [],
      columns: [
        {
          label: 'Nama Barang',
          field: 'name',
        },
        {
          label: 'Kuantitas',
          field: 'qty',
        },
        {
          label: 'Harga',
          field: 'price',
        },
        {
          label: 'Kategori',
          field: 'category',
        },
        {
          label: 'Spesifikasi',
          field: 'description',
        },
        {
          label: 'Negara Asal',
          field: 'country_of_origin',
        },
        {
          label: 'Vendor',
          field: 'vendor',
        },
        {
          label: 'Cek Belanja Barang',
          field: 'check',
        },
      ],
      rows: [
        // {
        //   id: 3213123123121, company: 'John', sentAt: '2019-12-30',
        // }
      ],
    };
  },
  mounted() {
    this.fetchVendor();
    var wiup = window.location.href.split("verifikasi-barang/")[1];
    this.axios.get(address + ":3000/get-user", headers).then((response) => {
      let query = gql.allUser;
      graphqlFunction.graphqlFetchAll(query, (result) => {
        for(var i = 0; i < result.users.length; i++) {
          if(result.users[i].username == wiup) {
            this.user = result.users[i];
          }
        }
        this.fetchItems(() => {
          this.fetchReportBarang(() => {
            this.fetchBelanjaBarang(() => {
              this.verificate();
            });
          });
        });
      });
    });
  },
  methods: {
    fetchItems(cb) {
      this.axios.get(address + ":3000/get-commerce", headers).then((response) => {
        let query = gql.allCommerce;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.commerces.length; i++) {
            result.commerces[i].price = basicFunction.numberWithCommas(result.commerces[i].price);
            this.commerces.push(result.commerces[i]);
          }
          if(cb)
            return cb();
        });
      });
    },
    fetchReportBarang(cb) {
      var id = this.user.user_id;
      this.axios.get(address + ":3000/get-report-barang", headers).then((response) => {
        let query = gql.allReportProcurement;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.report_procurements.length; i++) {
            if(result.report_procurements[i].user_id == id) {
              if(result.report_procurements[i].report_type == "Rencana") {
                this.report_procurements.push(result.report_procurements[i]);
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    fetchBelanjaBarang(cb) {
      this.axios.get(address + ":3000/get-belanja-barang", headers).then((response) => {
        let query = gql.allProcurement;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < this.report_procurements.length; i++) {
            for(var j = 0; j < result.procurements.length; j++) {
              if(this.report_procurements[i].report_procurement_id == result.procurements[j].report_procurement_id) {
                this.procurements.push(result.procurements[j]);
              }
            }
          }
          if(cb)
            return cb();
        });
      })
    },
    verificate() {
      for(var i = 0; i < this.procurements.length; i++) {
        if(this.procurements[i].country_of_origin != 'undefined') {
          for(var j = 0; j < this.commerces.length; j++) {
            var goods_1 = this.procurements[i].detail.toLowerCase().split(" ");
            var goods_2 = this.commerces[j].name.toLowerCase().split(" ");
            spelling_loop:
            for(var k = 0; k < goods_1.length; k++) {
              for(var l = 0; l < goods_2.length; l++) {
                if(goods_1[k] == goods_2[l]) {
                  for(var m = 0; m < this.vendor.length; m++) {
                    if(this.vendor[m].user_id == this.commerces[j].user_id) {
                      var vendor = this.vendor[m];
                    }
                  }
                  this.rows.push({
                    "name": this.procurements[i].detail,
                    "qty": this.procurements[i].qty,
                    "price": this.procurements[i].unit_price,
                    "category": this.procurements[i].category,
                    "description": this.procurements[i].description,
                    "country_of_origin": this.procurements[i].country_of_origin,
                    "vendor": vendor.fullname
                  });
                  break spelling_loop;
                }
              }
            }
          }   
        }
      }
    },
    fetchVendor() {
      this.axios.get(address + ":3000/get-user", headers).then((response) => {
        let query = gql.allUser;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.users.length; i++) {
            if(result.users[i].role == 'vendor') {
              this.vendor.push(result.users[i]);
            }
          }
        });
      });
    }
  },
};
</script>
