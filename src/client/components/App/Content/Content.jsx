import React, { Component } from 'react'

import HomePage from '../HomePage/HomePage.jsx'
import ChooseWorker from '../ChooseWorker/ChooseWorker.jsx'

export default class Content extends Component {
  render () {
    const component = (!true) ? <HomePage/> : <ChooseWorker/>

    return (
      <div className='content'>
        {component}
      </div>
    )
  }
}
