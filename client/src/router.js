import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const Login = () => import('./views/Login.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard', name: 'home', component: Home
    },
    {
      path: '/login', name: 'login', component: Login
    }
  ]
})
