import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrors } from '../../actions'

import './ModalWindow.less'

class ModalWindowApp extends React.Component {
  state = {
    timeOut: 3000
  }

  timeOutNull = () => {
    this.setState({ timeOut: 0 })
  }

  render () {
    setTimeout(() => {
      this.props.missAppError()
    }, this.state.timeOut)

    return (
      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text'>
            <button className='modal-info__text__bttn-close' onClick={this.timeOutNull}>&times;</button>
            <div className='modal-info__text__info'>
              {(this.props.makeOrderError) ? this.props.makeOrderError : 'Order was successfully created and send to your email.'}
            </div>
          </div>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    makeOrderError: state.appReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    missAppError: () => dispatch(missErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowApp)
