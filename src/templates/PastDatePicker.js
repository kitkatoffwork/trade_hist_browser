import React from 'react';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  /*KeyboardDateTimePicker*/
} from "@material-ui/pickers";
// https://material-ui.com/components/pickers/
// https://material-ui-pickers.dev/getting-started/installation#peer-library
// https://material-ui-pickers.dev/api/DatePicker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


// function disableWeekends(date) {
//   return date.getDay() === 0 || date.getDay() === 6;
// }
function disableSinceSpecificDate(date) {
  return date > new Date(2021, 1, 19);
}


export default function PastDatePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        /* ampm={false} */
        autoOk={true}
        disableFuture
        /* disableToolbar */
        format="yyyy/MM/dd"
        label={props.target}
        onChange={props.onChangeCallback}
        /* onError={console.log} */
        openTo="date"
        shouldDisableDate={disableSinceSpecificDate}
        value={props.value}
        variant="inline"
        views={["year", "month", "date",]}
      />
    </MuiPickersUtilsProvider>
  )
}
