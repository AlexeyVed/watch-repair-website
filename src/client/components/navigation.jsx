import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';

export default class Nav extends React.Component{
  render(){
    return <div>
      <Link to="/">Main</Link>
      <Link to="/admin">Admin</Link>
    </div>;
  }
}