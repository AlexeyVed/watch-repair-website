import React from 'react'
import {connect} from "react-redux";
import { BrowserRouter as Router, Redirect} from 'react-router-dom';


import AdminBar from '../Bar/AdminBar.jsx'
import AdminContent from '../Content/AdminContent.jsx'
import './MainAdmin.less'

import { loadData } from '../../../actions/adminActions.js'


class MainAdmin extends React.Component {



  componentDidMount() {

    loadData()
  }


  render () {

    const { currentUser } = this.props

    if (currentUser !== 'admin@example.com') {
      return <Redirect to={{pathname: '/'}}/>
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
    currentUser: state.loginReducer.singInUser,
  }
}



export default connect(
  mapStateToProps
)(MainAdmin)
