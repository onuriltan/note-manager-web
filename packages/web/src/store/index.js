import Vue from 'vue';
import Vuex from 'vuex';

import AuthStore from './modules/auth.store';
import GeneralStore from './modules/general.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: AuthStore,
    general: GeneralStore
  }
});

export default store;
