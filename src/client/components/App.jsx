import React, {Component} from 'react';

import Header from './Header/Header.jsx';
import Main from './Main';
import Portal from './PortalAuthentication/PortalAuthentication.jsx'


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