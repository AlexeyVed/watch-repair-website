import React, {Component} from 'react';

import Form from './form.jsx'
import Content from './content.jsx'


export default class Main extends Component {
    render() {
        return (
            <div className='main'>
                <Form/>
                <Content/>
            </div>
    );
    }
}