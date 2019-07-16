import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import AdminBar from '../Bar/AdminBar.jsx'
import AdminContent from '../Content/AdminContent.jsx'

import './MainAdmin.less'

class MainAdmin extends React.Component {
  render () {
    const { currentUser } = this.props

    if (currentUser !== 'admin@example.com') {
      return <Redirect to={{ pathname: '/login' }}/>
    }

    return (
      <div className='admin-main'>
        <AdminBar/>
        <AdminContent/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser
  }
}

export default connect(
  mapStateToProps
)(MainAdmin)
