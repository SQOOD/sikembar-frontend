<template lang='pug'>
  #app.vh-100
    heading
    router-view
    footing
</template>

<style>

</style>

<script>
// @ is an alias to /src
import Heading from '@/components/navigations/Header.vue';
import Footing from '@/components/navigations/Footer.vue';

export default {
  components: {
    Heading,
    Footing,
  },
};
</script>
