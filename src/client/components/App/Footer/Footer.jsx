import React from 'react'
import { Link } from 'react-router-dom'

const Footer = props => (
  <div className='footer'>
    <Link to='/works'>Our Works</Link>
    <Link to='/about'>About Us</Link>
    <Link to='/contacts'>Contacts</Link>
  </div>
)


export default Footer
