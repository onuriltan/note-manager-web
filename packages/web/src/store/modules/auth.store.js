import authService from '../../services/auth.service';
import socialService from '../../services/social.service';

import router from '../../router';
import jwtDecode from 'jwt-decode';

const state = {
  isAuthenticated: false,
  sessionExpired: false,
  loginMethod: '',
};

const auth = {
  namespaced: true,
  state,
  getters: {
    isAuthenticated() {
      return state.isAuthenticated;
    },
    sessionExpired() {
      return state.sessionExpired;
    },
    loginMethod() {
      return state.loginMethod;
    },
  },
  actions: {
    logout(context) {
      context.commit('deleteToken');
    },
    login(context, credentials) {
      return new Promise((resolve) => {
        authService
          .login(credentials)
          .then((response) => {
            context.commit('updateIsAuthenticated', response);
            return resolve(response);
          })
          .catch((response) => {
            return resolve(response);
          });
      });
    },

    loginWithFacebook(context, token) {
      return new Promise((resolve) => {
        socialService
          .loginWithFacebook(token)
          .then((response) => {
            context.commit('updateIsAuthenticated', response);
            return resolve(response);
          })
          .catch((response) => {
            return resolve(response);
          });
      });
    },

    loginWithSocial(context, token, method) {
      context.commit('updateIsAuthenticated', { status: 200, data: { token, method } });
    },

    confirmUser(context, confirmationToken) {
      return new Promise((resolve) => {
        authService
          .confirmUser(confirmationToken)
          .then((response) => {
            context.commit('updateIsAuthenticated', response);
            return resolve(response);
          })
          .catch((response) => {
            return resolve(response);
          });
      });
    },

    register(context, credentials) {
      return new Promise((resolve) => {
        authService
          .register(credentials)
          .then((response) => {
            return resolve(response);
          })
          .catch((response) => {
            return resolve(response);
          });
      });
    },

    resendConfirmationEmail(context, credentials) {
      return new Promise((resolve) => {
        authService
          .resendConfirmationEmail(credentials)
          .then((response) => {
            return resolve(response);
          })
          .catch((response) => {
            return resolve(response);
          });
      });
    },

    loadUser(context) {
      context.commit('loadUser');
    },

    checkIsAuthenticated(context) {
      context.commit('checkIsAuthenticated');
    },
  },
  mutations: {
    deleteToken(state) {
      window.localStorage.removeItem('token');
      state.isAuthenticated = false;
      router.push('/login');
    },

    checkIsAuthenticated(state) {
      const token = window.localStorage.getItem('token');
      const unixTimeStamp = new Date().getTime() / 1000;
      let expiration = null;
      if (token != null) {
        expiration = jwtDecode(token).exp;
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp < 0) {
        state.sessionExpired = true;
        setTimeout(() => {
          state.isAuthenticated = false;
          router.push('/login');
          state.sessionExpired = false;
          window.localStorage.removeItem('token');
        }, 2000);
      }
    },

    updateIsAuthenticated(state, response) {
      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token);
        state.isAuthenticated = true;
        state.sessionExpired = false;
        state.loginMethod = response.data.method;
        router.push('/dashboard');
      } else {
        setTimeout(() => {
          router.push('/login');
          window.localStorage.removeItem('token');
        }, 2000);
      }
    },

    loadUser(state) {
      const token = window.localStorage.getItem('token');
      const unixTimeStamp = new Date().getTime() / 1000;
      let expiration = null;
      if (token != null) {
        expiration = jwtDecode(token).exp;
      } else {
        state.isAuthenticated = false;
        state.sessionExpired = false;
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true;
        state.sessionExpired = false;
      }
    },
  },
};

export default auth;
