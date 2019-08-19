import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import AddCities from '../RefactorCities/AddCities.jsx'
import EditCities from '../RefactorCities/EditCities.jsx'
import { deleteCityFromDB, loadCities } from '../../../actions'

import './RefactorCities.less'

class RefactorCities extends React.Component {
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
    this.props.loadCities()
  }
  render () {
    const { cities, deleteCity } = this.props
    const { currentPage, itemsPerPage } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = cities.slice(indexOfFirstItem, indexOfLastItem)

    let num = (currentPage === 1) ? 0 : currentPage * 10 - 10

    const indexes = () => {
      return ++num
    }

    const renderItems = currentItem.map((item, index) => {
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{item.city}</td>
        <td>
          <LinkButton to={`/admin/cities/edit/${item.id}`} name='Edit'/>
          <button onClick={ () => deleteCity(item.id) }>Delete</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(cities.length / itemsPerPage); i++) {
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
      <div className='table-cities'>
        <div className='table-cities__title'>Town where we work</div>
        <div className='table-cities__table'>
          <table>
            <tbody>
              <tr>
                <th>№</th>
                <th>City</th>
                <th>Service</th>
              </tr>
              { renderItems }
            </tbody>
          </table>
        </div>
        <div className='table-cities__numbers-pages'>
          { renderPageNumbers }
        </div>
        <div className='table-cities__bttn-add'>
          <LinkButton to='/admin/cities/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/cities/add' component={AddCities}/>
          <Route path='/admin/cities/edit/:id' component={EditCities}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.adminReducer.data.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: id => dispatch(deleteCityFromDB(id)),
    loadCities: () => dispatch(loadCities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorCities)
