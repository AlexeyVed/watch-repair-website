import React from 'react'
import { connect } from 'react-redux'

import './AllWorker.less'

class AllWorker extends React.Component {
  render () {
    const { workers } = this.props

    return (
      <div className='all-worker'>
        <div className='all-worker__header'>All our masters</div>
        <div className='all-worker__table'>
          { workers.map(item => (
            <div className='all-worker__table__worker' key={item.id}>
              <div className='all-image'></div>
              <div className='all-info'>
                <div className='all-info__name'>{item.name}</div>
                <div className='all-info__city'>Work in {(item.city !== null) ? item.city.city : null}</div>
                <div className='all-info__rating'>Rating: {item.rating}</div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.adminReducer.data.workers
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllWorker)
