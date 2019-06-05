import React from "react";
import ReactDOM from "react-dom";

import LoginForm from './login.jsx'


const Portal = props => {
    return (
    ReactDOM.createPortal(<LoginForm showModal={props.showModal}/>, document.getElementById('modal-root'))
    )
}

export default Portal;