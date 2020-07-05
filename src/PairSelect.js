import React, { Component } from 'react';

// Design
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class PairSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPair: '',
    };
  }
  PairChange = (e) => {
    this.setState({
      selectedPair: e.target.value,
    });
  }
  addButtonClick = () => {
    const selecetedPair = this.state.selectedPair;
    this.props.addPair(selecetedPair)
  }

  render() {
    return (
      <FormControl>
        <InputLabel id="pair">Currency Pair</InputLabel>
        <Select labelId="pair" id="select" onChange={this.PairChange} >
          <MenuItem value="USD_JPY">USD_JPY</MenuItem>
          <MenuItem value="EUR_USD">EUR_USD</MenuItem>
          <MenuItem value="GBP_JPY">GBP_JPY</MenuItem>
        </Select>
        <button　onClick={this.addButtonClick} >Request Histroy</button>
      </FormControl>
    )
  }
}
export default PairSelect;
