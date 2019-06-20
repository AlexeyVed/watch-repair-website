import React from 'react'
import { connect } from 'react-redux'

import './AdminContent.less'

class AdminContent extends React.Component {
  render () {
    // const { view } = this.props
    let showComponent

    /*    if (view === 'city') {
            showComponent =
        } else if (view === 'clock') {
            showComponent =
        } else if (view === 'worker') {
            showComponent =
        } else if (view === 'client') {
            showComponent =
        }
        */

    return (

      <div className='work-space'>
        {showComponent}
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
