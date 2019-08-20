import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { missErrorAdmin } from '../../actions'

import './ModalWindow.less'

class ModalWindowAdmin extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.missAdminError()
    }, 1500)
  }

  render () {
    const { wasDelete,
      wasCreate,
      wasUpdate,
      refactorError,
      clockError,
      citiesError,
      usersError,
      workersError,
      ordersError } = this.props
    let text

    if (refactorError) {
      text = refactorError
    } if (wasDelete) {
      text = `Model was successfully deleted.`
    } else if (wasCreate) {
      text = `Model was successfully created.`
    } else if (wasUpdate) {
      text = `Model was successfully updated.`
    }

    return (

      ReactDOM.createPortal(
        <div className='modal-info'>
          <div className='modal-info__text'>
            <div className='modal-info__text__errors'>
              <div>{ text }</div>
              <div>{ clockError }</div>
              <div>{ citiesError }</div>
              <div>{ workersError }</div>
              <div>{ usersError }</div>
              <div>{ ordersError }</div>
            </div>
          </div>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wasDelete: state.adminReducer.wasDeleted,
    wasCreate: state.adminReducer.wasCreated,
    wasUpdate: state.adminReducer.wasUpdated,
    clockError: state.adminReducer.data.clocksError,
    citiesError: state.adminReducer.data.citiesError,
    usersError: state.adminReducer.data.usersError,
    workersError: state.adminReducer.data.workersError,
    ordersError: state.adminReducer.data.ordersError,
    refactorError: state.adminReducer.refactorModelError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    missAdminError: () => dispatch(missErrorAdmin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowAdmin)
