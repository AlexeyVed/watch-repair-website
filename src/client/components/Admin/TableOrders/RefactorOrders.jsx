import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import {
  deleteOrderFromDB,
  loadCities,
  loadClientsAdmin,
  loadClocks, loadDataEnd,
  loadOrdersAdmin,
  loadWorkers
} from '../../../actions'
import AddOrder from '../RefactorOrders/AddOrder.jsx'
import EditOrder from '../RefactorOrders/EditOrder.jsx'

import './RefactorOrders.less'

class RefactorOrders extends React.Component {
  state = {
    currentPage: 1,
    itemsPerPage: 10
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const pages = document.querySelectorAll('.page')
    pages.forEach(page => {
      if (+page.id === this.state.currentPage) {
        page.classList.add('active')
      } else if (page.classList.contains('active')) {
        page.classList.remove('active')
      }
    })
  }

  componentDidMount () {
    const { loadOrders, loadClocks, loadWorkers, loadCities, loadClients} = this.props
    return Promise.all([loadOrders(), loadClocks(), loadWorkers(), loadCities(), loadClients()])
      .then((res)=> {
        this.props.loadEnd()
      })
  }
  render () {
    const { orders, deleteOrder } = this.props
    const { currentPage, itemsPerPage } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = orders.slice(indexOfFirstItem, indexOfLastItem)

    let num = (currentPage === 1) ? 0 : currentPage * 10 - 10

    const indexes = () => {
      return ++num
    }

    const renderItems = currentItem.map((item, index) => {
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{(item.customer !== null) ? item.customer.name : null }</td>
        <td>{(item.customer !== null) ? item.customer.email : <b>Customer was deleted</b>}</td>
        <td>{(item.clock !== null) ? item.clock.typeClock : <b>Clock was deleted</b>}</td>
        <td>{(item.city !== null) ? item.city.city : <b>City was deleted</b>}</td>
        <td>{item.date} / {item.time}</td>
        <td>{(item.master !== null) ? item.master.name : <b>Master was deleted</b>}</td>
        <td>
          <LinkButton to={`/admin/orders/edit/${item.id}`} name='Edit'/>
          <button onClick={ () => deleteOrder(item.id) }>Delete</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div className='page'
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </div>
      )
    })
    return (
      <div className='table-orders'>
        <div className='table-orders__title'>Which clock we repair</div>
        <div className='table-orders__table'>
          <table>
            <tbody>
              <tr>
                <th>№</th>
                <th>Client name</th>
                <th>Client email</th>
                <th>Type clock</th>
                <th>City</th>
                <th>Date</th>
                <th>Master</th>
                <th>Service</th>
              </tr>
              { renderItems }
            </tbody>
          </table>
        </div>
        <div className='table-orders__numbers-pages'>
          { renderPageNumbers }
        </div>
        <div className='table-orders__bttn-add'>
          <LinkButton to='/admin/orders/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/orders/add' component={AddOrder}/>
          <Route path='/admin/orders/edit/:id' component={EditOrder}/>
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
    loadOrders: () => dispatch(loadOrdersAdmin()),
    loadWorkers: () => dispatch(loadWorkers()),
    loadCities: () => dispatch(loadCities()),
    loadClocks: () => dispatch(loadClocks()),
    loadClients: () => dispatch(loadClientsAdmin()),
    loadEnd: () => dispatch(loadDataEnd())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorOrders)
