<template lang='pug'>
div
  vl-map.shadow-nohover(:load-tiles-while-animating='true'
  :load-tiles-while-interacting='true' style='height: 330px; border-bottom:#1A353D solid 2px')
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
      zoom: 3,
      center: [484.72736965890346, 1.4880939094014138],
      rotation: 0,
    };
  },
};
</script>
