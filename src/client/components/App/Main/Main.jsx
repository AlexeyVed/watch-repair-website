import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";

import { loadDataUser } from "../../../actions";
import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx'



class Main extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render () {
    return (
      <div className='main'>
        <OrderForm/>
        <Content/>
        <Switch>
          <Route path='/login' component={LoginForm}/>
          <Route path='/registration' component={RegistrationForm}/>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)


