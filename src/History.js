import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Design
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
