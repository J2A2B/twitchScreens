// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import LoadScript from 'vue-plugin-load-script'
import store from './store/store'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)
Vue.use(LoadScript)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
