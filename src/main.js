import Vue from 'vue';
import VueLayers from 'vuelayers';
import vbclass from 'vue-body-class';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/css.css';
import 'vuelayers/lib/style.css'; // needs css-loade

Vue.use(vbclass, router);
Vue.use(VueLayers);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
