import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import TextField from '../../ComponentMaterial/TextField/'
import LinkButton from '../../LinkButton/LinkButton.jsx'
import Preloader from '../../App/Preloader/Preloader.jsx'
import { editCityIntoDB } from '../../../actions'
import { required } from '../../../validation'

import './RefactorCities.less'

class EditCities extends React.Component {
  state = {
    load: true
  }

  componentDidMount () {
    const arr = this.props.location.pathname.split('/')
    axios
      .get(`/api/cities/${arr[arr.length - 1]}`)
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editCity', res.data, ['id', 'city']))
      })
  }

  render () {
    const { handleSubmit, editCity, redirectBack } = this.props
    const arr = this.props.location.pathname.split('/')
    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <div className='refactor-city'>
            <div className="refactor-city__header">
              Edit city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
            </div>
            <form
              onSubmit={handleSubmit(editCity)}>
              <Field
                label='ID'
                name='id'
                component={TextField}
                type='text'
                placeholder={arr[arr.length - 1]}
                input={{ disabled: true }}
              />
              <Field
                label='Enter city'
                name='city'
                component={TextField}
                validate={required}
                type='text'
              />
              <button
                type='submit'
                label='submit'>Submit</button>
            </form>
          </div>
          {(this.state.load ? <Preloader/> : null)}
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectBack: state.cityReducer.redirectBackFromRefactor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCity: values => dispatch(editCityIntoDB(values))
  }
}

const exportEditCities = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCities)

export default reduxForm({
  form: 'editCity'
})(exportEditCities)
