import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth.store';
import general from './modules/general.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    general
  }
});

export default store;
