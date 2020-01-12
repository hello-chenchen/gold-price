import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './resources/lang/enUS.json';
import zhCN from './resources/lang/zhCN.json';

Vue.use(VueI18n)

var i18n = new VueI18n({
    locale: "zhCN",
    fallbackLocale: "enUS",
    messages: {
        zhCN: zhCN,
        enUS: enUS 
    }
});

export default i18n;