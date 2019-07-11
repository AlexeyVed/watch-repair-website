import React from 'react'
import { connect } from "react-redux";

import { changeAdminView } from "../../../actions";

import './RefactorWorkers.less'


class RefactorWorkers extends React.Component {

  componentDidMount() {
    this.props.changeView('workers')
  }
  render () {

    const { workers } = this.props

    return (
      <div className='table-workers'>
        <div className='table-workers__top'>
          <div className='table-workers__title'>Our Workers</div>
          <div className='table-workers__table-header'>
            <div className='table-workers__table-header__header-id'>ID</div>
            <div className='table-workers__table-header__header-name'>Name</div>
            <div className='table-workers__table-header__header-city'>Where work</div>
            <div className='table-workers__table-header__header-rating'>Rating</div>
            <div className='table-workers__table-header__header-buttons'>Service</div>
          </div>
        </div>
        <div className='table-workers__bottom'>
        { workers.map(item => (
          <div className='table-workers__table'>
            <div className='table-workers__table__row'>
              <div className='table-workers__table__row__id'>{item.idworker}</div>
              <div className='table-workers__table__row__name'>{item.name}</div>
              <div className='table-workers__table__row__city'>{item.city}</div>
              <div className='table-workers__table__row__rating'>{item.rating}</div>
              <div className='table-workers__table__row__buttons'>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='table-cities__bttn-add'>
          <button>Add</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.adminReducer.data.workers

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (view) => dispatch(changeAdminView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorWorkers)
