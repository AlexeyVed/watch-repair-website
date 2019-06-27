import React from 'react'
import { connect } from 'react-redux'

import RefactorCities from '../RefactorCities/RefactorCities.jsx'
import RefactorClients from '../RefactorClients/RefactorClients.jsx'
import RefactorClocks from '../RefactorClocks/RefactorClocks.jsx'
import RefactorWorkers from '../RefactorWorkers/RefactorWorkers.jsx'

import './AdminContent.less'

class AdminContent extends React.Component {
  render() {
    const {view} = this.props
    let showComponent = null

    if (view === 'city') {
      showComponent = <RefactorCities/>
    } else if (view === 'clock') {
      showComponent = <RefactorClocks/>
    } else if (view === 'worker') {
      showComponent = <RefactorWorkers/>
    } else if (view === 'client') {
      showComponent = <RefactorClients/>
    }

    return (
      <div className='admin-content'>
        <div className='data-from-db'>
          Data from DB
        </div>
        <div className='work-space'>
          {showComponent}
        </div>
        <div className='crud-button'>
          <button
            name='Add'
            onClick={this.click}>
            Add
          </button>
          <button
            name='Update'
            onClick={this.click}>
            Update
          </button>
          <button
            name='Delete'
            onClick={this.click}>
            Delete
          </button>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.adminReducer.view

  }
}

export default connect(mapStateToProps)(AdminContent)
