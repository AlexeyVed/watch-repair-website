import React from 'react';

import Button from '@material-ui/core/Button';


function TextButtons() {

    return (
        <div className={'buttons'}>
            <Button className={'button'}>Login In</Button>
            <Button className={'button'}>Registration</Button>
        </div>
    );
}

export default TextButtons;