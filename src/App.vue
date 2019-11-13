<template lang='pug'>
  #app.vh-100
    navigation
    router-view
</template>

<style>

</style>

<script>
// @ is an alias to /src
import Navigation from '@/components/navigations/Bar.vue';

export default {
  components: {
    Navigation,
  },
};
</script>
