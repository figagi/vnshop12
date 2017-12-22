// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: '/static/img/ok-2.png',
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
