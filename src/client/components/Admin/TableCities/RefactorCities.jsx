import React from 'react'
import { connect } from 'react-redux'


import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteCityFromDB, redirectToEditMode } from '../../../actions'

import './RefactorCities.less'
import {Redirect} from "react-router";


class RefactorCities extends React.Component {

  redirected (id) {
    this.props.redirectToEditMode(id)
  }

  render () {
    const { cities, deleteCity, redirect } = this.props

    if (redirect) {
      return <Redirect to={{ pathname: '/admin/cities/edit' }}/>
    }

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
            <div className='table-cities__table' key={item.id}>
              <div className='table-cities__table__row'>
                <div className='table-cities__table__row__id'>{item.id}</div>
                <div className='table-cities__table__row__name'>{item.city}</div>
                <div className='table-cities__table__row__buttons'>
                  <LinkButton to='/admin/cities/edit' name='Edit'/>
                  <button onClick={ () => deleteCity(item.id) }>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='table-cities__bttn-add'>
          <LinkButton to='/admin/cities/add' name='Add'/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.adminReducer.data.cities,
    redirect: state.adminReducer.redirectToEdit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: id => dispatch(deleteCityFromDB(id)),
    redirectToEditMode: (id) => dispatch(redirectToEditMode(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorCities)
