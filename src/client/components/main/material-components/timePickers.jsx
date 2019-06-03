import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    KeyboardDatePicker: {
    marginTop: theme.spacing(1),
}
}));

function MaterialUIPickers() {
    // The first commit of Material-UI
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