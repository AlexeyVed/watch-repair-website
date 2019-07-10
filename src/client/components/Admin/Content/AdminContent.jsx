import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { loadData } from '../../../actions/adminActions.js'




import RefactorCities from '../RefactorCities/RefactorCities.jsx'
import RefactorClients from '../RefactorClients/RefactorClients.jsx'
import RefactorClocks from '../RefactorClocks/RefactorClocks.jsx'
import RefactorWorkers from '../RefactorWorkers/RefactorWorkers.jsx'

import './AdminContent.less'
import {changeAdminView} from "../../../actions/adminActions";

class AdminContent extends React.Component {

  componentDidMount() {
    this.props.loadData()
  }
  render () {

    return (
      <div className='admin-content'>
        <div className='work-space'>
          <Switch>
            <Route path="/admin/cities" component={RefactorCities}/>
            <Route path="/admin/clients" component={RefactorClients}/>
            <Route path="/admin/clocks" component={RefactorClocks} />
            <Route path="/admin/workers" component={RefactorWorkers} />
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
    loadData: () => dispatch(loadData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent)
