import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import AddCities from '../RefactorCities/AddCities.jsx'
import EditCities from '../RefactorCities/EditCities.jsx'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin.jsx'
import { deleteCityFromDB, loadCities, loadDataEnd, setPage } from '../../../actions'

import './RefactorCities.less'

export class ModuleRefactorCities extends React.Component {
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
    const pages = this.props.testPages || document.querySelectorAll('.page')
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
        return this.props.loadEnd()
      })
    this.props.setPage('cities')
  }
  render () {
    const { cities, deleteCity, testRender } = this.props
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
          <button className='bttn-delete-city' onClick={ () => deleteCity(item.id) }>{<DeleteOutlineRoundedIcon/>}</button>
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
        <div className='table-cities__numbers-pages__container'>
          { renderPageNumbers }
        </div>
        <div className='table-cities__numbers-pages__bttn-add'>
          <LinkButton to='/admin/cities/add' name={<AddRoundedIcon/>}/>
        </div>
      </div></React.Fragment>
    return (
      <div className='table-cities'>
        <Switch>
          <Route exact path='/admin/cities' render={() => (table)}/>
          <Route path='/admin/cities/add' render={() => (
            <React.Fragment>
              {table}
              { !testRender ? <AddCities/> : null }
            </React.Fragment>)}/>
          <Route path='/admin/cities/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              { !testRender ? <EditCities location={ location }/> : null }
            </React.Fragment>)}/>
          <Route path='/admin/cities/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    cities: state.cityReducer.data
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: id => dispatch(deleteCityFromDB(id)),
    loadCities: () => dispatch(loadCities()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleRefactorCities)
