import React from 'react';
import { InputLabel, Select, } from '@material-ui/core';

export default function PareSelector(props) {
  return (
    <>
      <InputLabel htmlFor="outlined-age-native-simple">Pair</InputLabel>
      <Select
        inputProps={{
          id: 'outlined-age-native-simple',
        }}
        label="Pair"
        native
        onChange={props.onChangeCallback}
        value={props.value}
      >
        <option aria-label="None" value="" />
        <option value="USD_JPY">USD_JPY</option>
        <option value="EUR_USD">EUR_USD</option>
        <option value="GBP_JPY">GBP_JPY</option>
      </Select>
    </>
  )
}
