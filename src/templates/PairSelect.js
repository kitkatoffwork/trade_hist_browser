import React, { Component } from 'react';
import { FormControl, } from '@material-ui/core';

import PareSelector from '../templates/PareSelector'
import PastDatePicker from '../templates/PastDatePicker'

class PairSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPair: '',
      selectedDate: new Date()
    };
  }
  PairChange = (e) => {
    this.setState({
      selectedPair: e.target.value,
      uniqueId: this.state.uniqueId
    });
  }
  handleDateChange = (datetime) => {
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
      <FormControl size="small" variant="outlined">
        <PareSelector onChangeCallback={this.PairChange}
                      value={this.state.selectedPair} />
        <PastDatePicker onChangeCallback={this.handleDateChange}
                        value={this.state.selectedDate} />

        <input disabled value={this.state.selectedDate} />
        <select id="select" value={this.state.selectedPair} onChange={this.PairChange} >
          <option value=''>Select Pair</option>
          <option value="USD_JPY">USD_JPY</option>
          <option value="EUR_USD">EUR_USD</option>
          <option value="GBP_JPY">GBP_JPY</option>
        </select>
        <button onClick={this.addButtonClick} >Request Histroy</button>
      </FormControl>
    )
  }
}
export default PairSelect;
