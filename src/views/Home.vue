<template lang='pug'>
div
  vl-map.shadow-nohover(:load-tiles-while-animating='true'
  :load-tiles-while-interacting='true' style='height: 450px; border-bottom:#1A353D solid 2px')
    vl-view(:zoom.sync='zoom' :center.sync='center' :rotation.sync='rotation')
    vl-layer-tile#osm
      vl-source-osm
  .container.pt-3
    .row
      .col-sm
        test-card
          template(slot='header')
            .text-center Asal Negara Impor
      .col-sm
        test-card
          template(slot='header')
            .text-center Rencana Belanja 2020
      .col-sm
        test-card
          template(slot='header')
            .text-center Realisasi Belanja 2019
</template>

<script>
import TestCard from '@/components/widgets/Card.vue';

export default {
  components: {
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
