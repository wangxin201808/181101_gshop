/*
* 使用mock提供mockserver服务接口
* */
import Mock from 'mockjs'
import data from './data'

// 提供 goods 接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 提供 ratings 接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 提供 info 接口
Mock.mock('/info', {code: 0, data: data.info})
