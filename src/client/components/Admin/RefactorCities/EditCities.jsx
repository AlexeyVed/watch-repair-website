import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import myInput from '../../FieldRedux'
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
    const id = +this.props.match.params.id
    axios
      .post(`http://localhost:3000/api/cities/get`, { id })
      .then(res => {
        this.setState(() => ({
          load: false
        }
        ))
        this.props.dispatch(initialize('editCity', res.data, ['id', 'city']))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    const { handleSubmit, editCity, redirectBack } = this.props

    if (redirectBack) {
      return <Redirect to={{ pathname: '/admin/cities' }}/>
    }

    return (
      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editCity)}
            className='refactor-city'>
            <div className="refactor-city__header">
              Edit city
              <LinkButton to='/admin/cities' name='&times;' className='refactor-city__header__right-button-close'/>
            </div>
            <Field
              label='ID'
              name='id'
              component={myInput}
              type='text'
              placeholder={this.props.match.params.id}
              input={{ disabled: true }}
            />
            <Field
              label='Enter city'
              name='city'
              component={myInput}
              validate={required}
              type='text'
            />
            <button
              type='submit'
              label='submit'>Submit</button>
          </form>
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
