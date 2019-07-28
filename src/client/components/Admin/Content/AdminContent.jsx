import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  loadClocksAdmin,
  loadCitiesAdmin,
  loadClientsAdmin,
  loadOrdersAdmin,
  loadWorkersAdmin
} from '../../../actions'

import RefactorCities from '../TableCities/RefactorCities.jsx'
import RefactorClients from '../TableClients/RefactorClients.jsx'
import RefactorClocks from '../TableClocks/RefactorClocks.jsx'
import RefactorWorkers from '../TableWorkers/RefactorWorkers.jsx'
import RefactorOrders from '../TableOrders/RefactorOrders.jsx'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './AdminContent.less'
import {Placeholder} from "react-preloading-screen";

class AdminContent extends React.Component {
  componentDidMount() {
    const {
      loadClocks,
      loadCities,
      loadClients,
      loadOrders,
      loadWorkers
    } = this.props

    loadClocks()
    loadCities()
    loadClients()
    loadOrders()
    loadWorkers()

  }

  render () {
    const { isLoading } = this.props

    let loader

    if (isLoading) {
      loader = <Placeholder>
        <div className='preloader'>
          <div className='loader'>
          </div>
        </div>
      </Placeholder>
    } else {
      loader = null
    }

    return (
      <div className='admin-content'>
        <div className='admin-content__navigation'>
          <LinkButton to='/' name='Main' className=''/>
          <LinkButton to='/order' name='Make Order' className=''/>
        </div>
        <div className='work-space'>
          <Switch>
            <Route exact path='/admin' render={
              props => (<div className='work-space__welcome'>
                Welcome to Admin interface!
              </div>)}/>
            <Route path="/admin/cities" component={RefactorCities}/>
            <Route path="/admin/clients" component={RefactorClients}/>
            <Route path="/admin/clocks" component={RefactorClocks}/>
            <Route path="/admin/workers" component={RefactorWorkers}/>
            <Route path="/admin/orders" component={RefactorOrders}/>
          </Switch>
        </div>
        {loader}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.adminReducer.view,
    isLoading: state.adminReducer.dataLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadClocks: () => dispatch(loadClocksAdmin()),
    loadCities: () => dispatch(loadCitiesAdmin()),
    loadClients: () => dispatch(loadClientsAdmin()),
    loadOrders: () => dispatch(loadOrdersAdmin()),
    loadWorkers: () => dispatch(loadWorkersAdmin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent)
