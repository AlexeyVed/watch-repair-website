import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changePage } from '../../../actions'

class Footer extends Component {


  render () {
    return (
      <div className='footer'>
        <Link to='/works'>Our Works</Link>
        <Link to='/about'>About Us</Link>
        <Link to='/contacts'>Contacts</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    page: data => dispatch(changePage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
