import React from 'react'

import './HomePage.less'

const HomePage = props => {
  const welcome = `Welcome to our website. In our company you will get the best service.
    To place an order, follow several steps:`

  return (
    <div className='home-page'>
      <div className='home-page__welcome'>{welcome}</div>
      <div className='home-page__instruction'>
        <ul>
          <li>Fill in all fields of the form.</li>
          <li>Choose a free master from the list.</li>
          <li>Click Confirm.</li>
          <li>That's all.</li>
          <li>An hour before the order, we will notify you by email.</li>
        </ul>
      </div>
      <div className='home-page__text'></div>
    </div>
  )
}

export default HomePage
