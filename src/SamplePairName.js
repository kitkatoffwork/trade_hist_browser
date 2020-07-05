import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function SamplePairName(props) {
  return (
    // <li>
    //   {props.name}
    // </li>

    <TableRow key={props.name}>
      <TableCell component="th" scope="row">
        {props.name}
      </TableCell>
    </TableRow>
  );
}
export default SamplePairName;

SamplePairName.propTypes = {
  name: PropTypes.string.isRequired
};
