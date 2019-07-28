import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Circle2 } from 'react-preloaders'

import App from './components/App.jsx'
import store from './store.js'
import './style/App.less'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App/>
        <Circle2 background='blur' animation="slide" color={'#db6e00'}/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))
