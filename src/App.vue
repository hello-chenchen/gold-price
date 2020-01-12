<template>
  <div id="app">
    <div>
      <el-button @click="switchLang">Switch Language</el-button>
      <gold-price />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GoldPrice from './GoldPrice';
export default {
  name: "App",
  data () {
    localFlag: true;
  },
  methods: {
    switchLang() {
      if(this.localFlag) {
        this.$i18n.locale = 'enUS';
      } else {
        this.$i18n.locale = 'zhCN';
      }
      this.localFlag = !this.localFlag;
    }
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
