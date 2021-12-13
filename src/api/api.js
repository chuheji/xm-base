/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2021-06-07 10:20:56
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2021-06-07 10:22:03
 */
//  引入httpUtil
import { get, post } from '@/plugins/axios'
// 基本路径
const baseUrl = process.env.VUE_APP_LOCATION

const api = {}
// 接口示例1
api.api1 = (params) => get({ url: `${baseUrl}/1`, params: params })
// 接口示例2
api.api2 = (params) => post({ url: `${baseUrl}/2`, params: params })
// 接口示例3
api.api3 = (params) => post({ url: `${baseUrl}/3`, params: params, headers: { 'Content-Type': 'multipart/form-data' } })

export default api
