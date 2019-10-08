import React from 'react'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'

import { addOrder, setChooseWorker, returnPageHome } from '../../../actions'

import './ChooseWorker.less'

class ChooseWorker extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    const workers = document.querySelectorAll('.choose-worker__table__worker')
    workers.forEach(worker => {
      if (+worker.id === this.props.masterId) {
        worker.classList.add('active')
      } else if (worker.classList.contains('active')) {
        worker.classList.remove('active')
      }
    })
  }

  componentDidMount () {
    const workers = document.querySelectorAll('.choose-worker__table__worker')
    workers.forEach(worker => {
      if (+worker.id === this.props.masterId) {
        worker.classList.add('active')
      } else if (worker.classList.contains('active')) {
        worker.classList.remove('active')
      }
    })
  }

  render () {
    const { workers, addOrder, masterId, setWorker, order, chooseMaster, returnHomePage } = this.props

    let buttonConf,
      homeButton

    if (chooseMaster) {
      homeButton = <button className='buttonHome' onClick={ returnHomePage }>&lt;</button>
    } else {
      homeButton = null
    }

    if (masterId) {
      const fullOrder = {
        ...order,
        master_id: masterId
      }
      buttonConf = <button onClick={ () => (addOrder(fullOrder)) }>Confirm</button>
    } else {
      buttonConf = <Tooltip title='You must choose master.'>
        <span>
          <button disabled onClick={ () => (addOrder()) }>Confirm</button>
        </span>
      </Tooltip>
    }

    return (
      <div className='choose-worker'>
        { homeButton }
        <div className='choose-worker__header'>Choose Free Worker</div>
        <div className='choose-worker__table'>
          { workers.map(item => (
            <div className='choose-worker__table__worker' id={item.id} key={item.id} onClick={() => { setWorker(item.id) }}>
              <div className='worker-image'></div>
              <div className='worker-info'>
                <div className='worker-info__name'>{item.name}</div>
                <div className='worker-info__city'>Work in { item.city.name }</div>
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
    masterId: state.appReducer.forOrder.masterId,
    order: state.appReducer.forOrder.order,
    chooseMaster: state.appReducer.chooseWorker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: values => dispatch(addOrder(values)),
    setWorker: (idMaster) => dispatch(setChooseWorker(idMaster)),
    returnHomePage: () => dispatch(returnPageHome())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseWorker)
