import loginService from '../../services/LoginService'
import router from '../../router'
import jwtDecode from 'jwt-decode'

const state = {
  isAuthenticated: false
}

const AuthStore = {
  state,
  getters: {

  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise(resolve => {
        loginService.login(credentials)
          .then((response) => {
            context.commit('login', response)
            return resolve(response)
          })
          .catch((response) => { return resolve(response) })
      })
    }

  },
  mutations: {
    logout (state) {
      window.localStorage.removeItem('token')
      state.isAuthenticated = false
      router.push('/login')
    },
    login (state, response) {
      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token)
        state.isAuthenticated = true
        router.push('/')
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) { // on Dom load check if user is already logged in
  let token = window.localStorage.getItem('token')
  let unixTimeStamp = new Date().getTime() / 1000
  let expiration = null
  if (token != null) {
    expiration = jwtDecode(token).exp
  }
  if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
    state.isAuthenticated = true
  }
})

export default AuthStore
