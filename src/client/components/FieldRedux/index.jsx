import React from 'react'

import './FieldRedux.less'

const myInput = (props) => {
  const { meta, label } = props
  return (
    <div className='input-with-label'>

      <label className='input-label'>{label}</label>
      <input
        {...props.input}
        type={props.type}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
      />
      {meta.error &&
            meta.touched &&
            <div className='input-error'>
              {meta.error}
            </div>}
    </div>
  )
}
export default myInput
