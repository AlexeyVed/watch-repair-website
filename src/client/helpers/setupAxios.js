import axios from 'axios'
import { logOutApp } from '../actions/loginActions.js'
import store from '../store.js'
const { dispatch } = store

const setupAxiosInterceptors = logOutApp => {
  const onRequestSuccess = config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  }
  const onRequestFail = error => {
    return Promise.reject(error)
  }
  axios.interceptors.request.use(onRequestSuccess, onRequestFail)

  const onResponseSuccess = response => {
    return response
  }
  const onResponseFail = error => {
    const status = error.status || error.response.status
    if (status === 401) {
      logOutApp()
    }
    return Promise.reject(error)
  }
  axios.interceptors.response.use(onResponseSuccess, onResponseFail)
}

setupAxiosInterceptors(() => {
  dispatch(logOutApp())
})

export default setupAxiosInterceptors
