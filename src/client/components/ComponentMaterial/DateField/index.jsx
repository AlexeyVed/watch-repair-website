import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers'

import './DateField.less'

const MaterialUIPickers = props => {
  const { input, label, min, max } = props
  const onChange = date => {
    const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    input.onChange(dateUTC.toISOString().split('T')[0])
  }
  return (
    <div className='date-pickers'>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableToolbar
          format='MMMM dd, yyyy'
          margin='normal'
          id='date-picker-dialog'
          label={label}
          value={input.value}
          onChange={onChange}
          minDate={min}
          maxDate={max}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default MaterialUIPickers
