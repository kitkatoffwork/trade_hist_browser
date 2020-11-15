import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';

import PareSelector from '../templates/PareSelector'

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
        <PareSelector className={''} value={this.state.selectedPair} onChangeCallback={this.PairChange} />

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
