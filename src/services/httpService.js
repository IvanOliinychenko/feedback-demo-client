import axios from 'axios'
import NProgress from 'NProgress'
import {router} from '../router/index'
import cache from '../managers/cacheManager'

const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: process.env.HTTP_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(config => {
  NProgress.start()
  let oauthToken = cache.getOAthToken()
  if (oauthToken) {
    config.headers.Authorization = `Bearer ${oauthToken}`
  }
  return config
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  NProgress.done()
  return response
}, error => {
  NProgress.done()
  if (error && error.response && error.response.status === 401) {
    cache.setOAthToken('')
    cache.setRole('')
    router.push({
      name: 'signin'
    })
  } else {
    return Promise.reject(error.message)
  }
})

export default http
