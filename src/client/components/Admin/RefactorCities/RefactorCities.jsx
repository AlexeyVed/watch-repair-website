import React from 'react'

import { Field, reduxForm } from 'redux-form'
import myInput from '../../FieldRedux'
import './RefactorCities.less'
import { connect } from 'react-redux'

class RefactorCities extends React.Component {

  componentDidMount() {

  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div className=''>

      </div>
    )
  }
}

RefactorCities = connect(
  null,
  null
)(RefactorCities)

export default reduxForm({
  form: 'refactorCities',
  onSubmit: values => console.log(values)
})(RefactorCities)
