import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrors } from '../../actions'

import './ModalWindow.less'

class ModalWindowAdmin extends React.Component {
  state = {
    timeOut: 1500
  }

  timeOutNull = () => {
    this.setState({timeOut: 0})
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
    let text

    setTimeout(() => {
      this.props.missAdminError()
    }, this.state.timeOut)

    return (

      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text' onClick={this.timeOutNull}>
            <div className='modal-info__text__errors'>
              { (clockMessage) ? <div>{ clockMessage }</div> : null }
              { (cityMessage) ? <div>{ cityMessage }</div> : null }
              { (customerMessage) ? <div>{ customerMessage }</div> : null }
              { (masterMessage) ? <div>{ masterMessage }</div> : null }
              { (orderMessage) ? <div>{ orderMessage }</div> : null }
              { (clockError) ? <div>{ clockError }</div> : null }
              { (citiesError) ? <div>{ citiesError }</div> : null }
              { (usersError) ? <div>{ usersError }</div> : null }
              { (workersError) ? <div>{ workersError }</div> : null }
              { (ordersError) ? <div>{ ordersError }</div> : null }
            </div>
            <div className='modal-info__text__description'>
              Click here to close window.
            </div>
          </div>
        </div>
        , document.getElementById('modal-root'))
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
)(ModalWindowAdmin)
