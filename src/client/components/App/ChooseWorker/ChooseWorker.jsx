import React from 'react'
import { connect } from 'react-redux'

import { addOrder, setChooseWorker } from '../../../actions'

import './ChooseWorker.less'

class ChooseWorker extends React.Component {
  render () {
    const { workers, addOrder, id, masterID, setWorker } = this.props

    let buttonConf

    if (masterID) {
      buttonConf = <button onClick={ () => (addOrder(masterID, id)) }>Confirm</button>
    } else {
      buttonConf = <button disabled onClick={ () => (addOrder(masterID, id)) }>Confirm</button>
    }

    return (
      <div className='choose-worker'>
        <div className='choose-worker__header'>Choose Free Worker</div>
        <div className='choose-worker__table'>
          { workers.map(item => (
            <div className='choose-worker__table__worker' key={item.idworker} onClick={() => { setWorker(item.idworker) }}>
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
          {buttonConf}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.appReducer.forOrder.freeWorkers,
    id: state.appReducer.forOrder.insertId,
    masterID: state.appReducer.forOrder.masterID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: (idMaster, id) => dispatch(addOrder({idMaster, id})),
    setWorker: (idMaster) => dispatch(setChooseWorker(idMaster))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseWorker)
