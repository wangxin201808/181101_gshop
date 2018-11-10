/*
* 间接更新，通过mutation间接更新state的对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqShopsByAddress,
} from '../api/index'

export default {

  // 异步获取地址的action
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },

  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发送ajax异步请求
    const result = await reqFoodCategorys()
    // 提交mutation
    if (result.code === 0) {
      let categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送ajax异步请求
    let {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交mutation
    if (result.code === 0) {
      let shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  // 同步存储用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步存取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 异步退出
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取 goods
  async getShopGoods ({commit}, callback) {
    let result = await reqShopGoods()
    if (result.code === 0) {
      let goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 执行回调函数
      callback && callback()
    }
  },

  // 异步获取 info
  async getShopInfo ({commit}) {
    let result = await reqShopInfo()
    if (result.code === 0) {
      let info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取 ratings
  async getShopRatings ({commit}, callBack) {
    let result = await reqShopRatings()
    if (result.code === 0) {
      let ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
    // 数据更新完毕执行回调函数
    callBack && callBack()
  },

  // 同步更新数据
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) { // 增加
      commit(INCREMENT_FOOD_COUNT, {food})
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 同步清空购物车
  clearFoodCart ({commit}) {
    commit(CLEAR_CART)
  },

  // 搜索商家
  async searchShops ({commit, state}, {keyword}) {
    // 发送ajax异步请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqShopsByAddress(geohash, keyword)
    // 提交mutation
    if (result.code === 0) {
      let searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }

}
