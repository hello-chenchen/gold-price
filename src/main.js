import Vue from 'vue';
import { Table, TableColumn, Button } from 'element-ui';
import App from './App.vue';
import i18n from './i18n.js';

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
});