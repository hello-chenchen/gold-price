<template>
  <div id="app">
    <div>
      <gold-price />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GoldPrice from './GoldPrice';
export default {
  name: "App",
  methods: {
  },
  components: {
    GoldPrice
  },
  mounted() {
  }
};
</script>
<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
