import React, { Component } from 'react'

import OrderForm from '../MainForm/OrderForm.jsx'
import Content from '../MainContent/content.jsx'

export default class Main extends Component {
  render () {
    return (
      <div className='main'>
        <OrderForm/>
        <Content/>
      </div>
    )
  }
}
