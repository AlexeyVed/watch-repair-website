import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteMastersFromDB, loadCities, loadDataEnd, loadMasters, setPage } from '../../../actions'
import AddWorkers from '../RefactorWorkers/AddWorkers.jsx'
import EditWorkers from '../RefactorWorkers/EditWorkers.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin'

import '../../../style/model-tables.less'

class RefactorWorkers extends React.Component {
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
    Promise.all([this.props.loadWorkers(), this.props.loadCities()])
      .then((res) => {
        this.props.loadEnd()
      })
    this.props.setPage('masters')
  }
  render () {
    const { workers, deleteWorker } = this.props
    const { currentPage, itemsPerPage } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = workers.slice(indexOfFirstItem, indexOfLastItem)

    let num = (currentPage === 1) ? 0 : currentPage * 10 - 10

    const indexes = () => {
      return ++num
    }

    const renderItems = currentItem.map((item, index) => {
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{item.name}</td>
        <td>{(item.city !== null) ? item.city.city : <b>City was deleted</b>}</td>
        <td>{item.rating}</td>
        <td>
          <LinkButton to={`/admin/workers/edit/${item.id}`} name={<EditOutlinedIcon/>}/>
          <button className='button-refactor-models' onClick={ () => deleteWorker(item.id) }>{<DeleteOutlineRoundedIcon/>}</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(workers.length / itemsPerPage); i++) {
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
    const table = <React.Fragment>
      <div className='table-model__title'>Table masters</div>
      <div className='table-model__container'>
        <table className='table-model__container__table'>
          <tbody>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Where work</th>
              <th>Rating</th>
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
          <LinkButton to='/admin/workers/add' name={<AddRoundedIcon/>}/>
        </div>
      </div></React.Fragment>
    return (
      <div className='table-model'>
        <Switch>
          <Route exact path='/admin/workers' render={() => (table)}/>
          <Route path='/admin/workers/add' render={() => (
            <React.Fragment>
              {table}
              <AddWorkers/>
            </React.Fragment>)}/>
          <Route path='/admin/workers/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              <EditWorkers location={ location }/>
            </React.Fragment>)}/>
          <Route path='/admin/workers/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.masterReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWorker: id => dispatch(deleteMastersFromDB(id)),
    loadWorkers: () => dispatch(loadMasters()),
    loadCities: () => dispatch(loadCities()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorWorkers)
