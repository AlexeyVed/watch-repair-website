import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadCities, loadClocks, loadWorkers, loadDataEnd } from '../../../actions'
import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import ModalWindow from '../../ModalWindow/ModalWindowApp.jsx'

class MainOrder extends Component {
  componentDidMount () {
    return Promise.all([this.props.loadClocks(),
    this.props.loadCities(),
    this.props.loadWorkers()])
      .then((res)=> {
        this.props.loadEnd()
      })
  }

  render () {
    return (
      <div className='main'>
        {(this.props.modalApp) ? <ModalWindow/> : null}
        <OrderForm/>
        <Content/>
        <Switch>
          <Route path='/login' component={LoginForm}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalApp: state.appReducer.showModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCities: () => dispatch(loadCities()),
    loadClocks: () => dispatch(loadClocks()),
    loadWorkers: () => dispatch(loadWorkers()),
    loadEnd: () => dispatch(loadDataEnd())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainOrder)
