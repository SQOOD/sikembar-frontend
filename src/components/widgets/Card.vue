<template lang="pug">
.card.shadowbox
  .card-header
    slot(name='header')
  .card-body
    slot(name='body')
</template>

<script>
export default {
};
</script>

<style scoped>
  .card-header{
      font-size:0.9rem;
      text-transform: capitalize;
      font-weight: 600;
  }

  .card-title{
      font-size:0.8em;
  }

  .card-subtitle{
      font-size:0.45rem;
  }
</style>
