import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import {
  deleteOrdersFromDB,
  loadCities,
  loadCustomers,
  loadClocks, loadDataEnd,
  loadOrders,
  loadMasters,
  setPage
} from '../../../actions'
import AddOrder from '../RefactorOrders/AddOrder.jsx'
import EditOrder from '../RefactorOrders/EditOrder.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin'

import '../../../style/model-tables.less'

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
    const { loadOrders, loadClocks, loadWorkers, loadCities, loadClients } = this.props
    Promise.all([loadOrders(), loadClocks(), loadWorkers(), loadCities(), loadClients()])
      .then((res) => {
        this.props.loadEnd()
      })
    this.props.setPage('orders')
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
        <td>{ item.customer.email }</td>
        <td>{ item.customer.name }</td>
        <td>{ item.clock.name }</td>
        <td>{ item.city.name }</td>
        <td>{item.date} / {`${item.time}h - ${item.time + item.duration}h`}</td>
        <td>{ item.master.name }</td>
        <td>
          <LinkButton to={`/admin/orders/edit/${item.id}`} name={<EditOutlinedIcon/>}/>
          <button className='button-refactor-models' onClick={ () => deleteOrder(item.id) }>{<DeleteOutlineRoundedIcon/>}</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div className='table-model__numbers-pages__container__page page'
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </div>
      )
    })
    const table = <React.Fragment> <div className='table-model__title'>Table orders</div>
      <div className='table-model__container'>
        <table className='table-model__container__table'>
          <tbody>
            <tr>
              <th>№</th>
              <th>Client email</th>
              <th>Client name</th>
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
      <div className='table-model__numbers-pages'>
        <div className='table-model__numbers-pages__container'>
          { renderPageNumbers }
        </div>
        <div className='table-model__numbers-pages__btn-add'>
          <LinkButton to='/admin/orders/add' name={<AddRoundedIcon/>}/>
        </div>
      </div></React.Fragment>
    return (
      <div className='table-model'>
        <Switch>
          <Route exact path='/admin/orders' render={() => (table)}/>
          <Route path='/admin/orders/add' render={() => (
            <React.Fragment>
              {table}
              <AddOrder/>
            </React.Fragment>)}/>
          <Route path='/admin/orders/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              <EditOrder location={ location }/>
            </React.Fragment>)}/>
          <Route path='/admin/orders/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: id => dispatch(deleteOrdersFromDB(id)),
    loadOrders: () => dispatch(loadOrders()),
    loadWorkers: () => dispatch(loadMasters()),
    loadCities: () => dispatch(loadCities()),
    loadClocks: () => dispatch(loadClocks()),
    loadClients: () => dispatch(loadCustomers()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorOrders)
