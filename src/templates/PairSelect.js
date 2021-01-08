import React, { useState } from 'react';
import { FormControl, } from '@material-ui/core';

import PareSelector from '../templates/PareSelector'
import PastDatePicker from '../templates/PastDatePicker'


function PairSelect(props) {
  const [pair, setPair] = useState('');
  const [date, setDate] = useState(new Date());

  function PairChange(e) {
    setPair(e.target.value);
  }

  return (
    <FormControl size="small" variant="outlined">
      <PareSelector onChangeCallback={PairChange} value={pair} />
      <PastDatePicker onChangeCallback={setDate} value={date} />

      <input disabled value={date} />
      <select id="select" value={pair} onChange={PairChange} >
        <option value=''>Select Pair</option>
        <option value="USD_JPY">USD_JPY</option>
        <option value="EUR_USD">EUR_USD</option>
        <option value="GBP_JPY">GBP_JPY</option>
      </select>
      <button onClick={props.addPair(pair)} >Request Histroy</button>
    </FormControl>
  )
}

export default PairSelect;
