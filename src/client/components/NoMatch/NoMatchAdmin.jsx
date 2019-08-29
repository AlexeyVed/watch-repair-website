import React from 'react'

import './NoMatch.less'

const NoMatchAdmin = ({ location }) => {
  return (
    <div className='main-no-match-admin'>
      <div className='main-no-match-admin__logo'></div>
      <div className='main-no-match-admin__text'>
          No Match location - {location.pathname}
      </div>
    </div>
  )
}

export default NoMatchAdmin
