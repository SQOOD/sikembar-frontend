import Vue from 'vue';
import VueLayers from 'vuelayers';
import vbclass from 'vue-body-class';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue2Crumbs from 'vue-2-crumbs';
import VueGoodTablePlugin from 'vue-good-table';
import VueCookies from 'vue-cookies';
import vSelect from 'vue-select';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/css.css';
import 'vuelayers/lib/style.css'; // needs css-loader
import 'vue-good-table/dist/vue-good-table.css';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);
Vue.use(vbclass, router);
Vue.use(VueLayers);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(Vue2Crumbs);
Vue.use(VueGoodTablePlugin);
Vue.use(VueCookies);

library.add(faFileAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Vue.use(VueReCaptcha, { siteKey: '6LdV5NAUAAAAAMs2IdjurivcG_EIS3tAd6iNGkf5' });
Vue.$cookies.config('1d', '', '', true);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
