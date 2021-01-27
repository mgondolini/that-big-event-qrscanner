import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import CodeScanner from '../views/CodeScanner.vue';
import Contacts from '../views/Contacts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/code_scanner',
    name: 'code_scanner',
    component: CodeScanner,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
