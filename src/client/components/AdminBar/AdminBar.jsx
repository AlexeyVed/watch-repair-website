import React from 'react'
import { connect } from 'react-redux'

import { changeAdminView } from '../../actions'

import './AdminBar.less'

class AdminBar extends React.Component {
    click = (event) => {
      const { changeView } = this.props

      let view = event.target.name

      if (view === 'city') {
        changeView('city')
      } else if (view === 'worker') {
        changeView('worker')
      } else if (view === 'clock') {
        changeView('clock')
      } else if (view === 'client') {
        changeView('client')
      }
    }

    stateShow = () => {
      const { stateAdmin } = this.props
      console.log(stateAdmin)
    }

    render () {
      return (
        <div className='bar-choose-item'>
          <div className='bar-choose-item__title'>What dо you want change?</div>
          <div className="bar-choose-item__buttons">
            <button
              name='city'
              onClick={this.click}>
                        Control cities
            </button>
            <button
              name='worker'
              onClick={this.click}>
                        Control workers
            </button>
            <button
              name='clock'
              onClick={this.click}>
                        Control clocks
            </button>
            <button
              name='client'
              onClick={this.click}>
                        Control clients
            </button>
            <button className='for-state'
              onClick={this.stateShow}>
                        showState in console
            </button>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    stateAdmin: state.adminReducer

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: view => dispatch(changeAdminView(view))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBar)
