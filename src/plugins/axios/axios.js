/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2021-06-07 10:15:28
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2021-06-07 10:18:42
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

// 请求超时时间
axios.defaults.timeout = 100000

// 登录类型 normal、sso
const loginType = process.env.VUE_APP_loginType

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 如果登陆类型为sso, 在http请求的header加上token
    if (loginType === 'sso') {
      let token = ''
      if (location.search.split('token=')[1]) {
        token = decodeURIComponent(location.search.split('token=')[1].split('/')[0])
      }
      config.headers.token = token
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 未登录状态跳转登录页
    if (response.data.code === 10) {
      if (loginType === 'sso') {
        // 如果登陆类型为sso, 跳转响应中的登录页面地址
        setTimeout(() => {
          location.href = response.data.data
        }, 1500)
      } else {
        // 清空前端登录凭证
        sessionStorage.clear()
        // 如果登陆类型为normal, 跳转系统登录模块
        location.href = `${location.origin}/#/login`
      }
      return ''
    }
    return Promise.resolve(response)
  },
  error => {
    if (error.status === 500) {
      ElMessage({ type: 'error', message: '500 内部服务器错误！', duration: 5000 })
    }
    if (error.status === 404) {
      ElMessage({ type: 'error', message: '404 接口不存在', duration: 5000 })
    }
    return Promise.reject(error.response)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = ({ url, params, responseType }) => {
  return new Promise((resolve, reject) => {
    const options = { method: 'get', url: url }
    if (params) {
      options.params = params
    }
    if (responseType) {
      options.responseType = responseType
    }
    axios(options).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} responseType [响应类型]
 * @param {Object} headers [请求头]
 *
 */
export const post = ({ url, params, responseType, headers }) => {
  return new Promise((resolve, reject) => {
    const options = { method: 'post', url: url, data: params }
    if (responseType) {
      options.responseType = responseType
    }
    if (headers) {
      options.headers = headers
    }
    axios(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * all方法，对应all请求
 * @param {List} queryList [多个请求的url地址和参数的集合]
 */
export const all = (queryList) => {
  const query = queryList.map((item) => {
    return axios.get(item.url, { params: item.params })
  })
  return new Promise((resolve, reject) => {
    axios.all(query)
      .then((iterable) => {
        resolve(iterable)
      }).catch(err => {
        reject(err.data)
      })
  })
}
