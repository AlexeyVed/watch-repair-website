import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClockFromDB, loadClocks } from '../../../actions'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'

import './RefactorClocks.less'

class RefactorClocks extends React.Component {
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
    this.props.loadClocks()
  }
  render () {
    const { clocks, deleteClock } = this.props
    const { currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
          <LinkButton to={`/admin/clocks/edit/${item.id}`} name='Edit'/>
          <button onClick={ () => deleteClock(item.id) }>Delete</button>
        </td>
      </tr>
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(clocks.length / itemsPerPage); i++) {
      pageNumbers.push(i);
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
      <div className='table-clocks'>
        <div className='table-clocks__title'>Which clock we repair</div>
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
          { renderPageNumbers }
        </div>
        <div className='table-clocks__bttn-add'>
          <LinkButton to='/admin/clocks/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/clocks/add' component={AddClocks}/>
          <Route path='/admin/clocks/edit/:id' component={EditClocks}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clocks: state.adminReducer.data.clocks

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClock: id => dispatch(deleteClockFromDB(id)),
    loadClocks: () => dispatch(loadClocks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
