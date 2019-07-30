import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import AddCities from '../RefactorCities/AddCities.jsx'
import EditCities from '../RefactorCities/EditCities.jsx'
import { deleteCityFromDB } from '../../../actions'

import './RefactorCities.less'

class RefactorCities extends React.Component {
  render () {
    const { cities, deleteCity } = this.props

    return (
      <div className='table-cities'>
        <div className='table-cities__title'>Town where we work</div>
        <div className='table-cities__table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Service</th>
              </tr>
              { cities.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.city}</td>
                  <td>
                    <LinkButton to={`/admin/cities/edit/${item.id}/${item.city}`} name='Edit'/>
                    <button onClick={ () => deleteCity(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='table-cities__bttn-add'>
          <LinkButton to='/admin/cities/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/cities/add' component={AddCities}/>
          <Route path='/admin/cities/edit/:id/:city' component={EditCities}/>
        </Switch>
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
    deleteCity: id => dispatch(deleteCityFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorCities)
