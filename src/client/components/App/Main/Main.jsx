import React, { Component } from 'react'

import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx'

export default class Main extends Component {
  render () {
    const { pathname } = this.props.location

    return (
      <div className='main'>
        <OrderForm/>
        <Content/>
        { (pathname === '/login') ? <LoginForm/>
          : (pathname === '/registration') ? <RegistrationForm/> : null }
      </div>
    )
  }
}
