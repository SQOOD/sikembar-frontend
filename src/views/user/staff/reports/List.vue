<template lang="pug">
#report.container.mt-4
  h1 Daftar Laporan Belum Disetujui
  vue-good-table(:columns='columns' :rows='rows').mb-3
    template(slot='table-row' slot-scope='props')
      span(v-if='props.column.field == "check"')
        router-link.btn.btn-sm.btn-info(to='#')
          font-awesome-icon(:icon='["fas", "file-alt"]')
          | Periksa Laporan
</template>

<script>
export default {
  data() {
    return {
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
        {
          id: 3213123123121, company: 'John', sentAt: '2019-12-30',
        },
        {
          id: 5544514241232, company: 'Jane', sentAt: '2011-10-31',
        },
        {
          id: 3321312312312, company: 'Susan', sentAt: '2011-10-30',
        },
        {
          id: 222323123214, company: 'Chris', sentAt: '2011-10-11',
        },
        {
          id: 5321312321312, company: 'Dan', sentAt: '2011-10-21',
        },
      ],
    };
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
