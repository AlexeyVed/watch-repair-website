import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/styles'

import './TextField.less'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 220
  }
}))

const renderTextField = props => {
  const { label, input, meta, styles } = props

  const classes = styles || useStyles()
  return (<div className='input-material-ui'>
    <FormControl className={classes.formControl}>
      <TextField label={label} type={props.type}{...input}/>
      {meta.error &&
      meta.touched &&
      <div className='input-material-ui__error'>
        {meta.error}
      </div>}
    </FormControl>
  </div>)
}

export default renderTextField
