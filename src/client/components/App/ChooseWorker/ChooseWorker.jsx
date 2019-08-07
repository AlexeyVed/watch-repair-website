import React from 'react'
import { connect } from 'react-redux'

import { addOrder, setChooseWorker } from '../../../actions'

import './ChooseWorker.less'

class ChooseWorker extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    const workers = document.querySelectorAll('.choose-worker__table__worker')
    workers.forEach(worker => {
      if (+worker.id === this.props.masterID) {
        worker.classList.add('active')
      } else if (worker.classList.contains('active')) {
        worker.classList.remove('active')
      }
    })
  }
  render () {
    const { workers, addOrder, id, masterID, setWorker, order } = this.props

    let buttonConf

    if (masterID) {
      const fullOrder = {
        ...order,
        masterID
      }
      buttonConf = <button onClick={ () => (addOrder(fullOrder)) }>Confirm</button>
    } else {
      buttonConf = <button disabled onClick={ () => (addOrder(masterID, id)) }>Confirm</button>
    }

    return (
      <div className='choose-worker'>
        <div className='choose-worker__header'>Choose Free Worker</div>
        <div className='choose-worker__table'>
          { workers.map(item => (
            <div className='choose-worker__table__worker' id={item.id} key={item.id} onClick={() => { setWorker(item.id) }}>
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
    masterID: state.appReducer.forOrder.masterID,
    order: state.appReducer.forOrder.order,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: values => dispatch(addOrder(values)),
    setWorker: (idMaster) => dispatch(setChooseWorker(idMaster))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseWorker)
