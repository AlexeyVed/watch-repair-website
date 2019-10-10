import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import setupAxiosInterceptors from './helpers/setupAxios.js'
import { logOutApp } from './actions/loginActions.js'
import App from './components/App.jsx'
import store from './store.js'
import './style/App.less'

const { dispatch } = store
setupAxiosInterceptors(() => {
  dispatch(logOutApp())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))
