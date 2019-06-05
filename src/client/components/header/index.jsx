import React, {Component} from 'react';

import Buttons from './buttons.jsx';
import Logo from './logo.jsx';


export default class Header extends Component {

    render() {
        return (
            <div className = 'header'>

                <Buttons showModal={this.props.showModal}/>
                <div className="middle"></div>
                <Logo/>

            </div>
        );
    }
}
