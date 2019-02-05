import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomeView.vue'
import AuthStore from './store/modules/AuthStore'
import Store from './store/index'

const Login = () => import('./views/LoginView.vue')
const Register = () => import('./views/RegisterView.vue')
const History = () => import('./views/HistoryView.vue')
const Confirmation = () => import('./views/ConfirmationView.vue')
const NotFound = () => import('./views/NotFoundView.vue')

Vue.use(Router)

async function requireAuth (to, from, next) {
  function proceed () {
    if (AuthStore.getters.isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  }
  await Store.dispatch('loadUser')
  proceed()
}
async function alreadyLoggedIn (to, from, next) {
  function proceed () {
    if (!AuthStore.getters.isAuthenticated()) {
      next()
    } else {
      next('/')
    }
  }
  await Store.dispatch('loadUser')
  proceed()
}

export default new Router({
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }), // scroll to top of the page every time route changes
  mode: 'history',
  linkActiveClass: 'active-page', // router-link active class name
  routes: [
    {
      path: '*', component: NotFound
    },
    {
      path: '/dashboard/:pageNumber?', name: 'home', component: Home, beforeEnter: requireAuth
    },
    {
      path: '/confirm/:confirmationToken', name: 'confirm', component: Confirmation, beforeEnter: alreadyLoggedIn
    },
    {
      path: '/notes-history/:pageNumber?', name: 'history', component: History, beforeEnter: requireAuth
    },
    {
      path: '/login', name: 'login', component: Login, beforeEnter: alreadyLoggedIn
    },
    {
      path: '/register', name: 'register', component: Register, beforeEnter: alreadyLoggedIn
    }
  ]
})
