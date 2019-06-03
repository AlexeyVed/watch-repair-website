import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0),
        minWidth: 250,
    }
}));

const TextFields = props => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
            <TextField
                id="standard-name"
                label= {`Enter your ${props.title}`}
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
            />
    );
}

export default TextFields;