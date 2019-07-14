import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Redirect} from 'react-router-dom';

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './RefactorClocks.less'


class EditClocks extends React.Component {


  render () {

    const { handleSubmit, editCity } = this.props

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editCity)}
            className='refactor-clocks'>
            <div className="refactor-clocks__header">
              Edit Clocks
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
            </div>
            <Field
              label='Enter type of clock'
              name='type'
              component={myInput}
              type='text'
              placeholder='Enter type of clock'
            />
            <Field
              label='Enter time of repair clock'
              name='time'
              component={myInput}
              type='number'
              placeholder='Enter time repair clock'
            />
            <button
              type='submit'
              label='submit'>Submit</button>
          </form>
        </div>
        , document.getElementById('modal-root'))
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCity: values => console.log(values)
  }
}

const exportEditClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClocks)

export default reduxForm({
  form: 'editCity'
})(exportEditClocks)
