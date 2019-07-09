import React from 'react'
import { Link } from 'react-router-dom'

const WrappedLink = props => {
  return (
    <Link to={props.to}>
      <button className={props.className}>
        {props.name}
      </button>
    </Link>
  )
}

export default WrappedLink