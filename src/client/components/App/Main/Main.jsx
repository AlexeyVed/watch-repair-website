import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx'

export default class Main extends Component {
  render () {
    return (
      <div className='main'>
        <OrderForm/>
        <Content/>
        <Switch>
          <Route path='/login' component={LoginForm}/>
          <Route path='/registration' component={RegistrationForm}/>
        </Switch>
      </div>
    )
  }
}
