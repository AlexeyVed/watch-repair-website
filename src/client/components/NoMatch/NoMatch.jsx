import React from 'react'

import LinkButton from '../LinkButton/LinkButton.jsx'
import './NoMatch.less'

const NoMatch = ({ location }) => {
  return (
    <div className='main-no-match'>
      <div className='main-no-match__navigation'>
        <LinkButton to='/' name='Main' className=''/>
      </div>
      <div className='main-no-match__logo'></div>
      <div className='main-no-match__text'>
          No Match location - {location.pathname}
      </div>
    </div>
  )
}

export default NoMatch
