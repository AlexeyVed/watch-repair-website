import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrors } from '../../actions'

import './ModalWindow.less'

export class ModuleWindowApp extends React.Component {
  state = {
    timeOut: 3000,
    interval: null
  }

  timeOutNull = () => {
    clearTimeout(this.state.interval)
    this.props.missAppError()
  }
  componentDidMount () {
    let timerId = setTimeout(() => {
      this.props.missAppError()
    }, this.state.timeOut)
    this.setState(() => ({
      interval: timerId
    }))
  }

  render () {
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
        , document.getElementById('modal-root') || document.createElement('div'))
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
)(ModuleWindowApp)
