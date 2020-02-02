<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail(
          :companyName= 'user.username',
          :permission= 'user.company_permission',
          :address= 'user.address',
          :email= 'user.email',
          :npwp= 'user.npwp',
        )
      .col-md-7
        h4.font-weight-bold.text-center Daftar Laporan Keuangan
        report( :rows='reportFinances' :link='userName' )
        router-link.mb-5(:to="{name : 'view-report-finance'}").btn.btn-sm.btn-primary.w-100
          | Lihat Semua Laporan
        h4.font-weight-bold.text-center Daftar Laporan Belanja Barang
        report( :rows='reportGoods' :link='userName' )
        router-link.mb-5(:to="{name : 'view-report-good'}").btn.btn-sm.btn-primary.w-100
          | Lihat Semua Laporan
</template>

<script>
import gql from 'graphql-tag';

import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Commodity from '@/components/widgets/profile/admin/Commodity.vue';
import Report from '@/components/widgets/profile/Report.vue';

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
      query: gql`query User($username: String!){
        user(where:{username:$username}){
          username
          role
          commodity
          company_type
          company_name
          npwp
          wiup
          email
          address
          company_permission
        }
      }`,
      variables() {
        return {
          username: this.$route.params.userName,
        };
      },
    },
  },
  data() {
    return {
      userName: 'rendra',
    };
  },
  components: {
    ProfileDetail,
    Commodity,
    Report,
  },
  mounted() {
  },
  methods: {
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
