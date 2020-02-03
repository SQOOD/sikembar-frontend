<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail( v-if='user'
          :companyName= 'user.username',
          :permission= 'user.company_permission',
          :email= 'user.email',
        )
        span( v-else ) Loading ...
      .col-md-7
        section(v-if='reportFinances')
          h4.font-weight-bold.text-center Daftar Laporan Keuangan
          vue-good-table(:columns='columns' :rows='reportFinances').mb-3
            template(slot='table-row' slot-scope='props')
              span(v-if='props.column.label == "Aksi"')
                router-link.btn.btn-sm.btn-info(
                  :to="{ name: 'view-report-finance' , params: { reportID: props.row.id }  }"
                  )
                  font-awesome-icon(:icon='["fas", "file-alt"]')
                  | Periksa
          router-link.mb-5(:to="{name : 'view-report-finances'}").btn.btn-sm.btn-primary.w-100
            | Lihat Semua Laporan
        span( v-else ) Loading ...
        section(v-if='reportGoods')
          h4.font-weight-bold.text-center Daftar Laporan Belanja Barang
          vue-good-table(:columns='columns' :rows='reportGoods').mb-3
            template(slot='table-row' slot-scope='props')
              span(v-if='props.column.label == "Aksi"')
                router-link.btn.btn-sm.btn-info(
                  :to="{ name: 'view-report-good' , params: { reportID: props.row.id }  }"
                  )
                  font-awesome-icon(:icon='["fas", "file-alt"]')
                  | Periksa
          router-link.mb-5(:to="{name : 'view-report-goods'}").btn.btn-sm.btn-primary.w-100
            | Lihat Semua Laporan
        span( v-else ) Loading ...
</template>

<script>
import gql from 'graphql-tag';

import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Commodity from '@/components/widgets/profile/admin/Commodity.vue';

export default {
  apollo: {
    reportFinances: {
      query: gql`query reportFinances{
        reportFinances(where:{approved:{not:true}}, first: 5){
          id
          user{
            company_name
            company_type
          }
          createdAt
        }
      }`,
    },
    reportGoods: {
      query: gql`query reportGoods{
        reportGoods(where:{approved:{not:true}}, first: 5){
          id
          user{
            company_name
            company_type
          }
          createdAt
        }
      }`,
    },
    user: {
      query: gql`query user($username: String!){
        user(where:{username:$username}){
          username
          company_name
          company_permission
        }
      }`,
      variables() {
        return {
          username: this.username,
        };
      },
    },
  },
  data() {
    return {
      username: this.$route.params.username,
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
  components: {
    ProfileDetail,
    Commodity,
  },
  methods: {
    fieldFN(x) {
      return `${x.user.company_type}. ${x.user.company_name}`;
    },
  },
  created() {
    this.$forceUpdate();
  },
};
</script>

<style scoped>
img{
  width: 4.5rem;
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
