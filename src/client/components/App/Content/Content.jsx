import React, { Component } from 'react'
import {connect} from "react-redux";

import AllWorkers from '../AllWorkers/AllWorker.jsx'
import ChooseWorker from '../ChooseWorker/ChooseWorker.jsx'
import LinkButton from "../../LinkButton/LinkButton.jsx";

class Content extends Component {
  render () {

    const { chooseMaster, currentUser } = this.props

    let adminLink

    if(currentUser === 'admin@example.com') {
      adminLink = <LinkButton to='/admin' name='Admin interface' className=''/>
    } else {
      adminLink = null
    }

    const component = (!chooseMaster) ? <AllWorkers/> : <ChooseWorker/>

    return (
      <div className='content'>
        <div className='home-page__navigation'>
          {adminLink}
          <LinkButton to='/' name='Main' />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Content)

