import axios from 'axios'

const setupAxiosInterceptors = callback => {
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
      callback()
    }
    return Promise.reject(error)
  }
  axios.interceptors.response.use(onResponseSuccess, onResponseFail)
}

export default setupAxiosInterceptors
