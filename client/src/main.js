import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@scss/application.scss';
import './globals';
import './sounds';
import sound from '@mixins/sound';

Vue.config.productionTip = false;
Vue.use(require('vue-shortkey'))
Vue.mixin(sound);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
