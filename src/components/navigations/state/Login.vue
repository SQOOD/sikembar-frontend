<template lang="pug">
ul.navbar-nav.ml-auto(v-if='role === null')
  li.nav-item
    router-link.nav-link(to='/login') Masuk {{role}}
staff(v-else-if='role === "ADMIN" || "EVALUATOR" || "SUPERINTENDENT"')
miner(v-else-if='role === "MINER"')
</template>

<script>
import Miner from '@/components/navigations/state/Miner.vue';
import Staff from '@/components/navigations/state/Staff.vue';

export default {
  components: {
    Miner,
    Staff,
  },
  data() {
    return {
      role: '',
    };
  },
  mounted() {
    this.role = this.$cookies.get('hermes');
  },
};
</script>
