import React from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText
} from '@material-ui/core';

export default function IndicatorsSelector(props) {
  return (
    <FormControl>
      <InputLabel id="indicators-selector">Indicators (Under Construction...)</InputLabel>
      <Select inputProps={{
                id: 'indicators-selector',
              }}
              MenuProps={{
                anchorOrigin: {vertical: 'bottom', horizontal: 'left',},
                transformOrigin: {vertical: 'top', horizontal: 'left',},
                getContentAnchorEl: null,
                classes: {paper: props.styles}
              }}
              className={props.styles}
              multiple
              onChange={props.onChangeCallback}
              renderValue={(selected) => selected.join(', ')}
              value={props.value}
      >
        {props.indicatorNames.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={props.value.indexOf(name) > -1}
                      color='primary' size='small' />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
