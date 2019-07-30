import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteOrderFromDB, loadOrdersAdmin } from '../../../actions'
import AddOrder from '../RefactorOrders/AddOrder.jsx'
import EditOrder from '../RefactorOrders/EditOrder.jsx'

import './RefactorOrders.less'

class RefactorOrders extends React.Component {

  componentDidMount () {
    this.props.loadOrders()
  }
  render () {
    const { orders, deleteOrder } = this.props

    return (
      <div className='table-orders'>
        <div className='table-orders__title'>Which clock we repair</div>
        <div className='table-orders__table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Client name</th>
                <th>Client email</th>
                <th>City</th>
                <th>Date</th>
                <th>ID work</th>
                <th>Service</th>
              </tr>
              { orders.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.clientName}</td>
                  <td>{item.clientEmail}</td>
                  <td>{item.city}</td>
                  <td>{item.date} / {item.time}</td>
                  <td>{item.masterID}</td>
                  <td>
                    <LinkButton to={`/admin/orders/edit/${item.id}/${item.clientName}/${item.clientEmail}/${item.city}/${item.date}/${item.time}/${item.masterID}/${item.timeRepair}`} name='Edit'/>
                    <button onClick={ () => deleteOrder(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    deleteOrder: id => dispatch(deleteOrderFromDB(id)),
    loadOrders: () => dispatch(loadOrdersAdmin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorOrders)
