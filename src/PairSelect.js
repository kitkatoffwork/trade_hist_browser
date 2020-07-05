import React, { Component } from 'react';

// Design
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';

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
      <FormControl>
        <select id="select" value={this.state.selectedPair} onChange={this.PairChange} >
          <option value=''>Select Pair</option>
          <option value="USD_JPY">USD_JPY</option>
          <option value="EUR_USD">EUR_USD</option>
          <option value="GBP_JPY">GBP_JPY</option>
        </select>
        {/* <InputLabel id="pair">Currency Pair</InputLabel>
        <Select labelId="pair" id="select" value={this.state.selectedPair} onChange={this.PairChange} >
          <MenuItem value=''>Select Pair</MenuItem>
          <MenuItem value="USD_JPY">USD_JPY</MenuItem>
          <MenuItem value="EUR_USD">EUR_USD</MenuItem>
          <MenuItem value="GBP_JPY">GBP_JPY</MenuItem>
        </Select> */}
        <button　onClick={this.addButtonClick} >Request Histroy</button>
      </FormControl>
    )
  }
}
export default PairSelect;
