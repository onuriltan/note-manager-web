import Vue from 'vue';
import Vuex from 'vuex';

import AuthStore from './modules/auth.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: AuthStore
  }
});

export default store;
