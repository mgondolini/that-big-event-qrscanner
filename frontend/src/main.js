import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import Axios from 'axios';
import Clipboard from 'v-clipboard'
import createPersistedState from 'vuex-persistedstate'
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
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
  state: {
    isAuthenticated: false,
    email: '',
    contacts: [],
    axios : Axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 10000,
      headers: { token: 'InvalidToken' },
    })
  },
  mutations: {
    login(state, signIn) {
      console.log(JSON.stringify(signIn));
      localStorage.token = signIn.token;
      localStorage.user = signIn.user;
      state.isAuthenticated = true;
      state.email = signIn.user.email;
      state.contacts = signIn.user.contacts;
      state.axios = Axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 10000,
        headers: { token: signIn.token },
      });
    },
    addContact(state, userUpdated) {
      console.log('newstate user contacts', userUpdated.user.contacts);
      state.contacts = userUpdated.user.contacts;
      console.log("tk ---"+state.token)
    },
    logout(state) {
      localStorage.token = 'InvalidToken';
      localStorage.user = '';
      state.isAuthenticated = false;
      state.email = '';
      state.contacts = [];
      state.axios = Axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 10000,
        headers: { token: 'InvalidToken' },
      });
    },
  }
})

localStorage.store = store;

router.beforeEach((to, from, next) => {
  const routes = ['/login','/code_scanner', '/contacts'];
  const loggedRoute = ['/code_scanner', '/contacts'];
  const p = to.path;

  console.log(store.state)
  console.log(localStorage.token)

  if (!routes.includes(p)) {
    next('/code_scanner');
  }else if (loggedRoute.includes(p) && !store.state.isAuthenticated) {
    next('/login');
  } else {
    console.log("auth?"+store.state.isAuthenticated)
    next();
  }
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");




