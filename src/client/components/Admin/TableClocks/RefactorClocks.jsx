import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClockFromDB } from '../../../actions'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'

import './RefactorClocks.less'

class RefactorClocks extends React.Component {
  render () {
    const { clocks, deleteClock } = this.props

    return (
      <div className='table-clocks'>
        <div className='table-clocks__top'>
          <div className='table-clocks__title'>Which clock we repair</div>
          <div className='table-clocks__table-header'>
            <div className='table-clocks__table-header__header-id'>ID</div>
            <div className='table-clocks__table-header__header-clock'>Type of Clock</div>
            <div className='table-clocks__table-header__header-time'>Time of repair</div>
            <div className='table-clocks__table-header__header-buttons'>Service</div>
          </div>
        </div>
        <div className='table-clocks__bottom'>
          { clocks.map(item => (
            <div className='table-clocks__table' key={item.id}>
              <div className='table-clocks__table__row'>
                <div className='table-clocks__table__row__id'>{item.id}</div>
                <div className='table-clocks__table__row__clock'>{item.typeClock}</div>
                <div className='table-clocks__table__row__time'>{item.timeRepair}</div>
                <div className='table-clocks__table__row__buttons'>
                  <LinkButton to={`/admin/clocks/edit/${item.id}/${item.typeClock}/${item.timeRepair}`} name='Edit'/>
                  <button onClick={ () => deleteClock(item.id) }>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-clocks__bttn-add'>
          <LinkButton to='/admin/clocks/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/clocks/add' component={AddClocks}/>
          <Route path='/admin/clocks/edit/:id/:typeClock/:timeRepair' component={EditClocks}/>
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
    deleteClock: id => dispatch(deleteClockFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
