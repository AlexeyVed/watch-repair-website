import React from 'react'

import './NoMatch.less'

const NoMatch = ({ location }) => {
  return (
    <div className='main-no-match'>
      <div className='main-no-match__logo'></div>
      <div className='main-no-match__text'>
          No Match location - {location.pathname}
      </div>
    </div>
  )
}

export default NoMatch
