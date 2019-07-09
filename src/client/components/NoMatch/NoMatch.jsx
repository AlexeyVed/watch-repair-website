import React from 'react'

const NoMatch = ({ location }) => {
  return (
      <div style={{
        width: '100%',
        height: '300px',
        background: 'red',
        textAlign: 'center'
      }}>
     No Match {location.pathname}
      </div>
  )
}

export default NoMatch