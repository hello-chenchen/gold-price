import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
import App from './App.vue';

Vue.use(Table)
Vue.use(TableColumn)

new Vue({
  el: '#app',
  render: h => h(App)
});