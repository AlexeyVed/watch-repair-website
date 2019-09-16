import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadCities, loadClocks, loadDataEnd } from '../../../actions'
import OrderForm from '../OrderForm/OrderForm.jsx'
import Content from '../Content/Content.jsx'
import LoginForm from '../LoginForm/LoginForm.jsx'
import ModalWindow from '../../ModalWindow/ModalWindowApp.jsx'
import ModalWindowAdmin from '../../ModalWindow/ModalWindowAdmin.jsx'

export class ModuleMainOrder extends Component {
  componentDidMount () {
    return Promise.all([this.props.loadClocks(),
      this.props.loadCities()])
      .then((res) => {
        this.props.loadEnd()
      })
  }

  render () {
    const { modalClock, modalCity, modalOrder, modalApp } = this.props
    const isModal = modalClock || modalCity || modalOrder || false
    return (
      <div className='main'>
        {(modalApp) ? <ModalWindow/> : null}
        {(isModal) ? <ModalWindowAdmin/> : null}
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
    modalApp: state.appReducer.showModal,
    modalClock: state.clockReducer.showModal,
    modalCity: state.cityReducer.showModal,
    modalOrder: state.orderReducer.showModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCities: () => dispatch(loadCities()),
    loadClocks: () => dispatch(loadClocks()),
    loadEnd: () => dispatch(loadDataEnd())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleMainOrder)
