// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/css/global.css'
//import { config } from 'vue/types/umd';
// import {Message} from 'element-ui'

Vue.use(ElementUI);
// Vue.prototype.$message = Message;
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1/'
// 拦截器   进行挂载
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
