import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClientFromDB, loadClientsAdmin } from '../../../actions'
import AddClients from '../RefactorClients/AddClients.jsx'
import EditClients from '../RefactorClients/EditClients.jsx'

import './RefactorClients.less'

class RefactorClients extends React.Component {
  componentDidMount () {
    this.props.loadClients()
  }
  render () {
    const { users, deleteClient } = this.props

    return (
      <div className='table-clients'>
        <div className='table-clients__title'>Our Clients</div>
        <div className='table-clients__table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Password</th>
                <th>Service</th>
              </tr>
              { users.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <LinkButton to={`/admin/clients/edit/${item.id}`} name='Edit'/>
                    <button onClick={ () => deleteClient(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div className='table-clients__bttn-add'>
          <LinkButton to='/admin/clients/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/clients/add' component={AddClients}/>
          <Route path='/admin/clients/edit/:id' component={EditClients}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.adminReducer.data.users

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClient: id => dispatch(deleteClientFromDB(id)),
    loadClients: () => dispatch(loadClientsAdmin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClients)
