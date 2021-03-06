import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import DropMenu from '../../ComponentMaterial/DropMenuDelete'
import { deleteCustomersFromDB, loadCustomers, loadDataEnd, setPage } from '../../../actions'
import AddClients from '../RefactorClients/AddClients.jsx'
import EditClients from '../RefactorClients/EditClients.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin'

import '../../../style/model-tables.less'

class RefactorClients extends React.Component {
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
    this.props.loadClients()
      .then(() => {
        this.props.loadEnd()
      })
    this.props.setPage('customers')
  }
  render () {
    const { customers, deleteClient } = this.props
    const { currentPage, itemsPerPage } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = customers.slice(indexOfFirstItem, indexOfLastItem)

    let num = (currentPage === 1) ? 0 : currentPage * 10 - 10

    const indexes = () => {
      return ++num
    }

    const renderItems = currentItem.map((item, index) => {
      const deleteText = `Delete customer: ${item.name}?`
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{item.email}</td>
        <td>{item.name}</td>
        <td>
          <LinkButton to={`/admin/clients/edit/${item.id}`} name={<EditOutlinedIcon/>}/>
          <DropMenu DropDelete={ deleteClient } itemId={ item.id } text={ deleteText }/>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(customers.length / itemsPerPage); i++) {
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
    const table = <React.Fragment><div className='table-model__title'>Table customers</div>
      <div className='table-model__container'>
        <table className='table-model__container__table'>
          <tbody>
            <tr>
              <th>№</th>
              <th>Email</th>
              <th>Name</th>
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
          <LinkButton to='/admin/clients/add' name={<AddRoundedIcon/>}/>
        </div>
      </div></React.Fragment>
    return (
      <div className='table-model'>
        <Switch>
          <Route exact path='/admin/clients' render={() => (table)}/>
          <Route path='/admin/clients/add' render={() => (
            <React.Fragment>
              {table}
              <AddClients/>
            </React.Fragment>)}/>
          <Route path='/admin/clients/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              <EditClients location={ location }/>
            </React.Fragment>)}/>
          <Route path='/admin/clients/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducer.data

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClient: id => dispatch(deleteCustomersFromDB(id)),
    loadClients: () => dispatch(loadCustomers()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClients)
