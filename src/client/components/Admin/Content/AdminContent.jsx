import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import RefactorCities from '../TableCities/RefactorCities.jsx'
import RefactorClients from '../TableClients/RefactorClients.jsx'
import RefactorClocks from '../TableClocks/RefactorClocks.jsx'
import RefactorWorkers from '../TableWorkers/RefactorWorkers.jsx'
import RefactorOrders from '../TableOrders/RefactorOrders.jsx'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import ModalWindow from '../../ModalWindow/ModalWindowAdmin.jsx'

import './AdminContent.less'

class AdminContent extends React.Component {
  render () {
    return (
      <div className='admin-content'>
        {(this.props.modalAdmin) ? <ModalWindow/> : null}
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.adminReducer.view,
    modalAdmin: state.adminReducer.showModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent)
