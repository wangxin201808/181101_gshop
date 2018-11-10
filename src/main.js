/*
* 入口js
* */
import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router/index'
import store from './store/index'
import './mock/MockServer' // 加载MOCKSERVER即可
import loading from './common/imgs/loading.gif'
import './filters/filters' // 加载过滤器即可

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button> 可以在全局使用
Vue.use(VueLazyload, { // 在全局有了 lazy 指令
  loading
})

new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store  // 使用上vuex
})
