import PropTypes from 'prop-types';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
  withStyles,
  Button,
  // Card, CardActions, CardContent,
  // Select, InputLabel, MenuItem,
  Paper,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';

import CandleChart from './candle_chart';

const styles = theme => ({
  container: { maxHeight: 300, },
});
class TradesHist extends React.Component {
  // INFO: 画面初期描画と同時にグラフも描画する場合はこれをコメントイン
  // componentDidMount() {
  //   this.props.onMount(this.props.pareName);
  // }
  /* この componentDidUpdate をコメントアウトしても、少なくとも初回は request が飛んでいる */
  componentDidUpdate(nextProps) {
    if (this.props.pareName !== nextProps.pareName) {
      this.props.onUpdate(nextProps.pareName);
    }
  }

  render() {
    const {
      classes,
      request,
      pareName, data, error
    } = this.props;

    return (
      <>
        <h2>TradesHist Component</h2>
        <p>Pare Name: {pareName}</p>
        <Button size="small" color="primary" variant="contained" onClick={() => request(pareName)}>Learn More</Button>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードして下さい。</p>
          } else if (data === 'undefined') {
            return <p>Now Loading ...</p>
          } else {
            return(
              <>
                <CandleChart candles={data.slice(-400)} />
                <TableContainer className={classes.container} component={Paper}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>time</TableCell>
                        <TableCell>open</TableCell>
                        <TableCell>high</TableCell>
                        <TableCell>low</TableCell>
                        <TableCell>close</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map( (datum, i) => (
                        <TableRow key={`candle-${i}`}>
                          <TableCell>{datum.time}</TableCell>
                          <TableCell>{datum.open}</TableCell>
                          <TableCell>{datum.high}</TableCell>
                          <TableCell>{datum.low}</TableCell>
                          <TableCell>{datum.close}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            );
          }
        })()}

      </>
    )
  }
}

export default withStyles(styles, )(TradesHist);

TradesHist.propTypes = {
  // onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pareName: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        hoge: PropTypes.number,
        huga: PropTypes.number,
      })
    )
  ]),
  error: PropTypes.bool.isRequired
};
