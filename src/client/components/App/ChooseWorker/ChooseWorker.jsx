import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { logOutApp } from '../../../actions'

import './ChooseWorker.less'

class ChooseWorker extends React.Component {
  render () {
    const { workers } = this.props

    return (
      <div className='choose-worker'>
        <div className='choose-worker__header'>Choose Free Worker</div>
        <div className='choose-worker__table'>
          { workers.map(item => (
            <div className='choose-worker__table__worker' key={item.idworker}>
              <div className='worker-image'></div>
              <div className='worker-info'>
                <div className='worker-info__name'>{item.name}</div>
                <div className='worker-info__city'>Work in {item.city}</div>
                <div className='worker-info__rating'>Rating: {item.rating}</div>
              </div>
            </div>
          ))
          }
        </div>
        <div className='choose-worker__button-confirm'>
          <button>Confirm</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.appReducer.data.workers
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseWorker)
