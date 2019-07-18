import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteOrderFromDB } from '../../../actions'
import AddOrder from '../RefactorOrders/AddOrder.jsx'
import EditOrder from '../RefactorOrders/EditOrder.jsx'

import './RefactorOrders.less'

class RefactorClocks extends React.Component {
  render () {
    const { orders, deleteOrder } = this.props

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
                  <LinkButton to={`/admin/orders/edit/${item.id}/${item.clientName}/${item.clientEmail}/${item.city}/${item.date}/${item.time}/${item.masterID}/${item.timeRepair}`} name='Edit'/>
                  <button onClick={ () => deleteOrder(item.id) }>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-orders__bttn-add'>
          <LinkButton to='/admin/orders/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/orders/add' component={AddOrder}/>
          <Route path='/admin/orders/edit/:id/:clientName/:clientEmail/:city/:date/:time/:masterID/:timeRepair' component={EditOrder}/>
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
    deleteOrder: id => dispatch(deleteOrderFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
