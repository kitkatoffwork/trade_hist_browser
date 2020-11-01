import React, { Component } from 'react';
import {
  FormControl, Select, InputLabel, MenuItem,
} from '@material-ui/core';

class PairSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPair: ''
    };
  }
  PairChange = (e) => {
    this.setState({
      selectedPair: e.target.value,
      uniqueId: this.state.uniqueId
    });
  }
  addButtonClick = () => {
    const selectedPair = this.state.selectedPair;
    this.props.addPair(selectedPair)
  }

  render() {
    return (
      <>
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Pair</InputLabel>
          <Select
            native
            value={this.state.selectedPair}
            onChange={this.PairChange}
            label="Pair"
            inputProps={{
              name: 'Pair',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value="USD_JPY">USD_JPY</option>
            <option value="EUR_USD">EUR_USD</option>
            <option value="GBP_JPY">GBP_JPY</option>
          </Select>

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
