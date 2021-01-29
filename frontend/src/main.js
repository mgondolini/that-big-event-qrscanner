import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import Axios from 'axios';
import Clipboard from 'v-clipboard'
import "./registerServiceWorker";
import router from './router/router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Clipboard)

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    isLogged: false,
    email: '',
    contacts: [],
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
      state.contacts = newState.user.contacts;
      state.http = Axios.create({
        timeout: 10000,
        headers: { token: newState.token },
      });
    },
    addContact(state, newState) {
      console.log('newstate user contacts', newState.user.contacts);
      state.contacts = newState.user.contacts;
    }
  }
})

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");




