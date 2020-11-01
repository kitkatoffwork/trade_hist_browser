import PropTypes from 'prop-types';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
  withStyles,
  Button,
  Card, CardActions, CardContent,
  FormControl, Select, InputLabel,
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';

import CandleChart from './candle_chart';

const styles = theme => ({
  container: {
    maxHeight: 300,
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class TradesHist extends React.Component {
  // INFO: 画面初期描画と同時にグラフも描画する場合はこれをコメントイン
  // componentDidMount() {
  //   this.props.onMount(this.props.pareName);
  // }

  /* この componentDidUpdate をコメントアウトしても、少なくとも初回は request が飛んでいる */
  // componentDidUpdate(nextProps) {
  //   if (this.props.pareName !== nextProps.pareName) {
  //     this.props.onUpdate(nextProps.pareName);
  //   }
  // }

  render() {
    const {
      classes,
      selectPair, request,
      pareName, data, error
    } = this.props;

    return (
      <>
        <h2>TradesHist Component</h2>
        <p>Pare Name: {pareName}</p>

        <FormControl size="small" variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Pair</InputLabel>
            <Select
              native
              value={pareName}
              onChange={(e) => selectPair(e.target.value)}
              label="Pair"
              inputProps={{
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value="USD_JPY">USD_JPY</option>
              <option value="EUR_USD">EUR_USD</option>
              <option value="GBP_JPY">GBP_JPY</option>
            </Select>
          <Button size="small" color="primary" variant="contained" onClick={() => request(pareName)}>Load Hist</Button>
        </FormControl>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードして下さい。</p>
          } else if (data === 'undefined') {
            return <p>Now Loading ...</p>
          } else {
            return(
              <>
                <CandleChart candles={data.slice(-400)} />
                <Card variant="outlined">
                  <CardContent>
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
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
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
