import React from 'react'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core'

import './SelectField.less'

export const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 220,
    textAlign: 'left'
  }
}))

const renderSelectField = props => {
  const { input, label, meta, children, id, styles } = props
  const classes = styles || useStyles()
  return (
    <div className='input-select-material-ui'>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={input.name}>{ label }</InputLabel>
        <Select {...input} children={children} inputProps={{
          id: id,
          name: input.name
        }}
        />
        {meta.error &&
        meta.touched &&
        <div className='input-select-material-ui__error'>
          {meta.error}
        </div>}
      </FormControl>
    </div>)
}

export default renderSelectField
