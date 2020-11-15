import 'date-fns';
import React, { Component } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, /*KeyboardDateTimePicker*/ } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import PareSelector from '../templates/PareSelector'
// https://material-ui.com/components/pickers/
// https://material-ui-pickers.dev/getting-started/installation#peer-library

class PairSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPair: '',
      selectedDate: Date.now()
    };
  }
  PairChange = (e) => {
    this.setState({
      selectedPair: e.target.value,
      uniqueId: this.state.uniqueId
    });
  }
  handleDateChange = (datetime) => {
    console.log(`datetime:$ {datetime}`)
    this.setState({
      selectedDate: datetime
    })
  };
  addButtonClick = () => {
    const selectedPair = this.state.selectedPair;
    this.props.addPair(selectedPair)
  }

  render() {
    return (
      <>
        <PareSelector className={''} value={this.state.selectedPair} onChangeCallback={this.PairChange} />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            // variant="inline"
            // ampm={false}
            autoOk={true}
            openTo="year"
            label="FROM"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            onError={console.log}
            // disablePast
            disableFuture
            views={["year", "month", "date",]}
            format="yyyy/MM/dd"
          />
        </MuiPickersUtilsProvider>

        <form /*className={classes.container}*/ noValidate>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            // value={this.state.selectedDate}
            // onChange={this.handleDateChange}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

        <FormControl size="small" variant="outlined">
          <select id="select" value={this.state.selectedPair} onChange={this.PairChange} >
            <option value=''>Select Pair</option>
            <option value="USD_JPY">USD_JPY</option>
            <option value="EUR_USD">EUR_USD</option>
            <option value="GBP_JPY">GBP_JPY</option>
          </select>
          <button onClick={this.addButtonClick} >Request Histroy</button>
        </FormControl>
      </>
    )
  }
}
export default PairSelect;
