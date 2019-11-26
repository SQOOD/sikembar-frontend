import Vue from 'vue';
import VueLayers from 'vuelayers';
import vbclass from 'vue-body-class';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue2Crumbs from 'vue-2-crumbs';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
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

Vue.use(vbclass, router);
Vue.use(VueLayers);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(Vue2Crumbs);

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
