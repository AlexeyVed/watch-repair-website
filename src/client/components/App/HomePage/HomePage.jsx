import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { logOutApp } from '../../../actions'

class HomePage extends React.Component {
  render () {
    return (
      <div>
        HomePage
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
