import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrorApp } from '../../actions'

import './ModalWindow.less'

class ModalWindowApp extends React.Component {
  state = {
    timeOut: 3000
  }

  timeOutNull = () => {
    this.setState({timeOut: 0})
  }

  render () {

    setTimeout(() => {
      this.props.missAppError()
    }, this.state.timeOut)

    return (
      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text' onClick={this.timeOutNull}>
            <div className='modal-info__text__info'>
              {(this.props.makeOrderError) ? this.props.makeOrderError : 'Order was successfully created and send to your email.'}
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
    makeOrderError: state.appReducer.makeOrderError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    missAppError: () => dispatch(missErrorApp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowApp)
