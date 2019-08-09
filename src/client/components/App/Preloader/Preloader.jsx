import React from 'react'
import ReactDOM from 'react-dom'

import './Preloader.less'

class Preloader extends React.Component {
  render () {
    return (
      ReactDOM.createPortal(
        <div className='preloader'>
          <div className='loader'></div>
        </div>
        , document.getElementById('preloader'))
    )
  }
}

export default Preloader
