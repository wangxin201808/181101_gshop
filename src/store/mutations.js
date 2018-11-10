/*
* 直接更新state的多个方法的对象
* */
import Vue from 'vue'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, { address }) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },

  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },

  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },

  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.counter) { // Food.count 的值大于 0
      food.counter --
      if (food.counter === 0) { // 当 counter 的数量为0
        // 删除特定的food
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.counter) { // 第一次添加
      /*
      * 对象名、 属性名、 属性值
      * */
      Vue.set(food, 'counter', 1)
      // 将 food 添加到 cartFoods 中
      state.cartFoods.push(food)
    } else {
      food.counter++
    }
  },

  [CLEAR_CART] (state) {
    // 清空food 中的count
    state.cartFoods.forEach(food => food.counter = 0)
    // 清空购物车
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
    state.searchShops = searchShops
  }
}
