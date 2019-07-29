import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Placeholder } from 'react-preloading-screen'

import AllWorkers from '../AllWorkers/AllWorker.jsx'
import ChooseWorker from '../ChooseWorker/ChooseWorker.jsx'
import LinkButton from '../../LinkButton/LinkButton.jsx'

class Content extends Component {
  render () {
    const { chooseMaster, currentUser, dataLoad, isMakeOrder } = this.props

    let adminLink,
      loader

    if (currentUser === 'admin@example.com') {
      adminLink = <LinkButton to='/admin' name='Admin interface' className=''/>
    } else {
      adminLink = null
    }

    if (dataLoad || isMakeOrder) {
      loader = <Placeholder>
        <div className='preloader'>
          <div className='loader'>
          </div>
        </div>
      </Placeholder>
    } else {
      loader = null
    }

    const component = (!chooseMaster) ? <AllWorkers/> : <ChooseWorker/>

    return (
      <div className='content'>
        <div className='home-page__navigation'>
          {adminLink}
          <LinkButton to='/' name='Main' />
        </div>
        {component}
        {loader}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chooseMaster: state.appReducer.chooseWorker,
    currentUser: state.loginReducer.singInUser,
    dataLoad: state.appReducer.dataLoad,
    isMakeOrder: state.appReducer.isMakeOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
