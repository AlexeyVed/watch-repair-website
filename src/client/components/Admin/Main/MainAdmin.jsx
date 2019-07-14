import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import AdminBar from '../Bar/AdminBar.jsx'
import AdminContent from '../Content/AdminContent.jsx'
import AddCities from '../RefactorCities/AddCities.jsx'
import EditCities from '../RefactorCities/EditCities.jsx'
import EditClients from '../RefactorClients/EditClients.jsx'
import AddClients from '../RefactorClients/AddClients.jsx'
import AddWorkers from '../RefactorWorkers/AddWorkers.jsx'
import EditWorkers from '../RefactorWorkers/EditWorkers.jsx'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'
import './MainAdmin.less'

import { loadData } from '../../../actions/adminActions.js'

class MainAdmin extends React.Component {
  componentDidMount () {
    loadData()
  }

  render () {
    const { currentUser } = this.props
    const { pathname } = this.props.location

    if (currentUser !== 'admin@example.com') {
      return <Redirect to={{ pathname: '/login' }}/>
    }

    return (
      <div className='admin-main'>
        <AdminBar/>
        <AdminContent/>
        { (pathname === '/admin/cities/add') ? <AddCities/> :
          (pathname === '/admin/cities/edit') ? <EditCities/> :
            (pathname === '/admin/clocks/add') ? <AddClocks/> :
            (pathname === '/admin/clocks/edit') ? <EditClocks/> :
              (pathname === '/admin/clients/add') ? <AddClients/> :
              (pathname === '/admin/clients/edit') ? <EditClients/> :
                (pathname === '/admin/workers/add') ? <AddWorkers/> :
                (pathname === '/admin/workers/edit') ? <EditWorkers/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginReducer.singInUser
  }
}

export default connect(
  mapStateToProps
)(MainAdmin)
