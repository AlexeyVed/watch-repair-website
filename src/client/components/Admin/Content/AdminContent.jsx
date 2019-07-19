import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { loadDataAdmin } from "../../../actions"

import RefactorCities from '../TableCities/RefactorCities.jsx'
import RefactorClients from '../TableClients/RefactorClients.jsx'
import RefactorClocks from '../TableClocks/RefactorClocks.jsx'
import RefactorWorkers from '../TableWorkers/RefactorWorkers.jsx'
import RefactorOrders from '../TableOrders/RefactorOrders.jsx'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './AdminContent.less'



class AdminContent extends React.Component {
  componentDidMount () {
    this.props.loadData()
  }
  render () {
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.adminReducer.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(loadDataAdmin()),
    page: data => dispatch(changePage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent)
