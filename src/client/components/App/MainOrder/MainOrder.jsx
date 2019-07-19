import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { changePage, loadDataUser } from '../../../actions'
import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx'

class MainOrder extends Component {
  componentDidMount () {
    this.props.loadData()
    this.props.page('order')
  }

  render () {
    return (
      <div className='main'>
        <OrderForm/>
        <Content/>
        <Switch>
          <Route path='/order/login' component={LoginForm}/>
          <Route path='/order/registration' component={RegistrationForm}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(loadDataUser()),
    page: data => dispatch(changePage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainOrder)
