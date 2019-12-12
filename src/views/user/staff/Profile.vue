<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail( :userName='userName')
      .col-md-7
        commodity.mb-4
        report
</template>

<script>
import ProfileDetail from '@/components/widgets/profile/Detail.vue';
import Commodity from '@/components/widgets/profile/admin/Commodity.vue';
import Report from '@/components/widgets/profile/admin/Report.vue';

export default {
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
