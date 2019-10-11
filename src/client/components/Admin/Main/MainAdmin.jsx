import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Preloader from '../../App/Preloader/Preloader.jsx'
import ModalWindow from '../../ModalWindow/ModalWindowAdmin.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'
import AdminBar from '../Bar/AdminBar.jsx'
import RefactorCities from '../TableCities/RefactorCities'
import RefactorClients from '../TableClients/RefactorClients'
import RefactorClocks from '../TableClocks/RefactorClocks'
import RefactorWorkers from '../TableWorkers/RefactorWorkers'
import RefactorOrders from '../TableOrders/RefactorOrders'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin.jsx'

import './MainAdmin.less'

class MainAdmin extends React.Component {
  render () {
    const {
      isRefCity,
      isRefClock,
      isRefCustomer,
      isRefMaster,
      isRefOrder,
      modalClock,
      modalCity,
      modalCustomer,
      modalOrder,
      modalMaster
    } = this.props

    let preloader

    if (
      isRefCity ||
      isRefClock ||
      isRefCustomer ||
      isRefMaster ||
      isRefOrder) {
      preloader = <Preloader/>
    } else {
      preloader = null
    }

    const isModal = () => {
      return (modalClock ||
        modalCity ||
        modalCustomer ||
        modalOrder ||
        modalMaster)
    }

    return (
      <div className='admin-main'>
        {(isModal()) ? <ModalWindow/> : null}
        { preloader }
        <AdminBar/>
        <div className='admin-content'>
          <div className='work-space'>
            <Switch>
              <Route path='/admin/dashboard' component={Dashboard}/>
              <Route path='/admin/cities' component={RefactorCities}/>
              <Route path='/admin/clients' component={RefactorClients}/>
              <Route path='/admin/clocks' component={RefactorClocks}/>
              <Route path='/admin/workers' component={RefactorWorkers}/>
              <Route path='/admin/orders' component={RefactorOrders}/>
              <Route component={NoMatchAdmin}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRefCity: state.cityReducer.refactorModelInProcess,
    isRefClock: state.clockReducer.refactorModelInProcess,
    isRefCustomer: state.customerReducer.refactorModelInProcess,
    isRefMaster: state.masterReducer.refactorModelInProcess,
    isRefOrder: state.orderReducer.refactorModelInProcess,
    modalClock: state.clockReducer.showModal,
    modalCity: state.cityReducer.showModal,
    modalCustomer: state.customerReducer.showModal,
    modalMaster: state.masterReducer.showModal,
    modalOrder: state.orderReducer.showModal
  }
}

export default connect(
  mapStateToProps,
  null
)(MainAdmin)
