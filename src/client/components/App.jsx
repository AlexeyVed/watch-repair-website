import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './Header/Header.jsx';
import Main from './Main';
import Portal from './PortalAuthentication/PortalAuthentication'


class App extends Component {

    render() {
        return (
            <div className = 'app'>
                <Header/>
                <Main/>
                <Portal/>
            </div>
        )
    }
}


export default App;