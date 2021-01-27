import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
// import CodeScanner from '../views/CodeScanner.vue';
// import Contacts from '../views/Contacts.vue';
// import Profile from '../views/Profile/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
