import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomePage from '../HomePage/HomePage.jsx'
import ChooseWorker from '../ChooseWorker/ChooseWorker.jsx'

export class ModuleContent extends Component {
  render () {
    const { chooseMaster } = this.props

    const component = (!chooseMaster) ? <HomePage/> : <ChooseWorker/>

    return (
      <div className='content'>
        {component}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseMaster: state.appReducer.chooseWorker,
    currentUser: state.loginReducer.singInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContent)
