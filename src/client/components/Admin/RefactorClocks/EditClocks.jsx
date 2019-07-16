import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { change, Field, reduxForm } from 'redux-form'

import myInput from '../../FieldRedux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './RefactorClocks.less'


class EditClocks extends React.Component {

  componentDidMount() {
    this.props.dispatch(change('editClocks', 'id', this.props.match.params.id))
    this.props.dispatch(change('editClocks', 'type', this.props.match.params.typeClock))
    this.props.dispatch(change('editClocks', 'time', this.props.match.params.timeRepair))
  }

  render () {

    const { handleSubmit, editClock } = this.props

    return (

      ReactDOM.createPortal(
        <div className='modal-window'>
          <form
            onSubmit={handleSubmit(editClock)}
            className='refactor-clocks'>
            <div className="refactor-clocks__header">
              Edit Clocks
              <LinkButton to='/admin/clocks' name='&times;' className='refactor-clocks__header__right-button-close'/>
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
    editClock: values => console.log(values)
  }
}

const exportEditClocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClocks)

export default reduxForm({
  form: 'editClocks'
})(exportEditClocks)
