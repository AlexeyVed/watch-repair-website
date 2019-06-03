import React, {Component} from 'react';
import Date from './material-components/timePickers.jsx'
import Input from './material-components/inputs.jsx'
import Select from './material-components/selects.jsx'
import ButtonSubmit from './material-components/button.jsx'

export default class Form extends Component {
    render() {
        return (
            <div className="divForm">
                <div className="title-create">Make you order</div>
                <div className='form'>
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