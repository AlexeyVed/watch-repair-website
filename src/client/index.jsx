import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App.jsx'
import store from './store.js'
import './style/App.less'

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App/>
    </Router>
  </Provider>, document.getElementById('root'))
