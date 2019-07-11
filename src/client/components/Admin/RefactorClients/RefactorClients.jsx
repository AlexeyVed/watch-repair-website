import React from 'react'

import './RefactorClients.less'
import {changeAdminView} from "../../../actions";
import {connect} from "react-redux";

class RefactorClients extends React.Component {

  componentDidMount() {
    this.props.changeView('clients')
  }

  render () {

    const { users } = this.props

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
          <div className='table-clients__table'>
            <div className='table-clients__table__row'>
              <div className='table-clients__table__row__id'>{item.idlogin}</div>
              <div className='table-clients__table__row__email'>{item.email}</div>
              <div className='table-clients__table__row__password'>{item.password}</div>
              <div className='table-clients__table__row__buttons'>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='table-cities__bttn-add'>
          <button>Add</button>
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
    changeView: (view) => dispatch(changeAdminView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClients)
