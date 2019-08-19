import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClientFromDB, loadClientsAdmin } from '../../../actions'
import AddClients from '../RefactorClients/AddClients.jsx'
import EditClients from '../RefactorClients/EditClients.jsx'

import './RefactorClients.less'

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
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{item.email}</td>
        <td>{item.name}</td>
        <td>
          <LinkButton to={`/admin/clients/edit/${item.id}`} name='Edit'/>
          <button onClick={ () => deleteClient(item.id) }>Delete</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(customers.length / itemsPerPage); i++) {
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
      <div className='table-clients'>
        <div className='table-clients__title'>Our Clients</div>
        <div className='table-clients__table'>
          <table>
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
        <div className='table-clients__numbers-pages'>
          { renderPageNumbers }
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
    customers: state.adminReducer.data.customers

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClient: id => dispatch(deleteClientFromDB(id)),
    loadClients: () => dispatch(loadClientsAdmin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClients)
