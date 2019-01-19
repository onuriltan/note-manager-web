import authService from '../../services/AuthService'
import router from '../../router'
import jwtDecode from 'jwt-decode'

const state = {
  isAuthenticated: false
}

const AuthStore = {
  state,
  getters: {
    isAuthenticated () {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      context.commit('deleteToken')
    },
    login (context, credentials) {
      return new Promise(resolve => {
        authService.login(credentials)
          .then((response) => {
            context.commit('updateIsAuthenticated', response)
            return resolve(response)
          })
          .catch((response) => { return resolve(response) })
      })
    },
    register (context, credentials) {
      return new Promise(resolve => {
        authService.register(credentials)
          .then((response) => {
            return resolve(response)
          })
          .catch((response) => { return resolve(response) })
      })
    },
    loadUser (context) {
      context.commit('loadUser')
    }
  },
  mutations: {
    deleteToken (state) {
      window.localStorage.removeItem('token')
      state.isAuthenticated = false
      router.push('/login')
    },
    updateIsAuthenticated (state, response) {
      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token)
        state.isAuthenticated = true
        router.push('/')
      }
    },
    loadUser (state) {
      let token = window.localStorage.getItem('token')
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      if (token != null) {
        expiration = jwtDecode(token).exp
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true
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
