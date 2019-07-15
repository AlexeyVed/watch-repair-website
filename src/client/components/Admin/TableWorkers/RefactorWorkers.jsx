import React from 'react'
import { connect } from "react-redux";

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteWorkerFromDB } from '../../../actions'

import './RefactorWorkers.less'


class RefactorWorkers extends React.Component {

  render () {

    const { workers, deleteWorker } = this.props

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
          <div className='table-workers__table' key={item.idworker}>
            <div className='table-workers__table__row'>
              <div className='table-workers__table__row__id'>{item.idworker}</div>
              <div className='table-workers__table__row__name'>{item.name}</div>
              <div className='table-workers__table__row__city'>{item.city}</div>
              <div className='table-workers__table__row__rating'>{item.rating}</div>
              <div className='table-workers__table__row__buttons'>
                <LinkButton to='/admin/workers/edit' name='Edit'/>
                <button onClick={ () => deleteWorker(item.idworker) }>Delete</button>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='table-workers__bttn-add'>
          <LinkButton to='/admin/workers/add' name='Add'/>
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
    deleteWorker: id => dispatch(deleteWorkerFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorWorkers)
