import React from 'react'
import { connect } from 'react-redux'

import './HomePage.less'

class HomePage extends React.Component {
  render () {
    const welcome = `Welcome to our website. In our company you will get the best service.
    To place an order, follow several steps:`

    return (
      <div className='home-page'>
        <div className='home-page__welcome'>{ welcome }</div>
        <div className='home-page__instruction'>
          <ul>
            <li>Fill in all fields of the form.</li>
            <li>Choose a free master from the list.</li>
            <li>Click Confirm.</li>
            <li>That's all.</li>
            <li>An hour before the order, we will notify you by email.</li>
          </ul>
        </div>
        <div className='home-page__text'></div>
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
