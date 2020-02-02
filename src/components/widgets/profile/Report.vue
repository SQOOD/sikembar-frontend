<template lang="pug">
#report
  vue-good-table(:columns='columns' :rows='rows').mb-3
    template(slot='table-row' slot-scope='props')
      span(v-if='props.column.label == "Aksi"')
        router-link.btn.btn-sm.btn-info(
          :to="{ name: 'view-report' , params: { reportID: props.row.id }  }"
          )
          font-awesome-icon(:icon='["fas", "file-alt"]')
          | Periksa
</template>

<script>
export default {
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
  props: {
    rows: Array,
    link: String,
  },
  methods: {
    fieldFN(reportFinances) {
      return `${reportFinances.user.company_type}. ${reportFinances.user.company_name}`;
    },
  },
};
</script>
