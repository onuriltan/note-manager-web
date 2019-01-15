import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthStore from './store/modules/AuthStore'

const Login = () => import('./views/Login.vue')

Vue.use(Router)

function requireAuth (to, from, next) {
  console.log(AuthStore.state.isAuthenticated)
  if (AuthStore.state.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}
function alreadyLoggedIn (to, from, next) {
  console.log(AuthStore.state.isAuthenticated)
  if (!AuthStore.state.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}

export default new Router({
  routes: [
    {
      path: '*', component: Home
    },
    {
      path: '/', name: 'home', component: Home, beforeEnter: requireAuth
    },
    {
      path: '/login', name: 'login', component: Login, beforeEnter: alreadyLoggedIn
    }
  ]
})
