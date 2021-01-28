import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import Axios from 'axios';
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
    isLogged: false,
    email: '',
    axios : Axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 1000
    })
  },
  mutations: {
    login(state, newState) {
      localStorage.token = newState.token;
      localStorage.user = newState.user;
      state.isLogged = true;
      state.email = newState.user.email;
      state.http = Axios.create({
        timeout: 10000,
        headers: { token: newState.token },
      });
    },
  }
})

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");




