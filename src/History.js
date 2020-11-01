import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card, CardActions, CardContent,
  Paper,
  Table, TableBody, TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';

import SamplePairName from './SamplePairName';

class History extends Component {
  render() {
    const list = this.props.pairs.map(pair => {
      return <SamplePairName {...pair} key={pair.uniqueId} />
    });
    return (
      <Card variant="outlined">
        <CardContent>
          {/* INFO: List ver
          <div>
            <ul>{list}</ul>
          </div> */}

          {/* INFO: Table ver */}
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  };
}
export default History;

History.propTypes = {
  pairs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
