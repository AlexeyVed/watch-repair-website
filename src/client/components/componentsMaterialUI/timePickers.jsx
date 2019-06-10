import React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    KeyboardDatePicker: {
    marginTop: theme.spacing(1),
}
}));

const MaterialUIPickers = props => {

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const classes = useStyles();

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.KeyboardDatePicker}
                    label="Date picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <KeyboardTimePicker
                    className={classes.KeyboardDatePicker}
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
        </MuiPickersUtilsProvider>
    );
}

export default MaterialUIPickers;