<template lang='pug'>
div
  vl-map.shadow-nohover(:load-tiles-while-animating='true'
  :load-tiles-while-interacting='true' style='height: 450px; border-bottom:#1A353D solid 2px')
    vl-view(:zoom.sync='zoom' :center.sync='center' :rotation.sync='rotation')
    vl-layer-tile#osm
      vl-source-osm
  .container.pt-3
    excel-alert
    .row
      .col-sm
        test-card( header='Asal Negara Impor Terbesar' )
      .col-sm
        test-card( header='Barang Impor Terbesar' )
      .col-sm
        test-card( header='Barang Impor Terbanyak' )
</template>

<script>
import ExcelAlert from '@/components/alerts/ExcelFile.vue';
import TestCard from '@/components/widgets/Card.vue';

export default {
  components: {
    ExcelAlert,
    TestCard,
  },
  data() {
    return {
      zoom: 4,
      center: [172.7610085227272, -31.988312375537454],
      rotation: 0,
    };
  },
};
</script>
