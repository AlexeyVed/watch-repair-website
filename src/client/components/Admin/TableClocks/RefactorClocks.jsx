import React from 'react'
import { connect } from 'react-redux'

import { changeAdminView } from '../../../actions'

import LinkButton from '../../LinkButton/LinkButton.jsx'

import './RefactorClocks.less'



class RefactorClocks extends React.Component {
  componentDidMount () {
    this.props.changeView('clocks')
  }
  render () {
    const { clocks } = this.props

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
            <div className='table-clocks__table'>
              <div className='table-clocks__table__row'>
                <div className='table-clocks__table__row__id'>{item.id}</div>
                <div className='table-clocks__table__row__clock'>{item.typeClock}</div>
                <div className='table-clocks__table__row__time'>{item.timeRepair}</div>
                <div className='table-clocks__table__row__buttons'>
                  <LinkButton to='/admin/clocks/edit' name='Edit'/>
                  <LinkButton to={`/admin/clocks/delete/${item.id}`} name='Delete'/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-clocks__bttn-add'>
          <LinkButton to='/admin/clocks/add' name='Add'/>
        </div>
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
    changeView: (view) => dispatch(changeAdminView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
