/*
* 定义过滤器组件，只需要引入就行
* */
import Vue from 'vue'
// import monent from 'moment'
import format from 'date-fns/format'

Vue.filter('data-format', function (data, formatStr='YYYY-MM-DD HH:mm:ss') {
  // return monent(data).format(formatStr)
  return format(data, formatStr)
})
