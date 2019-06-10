import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(4),
        width: theme.spacing(25)
    }
}));

const ButtonSubmit = props => {
    const classes = useStyles();

    return (
            <Button variant="outlined" color="primary" className={classes.button}>
                Submit
            </Button>
    );
}

export default ButtonSubmit;