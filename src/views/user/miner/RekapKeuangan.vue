<template>
  <div>
    <neraca></neraca>
    <laba-rugi></laba-rugi>
    <penerimaan-negara></penerimaan-negara>
  </div>
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import address from '@/address';
import headers from '@/headers';
import colors from '@/utils/colors';
import Chart from '@/utils/chart';
import PivotTable from '@marketconnect/vue-pivot-table';
import Neraca from '@/views/user/miner/Neraca.vue';
import LabaRugi from '@/views/user/miner/LabaRugi.vue';
import PenerimaanNegara from '@/views/user/miner/PenerimaanNegara.vue';

export default {
  components: { 
    PivotTable,
    Neraca,
    LabaRugi,
    PenerimaanNegara
  },
};
</script>
