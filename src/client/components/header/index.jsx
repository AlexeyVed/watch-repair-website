import React, {Component} from 'react';

import Buttons from './buttons.jsx';
import Authentication from './authentication.jsx';
import Logo from './logo.jsx';

export default class Header extends Component {

    render() {
        return (
            <div className = 'header'>

                <Buttons/>
                <Authentication/>
                <Logo/>

            </div>
        );
    }
}
