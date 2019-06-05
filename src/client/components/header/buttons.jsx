import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    button: {
        width: '100%',
        height: '100%',
    }
}));

const TextButtons = props => {

    const classes = useStyles();

    return (
        <div className={'buttons'}>
            <Button className={classes.button} onClick = {props.showModal}>Login In</Button>
            <Button className={classes.button}>Registration</Button>
        </div>
    );
}

export default TextButtons;