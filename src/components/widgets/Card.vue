<template lang="pug">
.card.shadow-nohover
  h5.card-header {{header}}
  .card-body
    h5.card-title {{title}}
    h6.card-subtitle {{subtitle}}
    p.card-text {{content}}
</template>

<script>
export default {
  props: {
    header: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    content: {
      Type: String,
    },
    rest: {
      Type: String,
    },
  },
};
</script>

<style>
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
