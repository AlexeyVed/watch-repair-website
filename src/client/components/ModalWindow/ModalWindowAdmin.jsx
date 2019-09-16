import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrors } from '../../actions'

import './ModalWindow.less'

export class ModuleWindowAdmin extends React.Component {
  state = {
    timeOut: 2500,
    interval: null
  }

  timeOutNull = () => {
    clearTimeout(this.state.interval)
    this.props.missAdminError()
  }
  componentDidMount () {
    let timerId = setTimeout(() => {
      this.props.missAdminError()
    }, this.state.timeOut)
    this.setState(() => ({
      interval: timerId
    }))
  }

  render () {
    const {
      clockError,
      citiesError,
      usersError,
      workersError,
      ordersError,
      clockMessage,
      cityMessage,
      customerMessage,
      masterMessage,
      orderMessage
    } = this.props

    const loadError = (clockError) ? <div>{ clockError }</div> : (citiesError) ? <div>{ citiesError }</div> : (usersError) ? <div>{ usersError }</div> : (workersError) ? <div>{ workersError }</div> : (ordersError) ? <div>{ ordersError }</div> : null

    return (

      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text'>
            <button className='modal-info__text__bttn-close' onClick={this.timeOutNull}>&times;</button>
            <div className='modal-info__text__errors'>
              { (clockMessage) ? <div>{ clockMessage }</div> : null }
              { (cityMessage) ? <div>{ cityMessage }</div> : null }
              { (customerMessage) ? <div>{ customerMessage }</div> : null }
              { (masterMessage) ? <div>{ masterMessage }</div> : null }
              { (orderMessage) ? <div>{ orderMessage }</div> : null }
              { loadError }
            </div>
          </div>
        </div>
        , document.getElementById('modal-root') || document.createElement('div'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clockMessage: state.clockReducer.message,
    cityMessage: state.cityReducer.message,
    customerMessage: state.customerReducer.message,
    masterMessage: state.masterReducer.message,
    orderMessage: state.orderReducer.message,
    clockError: state.clockReducer.error,
    citiesError: state.cityReducer.error,
    usersError: state.customerReducer.error,
    workersError: state.masterReducer.error,
    ordersError: state.orderReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    missAdminError: () => dispatch(missErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleWindowAdmin)
