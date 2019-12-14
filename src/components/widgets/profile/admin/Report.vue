<template lang="pug">
#report
  vue-good-table(:columns='columns' :rows='rows').mb-3
    template(slot='table-row' slot-scope='props')
      span(v-if='props.column.field == "check"')
        router-link.btn.btn-sm.btn-info(:to='"/report-keuangan/" + props.row.id')
          font-awesome-icon(:icon='["fas", "file-alt"]')
          | Periksa Laporan
  router-link(to='#').btn.btn-sm.btn-primary.w-100 Lihat Semua Laporan
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
      reports: [],
      columns: [
        {
          label: 'Laporan',
          field: 'id',
        },
        {
          label: 'Perusahaan',
          field: 'company',
        },
        {
          label: 'Tanggal Unggah',
          field: 'sentAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM-dd-yyyy',
        },
        {
          label: 'Cek Laporan',
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
    this.fetchReport();
  },
  methods: {
    fetchReport() {
      this.axios.get(address + ":3000/get-user", headers).then((response) => {
        let query = gql.allUser;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          this.users = result.users;
          this.axios.get(address + ":3000/get-report", headers).then((response) => {
            let query = gql.allReport;
            graphqlFunction.graphqlFetchAll(query, (result) => {
              for(var i = 0; i < result.reports.length; i++) {
                for(var j = 0; j < this.users.length; j++) {
                  if(result.reports[i].user_id == this.users[j].user_id) {
                    var company = this.users[j].fullname;
                  }
                }
                if(result.reports[i].approved == 0) {
                  this.rows.push({
                    id: result.reports[i].report_id,
                    company: company,
                    sentAt: basicFunction.getDate().year + '-' + basicFunction.getDate().month + '-' + basicFunction.getDate().date
                  });
                }
              }
            });
          })
        });
      })
    },
  },
};
</script>
