<template lang="pug">
#report.container.mt-4
  h1 Daftar Laporan Belum Disetujui
  vue-good-table(:columns='columns' :rows='reportGoods').mb-3
    template(slot='table-row' slot-scope='props')
      span(v-if='props.column.label == "Aksi"')
        router-link.btn.btn-sm.btn-info(
          :to="{ name: 'view-report' , params: { reportID: props.row.id }  }"
        )
          font-awesome-icon(:icon='["fas", "file-alt"]')
          | Periksa Laporan
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    reportGoods: {
      query: gql`query reportGoods{
        reportGoods(where:{approved:{not:true}}){
          id
          user{
            company_name
            company_type
          }
          createdAt
        }
      }`,
    },
  },
  data() {
    return {
      columns: [
        {
          label: 'ID Laporan',
          field: 'id',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Perusahaan',
          field: this.fieldFN,
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Tanggal Unggah',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
          dateOutputFormat: 'MMM-dd-yyyy HH:mm',
          tdClass: 'text-center font-weight-bold',
        },
        {
          label: 'Aksi',
          field: 'id',
        },
      ],
    };
  },
  methods: {
    fieldFN(reportFinances) {
      return `${reportFinances.user.company_type}. ${reportFinances.user.company_name}`;
    },
  },
};
</script>

<style scoped>
  h1{
    color:#808080;
    font-size:1.3rem;
    font-weight:600;
  }

  /deep/ .vgt-table th{
    font-size:0.8rem;
    font-weight:600;
  }

  /deep/ .vgt-table td, a{
    font-size:0.8rem;
  }

  /deep/ .vgt-table td svg{
    margin-right: 0.3rem;
  }
</style>
