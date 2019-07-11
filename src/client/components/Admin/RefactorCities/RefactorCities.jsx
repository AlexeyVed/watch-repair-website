import React from 'react'
import { connect } from 'react-redux'

import { changeAdminView } from '../../../actions/adminActions'

import './RefactorCities.less'


class RefactorCities extends React.Component {
  componentDidMount () {
    this.props.changeView('cities')
  }

  render () {
    const { cities } = this.props

    return (
      <div className='table-cities'>
        <div className='table-cities__top'>
          <div className='table-cities__title'>Town where we work</div>
          <div className='table-cities__table-header'>
            <div className='table-cities__table-header__header-id'>ID</div>
            <div className='table-cities__table-header__header-name'>City</div>
            <div className='table-cities__table-header__header-buttons'>Service</div>
          </div>
        </div>
        <div className='table-cities__bottom'>
          { cities.map(item => (
            <div className='table-cities__table'>
              <div className='table-cities__table__row'>
                <div className='table-cities__table__row__id'>{item.id}</div>
                <div className='table-cities__table__row__name'>{item.city}</div>
                <div className='table-cities__table__row__buttons'>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-cities__bttn-add'>
          <button>Add</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.adminReducer.data.cities

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (view) => dispatch(changeAdminView(view))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorCities)
