import React, {Component} from 'react';

import Date from '../componentsMaterialUI/timePickers.jsx'
import Input from '../componentsMaterialUI/inputs.jsx'
import Select from '../componentsMaterialUI/selects.jsx'
import ButtonSubmit from '../componentsMaterialUI/button.jsx'


export default class Form extends Component {

    render() {
        return (
            <div className="divForm">
                <div className="title-create">Make you order</div>
                <div className='form' id='form'>
                    <Input title = 'Name'/>
                    <Input title = 'E-mail'/>
                    <Select title = 'clock'/>
                    <Select title = 'city'/>
                    <Date/>
                    <ButtonSubmit/>
                </div>
            </div>
        );
    }
}