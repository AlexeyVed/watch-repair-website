import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrorApp } from '../../actions'


import './ModalWindow.less'

class ModalWindowApp extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.missAppError()
    }, 3500)
  }

  render () {
    return (
      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text'>
            <div>
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
    makeOrderError: state.appReducer.makeOrderError,
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
