import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClockFromDB, loadClocks, loadDataEnd, setPage } from '../../../actions'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'
import NoMatchAdmin from '../../NoMatch/NoMatchAdmin'

import './RefactorClocks.less'

export class ModuleRefactorClocks extends React.Component {
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
    this.props.loadClocks()
      .then(() => {
        return this.props.loadEnd()
      })
    this.props.setPage('clocks')
  }
  render () {
    const { clocks, deleteClock, testRender } = this.props
    const { currentPage, itemsPerPage } = this.state

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItem = clocks.slice(indexOfFirstItem, indexOfLastItem)

    let num = (currentPage === 1) ? 0 : currentPage * 10 - 10

    const indexes = () => {
      return ++num
    }

    const renderItems = currentItem.map((item, index) => {
      return <tr key={item.id}>
        <td>{indexes()}</td>
        <td>{item.typeClock}</td>
        <td>{item.timeRepair}</td>
        <td>
          <LinkButton to={`/admin/clocks/edit/${item.id}`} name={<EditOutlinedIcon/>}/>
          <button className = 'bttn-delete-clock' onClick={ () => deleteClock(item.id) }>{<DeleteOutlineRoundedIcon/>}</button>
        </td>
      </tr>
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(clocks.length / itemsPerPage); i++) {
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
    const table = <React.Fragment><div className='table-clocks__title'>Table clock</div>
      <div className='table-clocks__table'>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Type of Clock</th>
              <th>Time of repair</th>
              <th>Service</th>
            </tr>
            { renderItems }
          </tbody>
        </table>
      </div>
      <div className='table-clocks__numbers-pages'>
        <div className='table-clocks__numbers-pages__container'>
          { renderPageNumbers }
        </div>
        <div className='table-clocks__numbers-pages__bttn-add'>
          <LinkButton to='/admin/clocks/add' name={<AddRoundedIcon/>}/>
        </div>
      </div></React.Fragment>
    return (
      <div className='table-clocks'>
        <Switch>
          <Route exact path='/admin/clocks' render={() => (table)}/>
          <Route path='/admin/clocks/add' render={() => (
            <React.Fragment>
              {table}
              { !testRender ? <AddClocks/> : null }
            </React.Fragment>)}/>
          <Route path='/admin/clocks/edit/:id' render={({ location }) => (
            <React.Fragment>
              {table}
              { !testRender ? <EditClocks location={ location }/> : null }
            </React.Fragment>)}/>
          <Route path='/admin/clocks/*' component={NoMatchAdmin}/>
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    clocks: state.clockReducer.data

  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    deleteClock: id => dispatch(deleteClockFromDB(id)),
    loadClocks: () => dispatch(loadClocks()),
    loadEnd: () => dispatch(loadDataEnd()),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleRefactorClocks)
