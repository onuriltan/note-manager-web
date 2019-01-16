import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

import BootstrapVue from 'bootstrap-vue'
import './styles/bootstrap/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Layout } from 'bootstrap-vue/es/components'

Vue.use(Layout)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
