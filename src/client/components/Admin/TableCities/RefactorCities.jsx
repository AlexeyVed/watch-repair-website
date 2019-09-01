import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import AddCities from '../RefactorCities/AddCities.jsx'
import EditCities from '../RefactorCities/EditCities.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin.jsx'
import { deleteCityFromDB, loadCities, loadDataEnd, setPage } from '../../../actions'

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
      .then(res => {
        this.props.loadEnd()
      })
    this.props.setPage('cities')
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
          <LinkButton to={`/admin/cities/edit/${item.id}`} name={<EditOutlinedIcon/>}/>
          <button onClick={ () => deleteCity(item.id) }>{<DeleteOutlineRoundedIcon/>}</button>
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
    const table = <React.Fragment> <div className='table-cities__title'>Table cities</div>
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
      </div> </React.Fragment>
    return (
      <div className='table-cities'>
        <Switch>
          <Route exact path='/admin/cities' render={() => (table)}/>
          <Route path='/admin/cities/add' render={() => (
            <React.Fragment>
              {table}
              <AddCities/>
            </React.Fragment>)}/>
          <Route path='/admin/cities/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              <EditCities location={ location }/>
            </React.Fragment>)}/>
          <Route path='/admin/cities/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cityReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: id => dispatch(deleteCityFromDB(id)),
    loadCities: () => dispatch(loadCities()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorCities)
