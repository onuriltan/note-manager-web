import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth.store';
import general from './modules/general.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  modules: {
    auth,
    general,
  },
});

export default store;
