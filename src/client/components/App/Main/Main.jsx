import React, { Component } from 'react'

import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'

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
