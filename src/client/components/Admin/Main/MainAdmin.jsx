import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import AdminBar from '../Bar/AdminBar.jsx'
import RefactorCities from "../TableCities/RefactorCities";
import RefactorClients from "../TableClients/RefactorClients";
import RefactorClocks from "../TableClocks/RefactorClocks";
import RefactorWorkers from "../TableWorkers/RefactorWorkers";
import RefactorOrders from "../TableOrders/RefactorOrders";

import './MainAdmin.less'


const MainAdmin = props => {

    return (
      <div className='admin-main'>
        <AdminBar/>
        <div className='admin-content'>
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
      </div>
    )
}

export default MainAdmin
