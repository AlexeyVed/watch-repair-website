import React from 'react'
import { connect } from 'react-redux'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClientFromDB } from '../../../actions'

import './RefactorClients.less'


class RefactorClients extends React.Component {

  render () {
    const { users, deleteClient } = this.props

    return (
      <div className='table-clients'>
        <div className='table-clients__top'>
          <div className='table-clients__title'>Our Clients</div>
          <div className='table-clients__table-header'>
            <div className='table-clients__table-header__header-id'>ID</div>
            <div className='table-clients__table-header__header-email'>Email</div>
            <div className='table-clients__table-header__header-password'>Password</div>
            <div className='table-clients__table-header__header-buttons'>Service</div>
          </div>
        </div>
        <div className='table-clients__bottom'>
          { users.map(item => (
            <div className='table-clients__table' key={item.idlogin}>
              <div className='table-clients__table__row'>
                <div className='table-clients__table__row__id'>{item.idlogin}</div>
                <div className='table-clients__table__row__email'>{item.email}</div>
                <div className='table-clients__table__row__password'>{item.password}</div>
                <div className='table-clients__table__row__buttons'>
                  <LinkButton to='/admin/clients/edit' name='Edit'/>
                  <button onClick={ () => deleteClient(item.idlogin) }>Delete</button>                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-clients__bttn-add'>
          <LinkButton to='/admin/clients/add' name='Add'/>
        </div>
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
    deleteClient: id => dispatch(deleteClientFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClients)
