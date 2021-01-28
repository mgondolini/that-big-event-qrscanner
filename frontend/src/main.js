import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import "./registerServiceWorker";
import router from './router/router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");




