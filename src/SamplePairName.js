import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function SamplePairName(props) {
  return (
    <TableRow key={props.name}>
      {/* <li>
        {props.name}
      </li> */}
      <TableCell component="th" scope="row">
        {`${props.name} ${props.uniqueId}`}
      </TableCell>
    </TableRow>
  );
}
export default SamplePairName;

SamplePairName.propTypes = {
  name: PropTypes.string.isRequired
};
