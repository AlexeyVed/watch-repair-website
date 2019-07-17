import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClockFromDB } from '../../../actions'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'

import './RefactorOrders.less'

class RefactorClocks extends React.Component {
  render () {
    const { orders, deleteClock } = this.props

    return (
      <div className='table-orders'>
        <div className='table-orders__top'>
          <div className='table-orders__title'>Which clock we repair</div>
          <div className='table-orders__table-header'>
            <div className='table-orders__table-header__header-id'>ID</div>
            <div className='table-orders__table-header__header-name'>Client name</div>
            <div className='table-orders__table-header__header-email'>Client email</div>
            <div className='table-orders__table-header__header-city'>City</div>
            <div className='table-orders__table-header__header-date'>Date</div>
            <div className='table-orders__table-header__header-master-id'>ID work</div>
            <div className='table-orders__table-header__header-buttons'>Service</div>
          </div>
        </div>
        <div className='table-orders__bottom'>
          { orders.map(item => (
            <div className='table-orders__table' key={item.id}>
              <div className='table-orders__table__row'>
                <div className='table-orders__table__row__id'>{item.id}</div>
                <div className='table-orders__table__row__name'>{item.clientName}</div>
                <div className='table-orders__table__row__email'>{item.clientEmail}</div>
                <div className='table-orders__table__row__city'>{item.city}</div>
                <div className='table-orders__table__row__date'>{item.date} / {item.time}</div>
                <div className='table-orders__table__row__master-id'>{item.masterID}</div>
                <div className='table-orders__table__row__buttons'>
                  <LinkButton to={`/admin/orders/edit/${item.id}/${item.clientName}/${item.clientEmail}/${item.city}/${item.date}/${item.masterID}`} name='Edit'/>
                  <button onClick={ () => console.log(item.id) }>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-orders__bttn-add'>
          <LinkButton to='/admin/clocks/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/clocks/add' component={AddClocks}/>
          <Route path='/admin/clocks/edit/:id/:typeClock/:timeRepair' component={EditClocks}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.adminReducer.data.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClock: id => dispatch(deleteClockFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
