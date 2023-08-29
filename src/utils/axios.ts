import axios from 'axios'
import { message } from 'ant-design-vue'
import { getToken, removeAll } from '@/utils/storage'
import { useDebounceFn } from '@vueuse/core'
import router from '@/router'

const ERR_DEFAULT_MSG = '系统发生未知错误，请联系管理员'

const service = axios.create({
  baseURL: window.location.origin,
  timeout: 26000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers['zj_unicom_token'] = token
    if (token) config.headers['zj-unicom-token'] = token
    if (process.env.NODE_ENV === 'development') {
      config.headers['domainname'] = 'dlbscs-default.22.12.82'
    }
    const domainName = window.location.search
    if (domainName) {
      config.headers['domainname'] = domainName.split('=')[1]
    }
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date().toString()) / 1000,
        ...config.params
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      if (response.data.code == 430) {
        messageError('登录已过期，请重新登录')
        removeAll()
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath }
        })
      } else if (response.data.code == 408 || response.data.code == 409) {
        // 浙政钉环境报错
        messageError(response.data.msg || response.data.message || ERR_DEFAULT_MSG)
      } else {
        messageError(response.data.msg || response.data.message || ERR_DEFAULT_MSG)
      }
    }
    return response
  },
  (err) => {
    errHandle(err)
    return Promise.reject(err.response ? err.response.data : err)
  }
)
// 请求失败处理
const errHandle = (error: { response: { status: number }; message: string }) => {
  if (error.response) {
    if (error.response.status === 500) {
      messageError('服务器异常')
    } else if (error.response.status === 403) {
      messageError('拒绝访问')
    } else if (error.response.status === 401) {
      // 没权限的提示
      messageError('对不起，您没有权限访问本页面！')
    } else {
      messageError(error.message || ERR_DEFAULT_MSG)
    }
  }
}
// 防抖错误提醒
const messageError = useDebounceFn((p: string) => {
  message.error(p)
}, 200)

// 封装请求
const http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求数据} params
   */
  get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: 'get',
        params
      })
        .then((res) => {
          if (res) resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  upload (url:string, data: any) {
    return new Promise((resolve, reject) => {
      service
        .post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  /** post form请求
   * @param  {接口地址} url
   * @param  {请求数据} data
   */
  post(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: 'post',
        data
      })
        .then((res) => {
          if (res) resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /** postApi json请求
   * @param  {接口地址} url
   * @param  {请求数据} data
   */
  postJsonApi(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: 'post',
        params: data
      })
        .then((res) => {
          if (res) resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /** delete 请求
   * @param  {接口地址} url
   * @param  {请求数据} data
   */
  delete(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: 'delete',
        data
      })
        .then((res) => {
          if (res) resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  /** put 请求
   * @param  {接口地址} url
   * @param  {请求数据} data
   */
  put(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      service
        .put(url, data)
        .then((response) => {
          if (response) resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export { http as axios }
